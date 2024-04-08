import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Input from "./Input";
import Button from "../../UI/Button";
import { getFormattedDate } from "../../utils/date";
import { GlobalStyles } from "../../constant/styles";

export default function ExpenseForm({
  route,
  navigation,
  onCancel,
  onSubmit,
  submitButtonLabel,
  defaultValue,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValue ? defaultValue.description.toString() : "",
      isValid: true,
    },
  });

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((prevState) => ({
        amount: { value: prevState.amount.value, isValid: amountIsValid },
        date: { value: prevState.date.value, isValid: dateIsValid },
        description: {
          value: prevState.description.value,
          isValid: descriptionIsValid,
        },
      }));

      return;
    }
    onSubmit(expenseData);
  }

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((prevState) => ({
      ...prevState,
      [inputIdentifier]: { value: enteredValue, isValid: true },
    }));
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}> Your Expense</Text>
      <View style={styles.inputRows}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: (amount) => inputChangeHandler("amount", amount),
            value: inputs.amount.value,
          }}
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: (date) => inputChangeHandler("date", date),
            value: inputs.date.value,
          }}
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          multiline: true,
          //   autoCapitalize: "none",
          // autoCorrect: false // default is true
          onChangeText: (desc) => inputChangeHandler("description", desc),
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
      {formIsInvalid && <Text style={styles.errorText}>Invalid vllllll</Text>}
      <View style={styles.buttons}>
        <Button
          style={styles.button}
          title="Cancel"
          mode="flat"
          onPress={onCancel}
        >
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  inputRows: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  rowInput: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },


});
