import { useContext } from "react";
import { TransactionContext } from "../context/TransactionContext";

export const useBalance = () => {
  const { state } = useContext(TransactionContext);

  // Вся математика теперь живет здесь, отдельно от UI
  return state.transactions.reduce((acc, curr) => {
    return curr.type === "income" ? acc + curr.amount : acc - curr.amount;
  }, 0);
};
