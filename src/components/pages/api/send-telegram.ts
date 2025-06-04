import { NextApiRequest, NextApiResponse } from "next"; // Импортируем типы

// Прямо указываем значения токена и chat_id (для теста)
const BOT_TOKEN = "7651886787:AAEPR_EKo3W4mPpVr1hHcfUH_a3CMd90G64"; // Замените на ваш токен бота
const ADMIN_CHAT_ID = "7819537579"; // Замените на chat_id администратора

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Метод не разрешён" });
  }

  try {
    // Логируем полученные данные
    console.log("Received order details:", req.body);

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

    // Логируем заказ, перед отправкой в Telegram
    console.log("Formatted order text:", orderText);

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
    console.log("Admin response:", dataAdmin); // Логируем ответ

    if (!dataAdmin.ok) {
      throw new Error(dataAdmin.description);
    }

    // Отправка сообщения пользователю
    const userChatId = user.chatId; // Получаем chat_id пользователя

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
    console.log("User response:", dataUser); // Логируем ответ

    if (!dataUser.ok) {
      throw new Error(dataUser.description);
    }

    res.status(200).json({ message: "Сообщение отправлено" });
  } catch (error: any) {
    console.error("Error in send-telegram API:", error);
    res.status(500).json({ error: error.message || "Ошибка сервера" });
  }
}
