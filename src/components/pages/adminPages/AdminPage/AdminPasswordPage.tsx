import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Новый импорт
import { PATHS } from "../../../../constants/routes";

const AdminPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handlePasswordSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Пример проверки пароля
    if (password === "admin123") {
      navigate(PATHS.admin); // Перенаправление в админскую панель
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <h2>Введите пароль</h2>
      <form onSubmit={handlePasswordSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
        <button type="submit">Войти</button>
      </form>
      {error && <p style={{ color: "red" }}>Неверный пароль!</p>}
    </div>
  );
};

export default AdminPasswordPage;
