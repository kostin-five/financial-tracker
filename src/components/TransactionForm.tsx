import React, { useState, useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { TransactionType } from "../types";

const TransactionForm = () => {
  const { addTransaction } = useContext(TransactionContext);

  // Локальное состояние полей формы
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("income");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Отправляем данные в глобальный стейт
    await addTransaction({
      amount: parseFloat(amount),
      type,
      category,
      date,
    });

    // Очищаем форму после добавления
    setAmount("");
    setCategory("");
    setDate("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Сумма"
        required
      />
      <select
        value={type}
        onChange={(e) => setType(e.target.value as TransactionType)}
      >
        <option value="income">Доход</option>
        <option value="expense">Расход</option>
      </select>
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Категория"
        required
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Добавить</button>
    </form>
  );
};

export default TransactionForm;
