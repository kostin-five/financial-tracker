import React from "react";
import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import ExpensesChart from "./components/ExpensesChart";

const App = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <section className="controls">
          <TransactionForm />
        </section>
        <ExpensesChart />

        <TransactionList />
      </main>
    </div>
  );
};

export default App;
