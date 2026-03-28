import React from "react";
import { useTransactions } from "../hooks/useTransactions";
import { FilterType } from "../types";

const TransactionList = () => {
  // Достаем из хука готовые отфильтрованные данные и функцию переключения
  const { transactions, isLoading, filter, setFilter } = useTransactions();

  // Пока данные "летят" из нашего mock-API, показываем загрузку
  if (isLoading) return <p>Загрузка...</p>;

  return (
    <div className="transactions">
      <div className="filters">
        <select
          value={filter}
          onChange={(e) =>
            setFilter(e.target.value as FilterType)
          }
        >
          <option value="all">Все операции</option>
          <option value="income">Только доходы</option>
          <option value="expense">Только расходы</option>
        </select>
      </div>
      <ul>
        {transactions.map((t) => (
          <li key={t.id}>
            <span>
              <strong>{t.category}</strong> ({t.date})
            </span>
            <span className={t.type === "income" ? "income" : "expense"}>
              {t.type === "income" ? "+" : "-"}
              {t.amount} ₽
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
