import React from "react";
import { useBalance } from "../hooks/useBalance";

const Header = () => {

  // Считаем баланс на лету
  const balance = useBalance()

  return (
    <header>
      <h1>Мои Финансы</h1>
      <div className="balance-card">
        <h2>
          Баланс: <span>{balance}</span> ₽
        </h2>
      </div>
    </header>
  );
};

export default Header;
