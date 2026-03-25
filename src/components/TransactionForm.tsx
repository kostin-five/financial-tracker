import React from "react";

const TransactionForm = () => {
  return (
    <form>
      <input type="number" placeholder="Сумма" required />
      <select>
        <option value="income">Доход</option>
        <option value="expense">Расход</option>
      </select>
      <input type="text" placeholder="Категория" required />
      <input type="date" required />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default TransactionForm;
