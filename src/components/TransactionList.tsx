import React, { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { FilterType } from "../types";

const TransactionList = () => {
  const { state, dispatch } = useContext(TransactionContext);

  // Пока данные "летят" из нашего mock-API, показываем загрузку
  if (state.isLoading) return <p>Загрузка...</p>;

  // Логика фильтрации
  const filteredTransactions =
    state.filter === "all"
      ? state.transactions
      : state.transactions.filter((t) => t.type === state.filter);

  return (
    <div className="transactions">
      <div className="filters">
        <select
          value={state.filter}
          onChange={(e) =>
            dispatch({
              type: "SET_FILTER",
              payload: e.target.value as FilterType,
            })
          }
        >
          <option value="all">Все операции</option>
          <option value="income">Только доходы</option>
          <option value="expense">Только расходы</option>
        </select>
      </div>
      <ul>
        {filteredTransactions.map((t) => (
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
