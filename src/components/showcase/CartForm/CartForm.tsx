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
  const handleNicknameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e); // Просто передаем событие дальше без модификаций
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(e); // Просто передаем событие дальше без модификаций
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
          placeholder={"Введите ваш никнейм (начинается с @)"}
        />

        <Input
          label={"Телефон"}
          errorText={errors.phone || ""}
          name={"phone"}
          type={"tel"}
          value={value.phone || ""}
          onChange={handlePhoneChange}
          required
          placeholder={"Введите номер (начинается с +)"}
        />

        <Input
          label={"Email"}
          errorText={errors.address || ""}
          name={"address"}
          type={"email"}
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
