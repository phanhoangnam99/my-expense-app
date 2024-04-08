import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { GlobalStyles } from "../../constant/styles";

export default function Input({ label, style, textInputConfig, invalid }) {
  let inputStyles = [styles.input];

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }


  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  return (
    <View style={[styles.inputContaner, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContaner: {
    marginHorizontal: 4,
    marginVertical: 16,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },

  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: GlobalStyles.colors.primary700,
  },

  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: { color: GlobalStyles.colors.error500 },
  invalidInput: { backgroundColor: GlobalStyles.colors.error50 },
});
