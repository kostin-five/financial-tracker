import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { useTransactions } from "../hooks/useTransactions";

// Цвета для разных категорий на графике
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884D8",
  "#E06666",
];

const ExpensesChart = () => {
  const { transactions, filter } = useTransactions();

  // Группируем по категориям
  const dataByCategory = transactions.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + Math.abs(curr.amount);
    return acc;
  }, {} as Record<string, number>);

  const data = Object.keys(dataByCategory).map((key, index) => ({
    name: key,
    value: dataByCategory[key],
    fill: COLORS[index % COLORS.length],
  }));

  const getChartTitle = () => {
    if (filter === "income") return "Структура доходов";
    if (filter === "expense") return "Структура расходов";
    return "Общая статистика";
  };

  // Если расходов нет, показываем заглушку вместо пустого места
  if (data.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#777", margin: "20px 0" }}>
        Нет данных для отображения статистики
      </p>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: 300,
        marginBottom: "20px",
        outline: "none",
      }}
    >
      <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
        {getChartTitle()}
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart style={{ outline: "none" }}>
          <Pie
            data={data}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
            style={{ outline: "none" }}
          ></Pie>
          <Tooltip formatter={(value: any) => `${value} ₽`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ExpensesChart;
