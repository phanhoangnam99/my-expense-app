import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { GlobalStyles } from "../constant/styles";

export default function LoadingOverlay() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItem: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
});
