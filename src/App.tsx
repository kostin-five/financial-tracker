import React from "react";
import Header from "./components/Header";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

const App = () => {
  return (
    <div className="container">
      <Header />
      <main>
        <section className="controls">
          <TransactionForm />
        </section>
        <TransactionList />
      </main>
    </div>
  );
};

export default App;
