import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

const Header = () => {
  const { state } = useContext(TransactionContext);

  // Считаем баланс на лету
  const balance = state.transactions.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);

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
