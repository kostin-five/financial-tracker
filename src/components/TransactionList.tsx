import React from "react";

const TransactionList = () => {
  return (
    <div className="transactions">
      <div className="filters">
        <select>
          <option value="all">Все операции</option>
          <option value="income">Только доходы</option>
          <option value="expense">Только расходы</option>
        </select>
      </div>
      <ul>{/* Пока список пуст, мы наполним его на следующем шаге */}</ul>
    </div>
  );
};

export default TransactionList;
