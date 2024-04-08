import { Text } from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpensesContext } from "../store/expeses-context";
import { useContext, useEffect, useState } from "react";
import { getDateMinusDays } from "../utils/date";
import { fetchExpenses } from "../utils/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function RecentExpenses() {
  const [isFetching, setIsFetching] = useState(true);

  const [error, setError] = useState();

  const { expenses, setExpenses } = useContext(ExpensesContext);

  useEffect(() => {
    async function getExpense() {
      setIsFetching(true);
      try {
        const expenses = await fetchExpenses();
        setExpenses(expenses);
      } catch (error) {
        setError("Could not fetch expenses");
      }
      setIsFetching(false);
    }

    getExpense();
  }, []);

  const recentExpenses = expenses.filter((expense) => {
    const today = new Date();

    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  });

function errorHandler() {
  setError(null)
}


  if (error && !isFetching) {
    return <ErrorOverlay message={error}  />;
  }

  if (isFetching) {
    return <LoadingOverlay />;
  }
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod={"Last 7 days"}
      fallbackText={"No expenses registered for the last 7 days"}
    />
  );
}

export default RecentExpenses;
