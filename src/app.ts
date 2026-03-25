import { Transaction, TransactionType, FilterType } from "./types";
import { fetchTransactions, saveTransaction } from "./api";

const form = document.getElementById("transaction-form") as HTMLFormElement;
const balanceEl = document.getElementById("balance") as HTMLSpanElement;
const listEl = document.getElementById("transactions-list") as HTMLUListElement;
const filterTypeEl = document.getElementById(
  "filter-type"
) as HTMLSelectElement;

let currentTransactions: Transaction[] = [];

function updateUI(filteredTransactions: Transaction[]) {
  listEl.innerHTML = "";
  let balance = 0;

  filteredTransactions.forEach((t) => {
    const li = document.createElement("li");
    const isIncome = t.type === "income";
    const amountClass = isIncome ? "income" : "expense";
    const sign = isIncome ? "+" : "-";

    li.innerHTML = `
      <span><strong>${t.category}</strong> (${t.date})</span>
      <span class="${amountClass}">${sign}${t.amount} ₽</span>
    `;
    listEl.appendChild(li);
  });

  currentTransactions.forEach((t) => {
    if (t.type === "income") {
      balance += t.amount;
    } else {
      balance -= t.amount;
    }
  });

  balanceEl.textContent = balance.toString();
}

const init = async () => {
  currentTransactions = await fetchTransactions();
  updateUI(currentTransactions);
};

form.addEventListener("submit", async (e: SubmitEvent) => {
  e.preventDefault();

  const amount = document.getElementById("amount") as HTMLInputElement;
  const type = document.getElementById("type") as HTMLSelectElement;
  const category = document.getElementById("category") as HTMLInputElement;
  const date = document.getElementById("date") as HTMLInputElement;

  const transaction: Transaction = {
    id: Date.now(),
    amount: parseFloat(amount.value),
    type: type.value as TransactionType,
    category: category.value,
    date: date.value,
  };

  await saveTransaction(transaction);
  currentTransactions.push(transaction);

  form.reset();
  updateUI(currentTransactions);
});

filterTypeEl.addEventListener("change", (e: Event) => {
  const select = e.target as HTMLSelectElement;
  const filterValue = select.value as FilterType;

  if (filterValue === "all") {
    updateUI(currentTransactions);
  } else {
    const filtered = currentTransactions.filter((t) => t.type === filterValue);
    updateUI(filtered);
  }
});

init();
