const form = document.getElementById("transaction-form");
const balanceEl = document.getElementById("balance");
const listEl = document.getElementById("transactions-list");
const filterTypeEl = document.getElementById("filter-type");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateUI(filteredTransactions = transactions) {
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

  transactions.forEach((t) => {
    if (t.type === "income") {
      balance += t.amount;
    } else {
      balance -= t.amount;
    }
  });

  balanceEl.textContent = balance;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;
  const date = document.getElementById("date").value;

  const transaction = {
    id: Date.now(),
    amount,
    type,
    category,
    date,
  };

  transactions.push(transaction);
  localStorage.setItem("transactions", JSON.stringify(transactions));

  form.reset();
  updateUI();
});

filterTypeEl.addEventListener("change", (e) => {
  const type = e.target.value;
  if (type === "all") {
    updateUI(transactions);
  } else {
    const filtered = transactions.filter((t) => t.type === type);
    updateUI(filtered);
  }
});

updateUI();
