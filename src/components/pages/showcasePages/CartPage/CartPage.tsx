// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { NO_PRODUCTS_IN_CART } from "../../../../constants/messages";
// import { PATHS } from "../../../../constants/routes";
// import useForm from "../../../../hooks/useForm";
// import { createOrder } from "../../../../store/CommonSlice";
// import { AppDispatch, RootState } from "../../../../store/store";
// import {
//   clearCart,
//   removeProductFromCart,
//   setToLocalStorage,
//   wishListHandler,
// } from "../../../../store/UserSlice";
// import { CartItem, Product, ProductCartItem } from "../../../../types/common";
// import { cartFormValidator } from "../../../../utils/validators";
// import Section from "../../../layouts/showcaseLayouts/Section/Section";
// import SectionBody from "../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody";
// import SectionHeader from "../../../layouts/showcaseLayouts/Section/SectionHeader/SectionHeader";
// import Cart from "../../../showcase/Cart/Cart";
// import CartForm from "../../../showcase/CartForm/CartForm";
// import Placeholder from "../../../UI/Placeholder/Placeholder";
// import classes from "./CartPage.module.css";

// const INIT_INPUT = {
//   name: "",
//   phone: "",
//   address: "",
// };

// const CartPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const navigate = useNavigate();
//   const { cart } = useSelector((state: RootState) => state.user);
//   const { wishlist } = useSelector((state: RootState) => state.user);
//   const { products } = useSelector((state: RootState) => state.product);
//   const { error, isLoading } = useSelector((state: RootState) => state.common);
//   const { input, handleChange, errors, submit } = useForm(
//     INIT_INPUT,
//     handleSubmit,
//     cartFormValidator
//   );

//   const cartProducts: ProductCartItem[] = cart
//     .map((cartItem) => {
//       const product = products.find(
//         (product) => product.id === cartItem.productId
//       );
//       if (!product) return null; // якщо товар не знайдено — пропускаємо
//       const isWished = wishlist.includes(cartItem.productId);

//       return {
//         ...cartItem,
//         name: product.name,
//         image: product.image,
//         categoryUrl: product.category.url,
//         isWished,
//       };
//     })
//     .filter(Boolean) as ProductCartItem[]; // видаляємо null значення

//   const price = cart.reduce((res, val) => res + val.totalPrice, 0);
//   const weight = +cart
//     .reduce((res, val) => res + val.totalWeight, 0)
//     .toFixed(2);
//   const profit = cart.reduce((res, { profit = 0 }) => res + profit, 0);
//   const quantity = cart.reduce((res, { quantity }) => res + quantity, 0);
//   const hasProducts = cart.length > 0;
//   const summaryProps = {
//     price,
//     weight,
//     profit,
//     quantity,
//   };

//   const handleWishlist = ({
//     id,
//     isWished,
//   }: {
//     id: CartItem["productId"];
//     isWished: boolean;
//   }) => {
//     dispatch(wishListHandler({ id, isWished }));
//   };

//   const handleRemoveCartItem = (id: CartItem["productId"]) => {
//     dispatch(removeProductFromCart(id));
//     dispatch(setToLocalStorage("cart"));
//   };

//   async function handleSubmit() {
//     const order = {
//       user: input,
//       cart: cart,
//       timestamp: Date.now(),
//       totalPrice: price,
//       totalWeight: weight,
//       totalDiscount: profit,
//       totalQuantity: quantity,
//     };

//     await dispatch(createOrder(order));

//     if (!error.isError && !isLoading) {
//       navigate(`${PATHS.cart}/${PATHS.success}`);
//       dispatch(clearCart());
//       dispatch(setToLocalStorage("cart"));
//     }
//   }

//   return (
//     <Section>
//       <>
//         <SectionHeader title={"Корзина"} />

//         <SectionBody>
//           <>
//             {!hasProducts && <Placeholder text={NO_PRODUCTS_IN_CART} />}

//             {hasProducts && (
//               <div className={classes["cart-page-body"]}>
//                 <Cart
//                   cart={cartProducts}
//                   onRemove={handleRemoveCartItem}
//                   onWish={handleWishlist}
//                   {...summaryProps}
//                 />

//                 <span className={classes.title}>Ваши данные</span>
//                 <CartForm
//                   onSubmit={submit}
//                   value={input}
//                   errors={errors}
//                   onChange={handleChange}
//                   isLoading={isLoading}
//                 />
//               </div>
//             )}
//           </>
//         </SectionBody>
//       </>
//     </Section>
//   );
// };

// export default CartPage;

// ______________

// import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
// import { NO_PRODUCTS_IN_CART } from "../../../../constants/messages";
// import useForm from "../../../../hooks/useForm";
// import { createOrder } from "../../../../store/CommonSlice";
// import { AppDispatch, RootState } from "../../../../store/store";
// import {
//   clearCart,
//   removeProductFromCart,
//   setToLocalStorage,
//   wishListHandler,
// } from "../../../../store/UserSlice";
// import { CartItem, ProductCartItem } from "../../../../types/common";
// import { cartFormValidator } from "../../../../utils/validators";
// import Section from "../../../layouts/showcaseLayouts/Section/Section";
// import SectionBody from "../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody";
// import SectionHeader from "../../../layouts/showcaseLayouts/Section/SectionHeader/SectionHeader";
// import Cart from "../../../showcase/Cart/Cart";
// import CartForm from "../../../showcase/CartForm/CartForm";
// import Placeholder from "../../../UI/Placeholder/Placeholder";
// import classes from "./CartPage.module.css";

// const INIT_INPUT = {
//   name: "",
//   phone: "",
//   address: "",
// };

// const CartPage: React.FC = () => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { cart, wishlist } = useSelector((state: RootState) => state.user);
//   const { products } = useSelector((state: RootState) => state.product);
//   const { error, isLoading } = useSelector((state: RootState) => state.common);

//   const [showSuccess, setShowSuccess] = useState(false);

//   const { input, handleChange, errors, submit } = useForm(
//     INIT_INPUT,
//     handleSubmit,
//     cartFormValidator
//   );

//   const cartProducts: ProductCartItem[] = cart
//     .map((cartItem) => {
//       const product = products.find(
//         (product) => product.id === cartItem.productId
//       );
//       if (!product) return null;
//       const isWished = wishlist.includes(cartItem.productId);

//       return {
//         ...cartItem,
//         name: product.name,
//         image: product.image,
//         categoryUrl: product.category.url,
//         isWished,
//       };
//     })
//     .filter(Boolean) as ProductCartItem[];

//   const price = cart.reduce((res, val) => res + val.totalPrice, 0);
//   const weight = +cart
//     .reduce((res, val) => res + val.totalWeight, 0)
//     .toFixed(2);
//   const profit = cart.reduce((res, { profit = 0 }) => res + profit, 0);
//   const quantity = cart.reduce((res, { quantity }) => res + quantity, 0);
//   const hasProducts = cart.length > 0;

//   const summaryProps = { price, weight, profit, quantity };

//   const handleWishlist = ({
//     id,
//     isWished,
//   }: {
//     id: CartItem["productId"];
//     isWished: boolean;
//   }) => {
//     dispatch(wishListHandler({ id, isWished }));
//   };

//   const handleRemoveCartItem = (id: CartItem["productId"]) => {
//     dispatch(removeProductFromCart(id));
//     dispatch(setToLocalStorage("cart"));
//   };

//   async function handleSubmit() {
//     const order = {
//       user: input,
//       cart,
//       timestamp: Date.now(),
//       totalPrice: price,
//       totalWeight: weight,
//       totalDiscount: profit,
//       totalQuantity: quantity,
//     };

//     await dispatch(createOrder(order));

//     if (!error.isError && !isLoading) {
//       dispatch(clearCart());
//       dispatch(setToLocalStorage("cart"));
//       setShowSuccess(true); // Показываем модалку
//     }
//   }

//   return (
//     <Section>
//       <>
//         <SectionHeader title={"Корзина"} />

//         <SectionBody>
//           <>
//             {!hasProducts && (
//               <div className={classes["no-products-placeholder"]}>
//                 <Placeholder text={NO_PRODUCTS_IN_CART} />
//                 {/* Вставляем утку сюда */}
//                 <img
//                   src="/utca/utcakarzina.webp" // Указываем путь к файлу в папке public
//                   alt="Утка"
//                   className={classes.duckImage} // Применяем стили
//                 />
//               </div>
//             )}

//             {hasProducts && (
//               <div className={classes["cart-page-body"]}>
//                 <Cart
//                   cart={cartProducts}
//                   onRemove={handleRemoveCartItem}
//                   onWish={handleWishlist}
//                   {...summaryProps}
//                 />

//                 <span className={classes.title}>Ваши данные</span>
//                 <CartForm
//                   onSubmit={submit}
//                   value={input}
//                   errors={errors}
//                   onChange={handleChange}
//                   isLoading={isLoading}
//                 />
//               </div>
//             )}
//           </>
//         </SectionBody>

//         {showSuccess && (
//           <div className={classes.modalBackdrop}>
//             <div className={classes.modalContent}>
//               <p>Ваш заказ оформлен! С вами свяжется менеджер.</p>
//               <button onClick={() => setShowSuccess(false)}>Закрыть</button>
//             </div>
//           </div>
//         )}
//       </>
//     </Section>
//   );
// };

// export default CartPage;

// ________________________
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { NO_PRODUCTS_IN_CART } from "../../../../constants/messages";
import useForm from "../../../../hooks/useForm";
import { createOrder } from "../../../../store/CommonSlice";
import { AppDispatch, RootState } from "../../../../store/store";
import {
  clearCart,
  removeProductFromCart,
  setToLocalStorage,
  wishListHandler,
} from "../../../../store/UserSlice";
import { CartItem, ProductCartItem } from "../../../../types/common";
import { cartFormValidator } from "../../../../utils/validators";
import Section from "../../../layouts/showcaseLayouts/Section/Section";
import SectionBody from "../../../layouts/showcaseLayouts/Section/SectionBody/SectionBody";
import SectionHeader from "../../../layouts/showcaseLayouts/Section/SectionHeader/SectionHeader";
import Cart from "../../../showcase/Cart/Cart";
import CartForm from "../../../showcase/CartForm/CartForm";
import Placeholder from "../../../UI/Placeholder/Placeholder";
import classes from "./CartPage.module.css";

const INIT_INPUT = {
  name: "",
  phone: "",
  address: "",
  email: "",
};

const BOT_TOKEN = "7651886787:AAEPR_EKo3W4mPpVr1hHcfUH_a3CMd90G64";
const ADMIN_CHAT_ID = "7819537579";

const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { cart, wishlist } = useSelector((state: RootState) => state.user);
  const { products } = useSelector((state: RootState) => state.product);
  const { error, isLoading } = useSelector((state: RootState) => state.common);

  const [showSuccess, setShowSuccess] = useState(false);

  const { input, handleChange, errors, submit } = useForm(
    INIT_INPUT,
    handleSubmit,
    cartFormValidator
  );

  const cartProducts: ProductCartItem[] = cart
    .map((cartItem) => {
      const product = products.find(
        (product) => product.id === cartItem.productId
      );
      if (!product) return null;
      const isWished = wishlist.includes(cartItem.productId);

      return {
        ...cartItem,
        name: product.name,
        image: product.image,
        categoryUrl: product.category.url,
        isWished,
      };
    })
    .filter(Boolean) as ProductCartItem[];

  const price = cart.reduce((res, val) => res + val.totalPrice, 0);
  const weight = +cart
    .reduce((res, val) => res + val.totalWeight, 0)
    .toFixed(2);
  const profit = cart.reduce((res, { profit = 0 }) => res + profit, 0);
  const quantity = cart.reduce((res, { quantity }) => res + quantity, 0);
  const hasProducts = cart.length > 0;

  const summaryProps = { price, weight, profit, quantity };

  const handleWishlist = ({
    id,
    isWished,
  }: {
    id: CartItem["productId"];
    isWished: boolean;
  }) => {
    dispatch(wishListHandler({ id, isWished }));
  };

  const handleRemoveCartItem = (id: CartItem["productId"]) => {
    dispatch(removeProductFromCart(id));
    dispatch(setToLocalStorage("cart"));
  };

  async function sendTelegramMessage(chatId: string, message: string) {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "HTML",
          }),
        }
      );

      if (!response.ok) {
        console.error("Ошибка при отправке сообщения через бота");
      }
    } catch (error) {
      console.error("Ошибка при отправке сообщения в Telegram:", error);
    }
  }

  async function sendOrderNotifications(telegramUserId: string | undefined) {
    // Сообщение для клиента (точь-в-точь как вы хотели)
    const clientMessage =
      `🛍️ <b>Ваш заказ успешно оформлен!</b>\n\n` +
      `📦 <b>Состав заказа:</b>\n` +
      `${cartProducts.map((item) => `└ 🏷️ ${item.name}\n`).join("")}\n` +
      `💰 <b>Итого к оплате:</b> ${price} ₴\n` +
      `📦 <b>Общий вес:</b> ${weight} кг\n\n` +
      `👤 <b>Ваши контактные данные:</b>\n` +
      `├ Имя: ${input.name}\n` +
      `├ Телефон: ${input.phone}\n` +
      `└ Email: ${input.address}\n` +
      `⏳ <i>Наш менеджер свяжется с вами в течение часа для подтверждения заказа.</i>\n` +
      `🙏 Благодарим за покупку!`;

    // Сообщение для администратора (более подробное)
    const adminMessage =
      `🚨 <b>Новый заказ!</b>\n\n` +
      `📦 <b>Состав заказа:</b>\n` +
      `${cartProducts
        .map(
          (item) =>
            `└ 🏷️ ${item.name} (${item.quantity} шт. × ${item.price} ₴)\n`
        )
        .join("")}\n` +
      `💰 <b>Итого:</b> ${price} ₴\n` +
      `📦 <b>Вес:</b> ${weight} кг\n` +
      `🎁 <b>Скидка:</b> ${profit} ₴\n` +
      `📅 <b>Дата:</b> ${new Date().toLocaleString()}\n\n` +
      `👤 <b>Контактные данные:</b>\n` +
      `├ Имя: ${input.name}\n` +
      `├ Телефон: ${input.phone}\n` +
      `├ Адрес: ${input.address}\n` +
      `└ Email: ${input.email || "не указан"}\n\n` +
      `🆔 <b>ID клиента:</b> ${telegramUserId || "неизвестен"}`;

    // Отправляем сообщения
    if (telegramUserId) {
      await sendTelegramMessage(telegramUserId, clientMessage);
    }
    await sendTelegramMessage(ADMIN_CHAT_ID, adminMessage);
  }

  async function handleSubmit() {
    const tg = window.Telegram?.WebApp;
    const telegramUserId = tg?.initDataUnsafe?.user?.id;

    const order = {
      user: input,
      cart,
      timestamp: Date.now(),
      totalPrice: price,
      totalWeight: weight,
      totalDiscount: profit,
      totalQuantity: quantity,
    };

    await dispatch(createOrder(order));

    if (!error.isError && !isLoading) {
      await sendOrderNotifications(telegramUserId?.toString());

      dispatch(clearCart());
      dispatch(setToLocalStorage("cart"));
      setShowSuccess(true);
    }
  }

  return (
    <Section>
      <>
        <SectionHeader title={"Корзина"} />

        <SectionBody>
          <>
            {!hasProducts && (
              <div className={classes["no-products-placeholder"]}>
                <Placeholder text={NO_PRODUCTS_IN_CART} />
                <img
                  src="/utca/utcakarzina.webp"
                  alt="Утка"
                  className={classes.duckImage}
                />
              </div>
            )}

            {hasProducts && (
              <div className={classes["cart-page-body"]}>
                <Cart
                  cart={cartProducts}
                  onRemove={handleRemoveCartItem}
                  onWish={handleWishlist}
                  {...summaryProps}
                />

                <span className={classes.title}>Ваши данные</span>
                <CartForm
                  onSubmit={submit}
                  value={input}
                  errors={errors}
                  onChange={handleChange}
                  isLoading={isLoading}
                />
              </div>
            )}
          </>
        </SectionBody>

        {showSuccess && (
          <div className={classes.modalBackdrop}>
            <div className={classes.modalContent}>
              <p>Ваш заказ оформлен! С вами свяжется менеджер.</p>
              <button onClick={() => setShowSuccess(false)}>Закрыть</button>
            </div>
          </div>
        )}
      </>
    </Section>
  );
};

export default CartPage;
