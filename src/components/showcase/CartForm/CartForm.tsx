// import Button from "../../UI/Button/Button";
// import Form from "../../UI/Form/Form";
// import Input from "../../UI/Input/Input";
// import classes from "./CartForm.module.css";

// interface ICartFormProps {
//   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//   onChange: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => void;
//   value: { [key: string]: string };
//   errors: { [key: string]: string | undefined };
//   isLoading: boolean;
// }

// const CartForm: React.FC<ICartFormProps> = ({
//   onSubmit,
//   onChange,
//   value,
//   errors,
//   isLoading,
// }) => {
//   return (
//     <Form onSubmit={onSubmit}>
//       <div className={classes["cart-form"]}>
//         <Input
//           label={"Никнейм"}
//           errorText={errors.name || ""}
//           name={"name"}
//           type={"text"}
//           value={value.name || ""}
//           onChange={onChange}
//           required
//           placeholder={"@nickname"}
//         />

//         <Input
//           label={"Телефон"}
//           errorText={errors.phone || ""}
//           name={"phone"}
//           type={"text"}
//           value={value.phone || ""}
//           onChange={onChange}
//           required
//           placeholder={"Сотовый номер"}
//         />

//         <Input
//           label={"Email"}
//           errorText={errors.address || ""}
//           name={"address"}
//           type={"email"}
//           value={value.address || ""}
//           onChange={onChange}
//           required
//           placeholder={"example@mail.com"}
//         />

//         <div className={classes.action}>
//           <Button mode={"primary"} type={"submit"} isLoading={isLoading}>
//             Оформить заказ
//           </Button>
//         </div>
//       </div>
//     </Form>
//   );
// };

// export default CartForm;
// CartForm.tsx
import { useEffect } from "react";
import Button from "../../UI/Button/Button";
import Form from "../../UI/Form/Form";
import Input from "../../UI/Input/Input";
import classes from "./CartForm.module.css";

interface ICartFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  value: { [key: string]: string };
  errors: { [key: string]: string | undefined };
  isLoading: boolean;
}

const CartForm: React.FC<ICartFormProps> = ({
  onSubmit,
  onChange,
  value,
  errors,
  isLoading,
}) => {
  // Форматирование телефона в международный формат
  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, "");
    let formatted = cleaned;

    if (cleaned.length > 0) {
      formatted = `+${cleaned}`;

      if (cleaned.length > 2) {
        formatted = `${formatted.slice(0, 3)} (${formatted.slice(3)}`;
      }
      if (cleaned.length > 5) {
        formatted = `${formatted.slice(0, 8)})-${formatted.slice(8)}`;
      }
      if (cleaned.length > 9) {
        formatted = formatted.slice(0, 14);
      }
    }

    return formatted;
  };

  // Автоматическое заполнение данных из Telegram
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    const user = tg?.initDataUnsafe?.user;

    if (user) {
      // Заполняем никнейм
      if (user.username && !value.name) {
        onChange({
          target: {
            name: "name",
            value: `@${user.username}`,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }

      // Заполняем телефон (если доступен)
      if (user.phone_number && !value.phone) {
        const formattedPhone = formatPhoneNumber(user.phone_number);
        onChange({
          target: {
            name: "phone",
            value: formattedPhone,
          },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }
  }, []);

  const handleNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let value = e.target.value;
    if (value && !value.startsWith("@")) {
      value = `@${value}`;
    }
    onChange({
      ...e,
      target: {
        ...e.target,
        value,
      },
    });
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange({
      ...e,
      target: {
        ...e.target,
        value: formatted,
      },
    });
  };

  return (
    <Form onSubmit={onSubmit}>
      <div className={classes["cart-form"]}>
        <Input
          label={"Никнейм"}
          errorText={errors.name || ""}
          name={"name"}
          type={"text"}
          value={value.name || ""}
          onChange={handleNicknameChange}
          required
          placeholder={"Введите ваш никнейм"}
        />

        <Input
          label={"Телефон"}
          errorText={errors.phone || ""}
          name={"phone"}
          type={"tel"}
          value={value.phone || ""}
          onChange={handlePhoneChange}
          required
          placeholder={"+48 (123)-456-789"}
        />

        <Input
          label={"Email"}
          errorText={errors.email || ""}
          name={"email"}
          type={"email"}
          value={value.email || ""}
          onChange={onChange}
          required={false}
          placeholder={"example@mail.com"}
        />

        <Input
          label={"Email"}
          errorText={errors.address || ""}
          name={"address"}
          type={"text"}
          value={value.address || ""}
          onChange={onChange}
          required
          placeholder={"example@mail.com"}
        />

        <div className={classes.action}>
          <Button mode={"primary"} type={"submit"} isLoading={isLoading}>
            Оформить заказ
          </Button>
        </div>
      </div>
    </Form>
  );
};

export default CartForm;
// import Button from "../../UI/Button/Button";
// import Form from "../../UI/Form/Form";
// import Input from "../../UI/Input/Input";
// import classes from "./CartForm.module.css";

// interface ICartFormProps {
//   onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
//   onChange: (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => void;
//   value: { [key: string]: string };
//   errors: { [key: string]: string | undefined };
//   isLoading: boolean;
// }

// const CartForm: React.FC<ICartFormProps> = ({
//   onSubmit,
//   onChange,
//   value,
//   errors,
//   isLoading,
// }) => {
//   const handleNicknameChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     onChange(e); // Просто передаем событие дальше без модификаций
//   };

//   const handlePhoneChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     onChange(e); // Просто передаем событие дальше без модификаций
//   };

//   return (
//     <Form onSubmit={onSubmit}>
//       <div className={classes["cart-form"]}>
//         <Input
//           label={"Никнейм"}
//           errorText={errors.name || ""}
//           name={"name"}
//           type={"text"}
//           value={value.name || ""}
//           onChange={handleNicknameChange}
//           required
//           placeholder={"Введите ваш никнейм (начинается с @)"}
//         />

//         <Input
//           label={"Телефон"}
//           errorText={errors.phone || ""}
//           name={"phone"}
//           type={"tel"}
//           value={value.phone || ""}
//           onChange={handlePhoneChange}
//           required
//           placeholder={"Введите номер (начинается с +)"}
//         />

//         <Input
//           label={"Email"}
//           errorText={errors.address || ""}
//           name={"address"}
//           type={"email"}
//           value={value.address || ""}
//           onChange={onChange}
//           required
//           placeholder={"example@mail.com"}
//         />

//         <div className={classes.action}>
//           <Button mode={"primary"} type={"submit"} isLoading={isLoading}>
//             Оформить заказ
//           </Button>
//         </div>
//       </div>
//     </Form>
//   );
// };

// export default CartForm;
