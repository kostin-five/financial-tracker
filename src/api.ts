import { Transaction } from "./types";

const STORAGE_KEY = "transactions";

export const fetchTransactions = async (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = localStorage.getItem(STORAGE_KEY);
      resolve(data ? JSON.parse(data) : []);
    }, 300);
  });
};

export const saveTransaction = async (
  transaction: Transaction
): Promise<Transaction> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = localStorage.getItem(STORAGE_KEY);
      const transactions: Transaction[] = data ? JSON.parse(data) : [];
      transactions.push(transaction);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
      resolve(transaction);
    }, 300);
  });
};
