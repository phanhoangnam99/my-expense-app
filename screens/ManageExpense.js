import { useContext, useLayoutEffect, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import IconButton from "../UI/IconButton";
import { GlobalStyles } from "../constant/styles";
import Button from "../UI/Button";
import { ExpensesContext } from "../store/expeses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {
  deleteExpenseHttp,
  storeExpense,
  updateExpenseHttp,
} from "../utils/http";
import LoadingOverlay from "../UI/LoadingOverlay";
import ErrorOverlay from "../UI/ErrorOverlay";

function ManageExpense({ route, navigation }) {
  const { deleteExpense, addExpense, updateExpense, expenses } =
    useContext(ExpensesContext);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();

  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = expenses.find(
    (expense) => expense.id === editedExpenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }
  async function confirmHandler(expenseData) {
    setIsSubmitting(true);
    try {
      if (isEditing) {
        updateExpense(editedExpenseId, expenseData);

        await updateExpenseHttp(editedExpenseId, expenseData);
      } else {
        const id = await storeExpense(expenseData);
        addExpense({ ...expenseData, id: id });
      }
      navigation.goBack();
    } catch (error) {
      setError("Could not save data - please try again later");
      setIsSubmitting(false);
    }
  }

  async function deleteExpenseHandler() {
    setIsSubmitting(true);

    try {
      await deleteExpenseHttp(editedExpenseId);
      deleteExpense(editedExpenseId);
    } catch (error) {
      setError("Could not delete expense - please try again later");
      setIsSubmitting(false);
    }
    navigation.goBack();
  }

  function errorHandler() {
    setError(null);
  }

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  if (error && !isSubmitting) {
    console.log("eecececec");
    return <ErrorOverlay message={error}  />;
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <ExpenseForm
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
          defaultValue={selectedExpense}
        />
        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
