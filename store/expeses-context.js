import { createContext, useReducer } from "react";

// const DUMMY_EXPENSES = [
//   {
//     id: "e1",
//     description: "A pair of shoes",
//     amount: 59.99,
//     date: new Date("2024-04-01"),
//   },
//   {
//     id: "e2",
//     description: "A pair of trousers",
//     amount: 89.29,
//     date: new Date("2022-01-05"),
//   },
//   {
//     id: "e3",
//     description: "Some bananas",
//     amount: 5.99,
//     date: new Date("2021-12-01"),
//   },
//   {
//     id: "e4",
//     description: "A book",
//     amount: 14.99,
//     date: new Date("2022-02-19"),
//   },
//   {
//     id: "e5",
//     description: "Another book",
//     amount: 18.59,
//     date: new Date("2022-02-19"),
//   },
// ];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
  setExpenses: (expenses) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updatableExpenseIndex];

      const updatedItem = { ...updatableExpense, ...action.payload.data };

      const updatedExpenses = [...state];

      updatedExpenses[updatableExpenseIndex] = updatedItem;

      return updatedExpenses;
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    case "SET":
      const inverted = action.payload.reverse();
      return inverted;

    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, []);
  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpensesState(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  }

  function setExpenses(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpensesState,
    setExpenses: setExpenses,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
