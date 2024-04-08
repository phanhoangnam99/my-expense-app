import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { useContext } from "react";
import { ExpensesContext } from "../store/expeses-context";

function AllExpenses() {
  const { expenses } = useContext(ExpensesContext);
  return <ExpensesOutput expenses={expenses} expensesPeriod={"Total"} fallbackText={"No expenses registered "}/>;
}

export default AllExpenses;
