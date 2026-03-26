import React, { createContext, useReducer, useEffect, ReactNode } from "react";
import { Transaction, TransactionType } from "../types";
import { fetchTransactions, saveTransaction } from "../api";

// 1. Описываем, как выглядит наш стейт
type State = {
  transactions: Transaction[];
  filter: "all" | TransactionType;
  isLoading: boolean;
};

// 2. Описываем все возможные действия в приложении
type Action =
  | { type: "SET_TRANSACTIONS"; payload: Transaction[] }
  | { type: "ADD_TRANSACTION"; payload: Transaction }
  | { type: "SET_FILTER"; payload: "all" | TransactionType };

// 3. Начальное состояние
const initialState: State = {
  transactions: [],
  filter: "all",
  isLoading: true,
};

// 4. Редьюсер — функция, которая меняет стейт в зависимости от экшена
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_TRANSACTIONS":
      return { ...state, transactions: action.payload, isLoading: false };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [...state.transactions, action.payload],
      };
    case "SET_FILTER":
      return { ...state, filter: action.payload };
    default:
      return state;
  }
};

// 5. Создаем сам контекст
export const TransactionContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
  addTransaction: (t: Omit<Transaction, "id">) => Promise<void>;
}>({
  state: initialState,
  dispatch: () => null,
  addTransaction: async () => {},
});

// 6. Провайдер — компонент-обертка, который раздает данные
export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // При первом запуске загружаем данные из нашего mock-API
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTransactions();
      dispatch({ type: "SET_TRANSACTIONS", payload: data });
    };
    loadData();
  }, []);

  // Функция для добавления новой записи (сначала в mock-API, потом в стейт)
  const addTransaction = async (transactionData: Omit<Transaction, "id">) => {
    const newTransaction = { ...transactionData, id: Date.now() };
    const saved = await saveTransaction(newTransaction);
    dispatch({ type: "ADD_TRANSACTION", payload: saved });
  };

  return (
    <TransactionContext.Provider value={{ state, dispatch, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};
