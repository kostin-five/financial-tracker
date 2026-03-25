import React from "react";

const Header = () => {
  return (
    <header>
      <h1>Мои Финансы</h1>
      <div className="balance-card">
        <h2>
          Баланс: <span>0</span> ₽
        </h2>
      </div>
    </header>
  );
};

export default Header;
