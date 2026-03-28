import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";
import { FilterType } from "../types";

export const useTransactions = () => {
  const { state, dispatch } = useContext(TransactionContext);

  const filteredTransactions =
    state.filter === "all"
      ? state.transactions
      : state.transactions.filter((t) => t.type === state.filter);

  const setFilter = (filter: FilterType) => {
    dispatch({ type: "SET_FILTER", payload: filter });
  };

  // Возвращаем только то, что нужно компоненту для отрисовки
  return {
    transactions: filteredTransactions,
    isLoading: state.isLoading,
    filter: state.filter,
    setFilter,
  };
};
