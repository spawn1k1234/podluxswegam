import type { NextApiRequest, NextApiResponse } from "next";

// Вынесли данные из .env.local
const BOT_TOKEN = process.env.BOT_TOKEN!;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID!;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не разрешён" });
  }

  try {
    // Данные заказа
    const { user, cart, totalPrice, totalWeight, totalQuantity, discount } =
      req.body;

    // Формируем детали заказа
    const cartDetails = cart
      .map((item: any, index: number) => {
        return `${index + 1}. ${item.name} — ${item.quantity} шт. (${
          item.price
        } ₽)`; // Можно добавить цену товара в список
      })
      .join("\n");

    const orderText = `
🛒 *Новый заказ от пользователя*:
    
👤 *Имя*: ${user.name}
📞 *Телефон*: ${user.phone}
📧 *Email*: ${user.address}

📦 *Товары*:
${cartDetails}

💰 *Общая сумма*: ${totalPrice} ₽
⚖️ *Общий вес*: ${totalWeight} кг
📦 *Общее количество*: ${totalQuantity} шт.
💸 *Скидка*: ${discount} ₽
    `;

    // Отправка сообщения админу
    const resAdmin = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: ADMIN_CHAT_ID,
          text: orderText,
          parse_mode: "Markdown", // Markdown для форматирования
        }),
      }
    );
    const dataAdmin = await resAdmin.json();
    if (!dataAdmin.ok) {
      throw new Error(dataAdmin.description);
    }

    // Отправка сообщения пользователю
    const userChatId = user.chatId; // Получаем chat_id пользователя из данных заказа

    const resUser = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: userChatId,
          text: `
*Ваш заказ обрабатывается!*

Здравствуйте, ${user.name}! Ваш заказ принят и в процессе обработки. Вот его детали:

📦 *Товары*:
${cartDetails}

💰 *Общая сумма*: ${totalPrice} ₽
⚖️ *Общий вес*: ${totalWeight} кг
📦 *Общее количество*: ${totalQuantity} шт.
💸 *Скидка*: ${discount} ₽

🔔 С вами свяжется менеджер для уточнения деталей.
          `,
          parse_mode: "Markdown", // Markdown для форматирования
        }),
      }
    );
    const dataUser = await resUser.json();
    if (!dataUser.ok) {
      throw new Error(dataUser.description);
    }

    res.status(200).json({ message: "Сообщение отправлено" }); // Уведомление о том, что запрос успешен
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Ошибка сервера" }); // Ошибка сервера
  }
}
