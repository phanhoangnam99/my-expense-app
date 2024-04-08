import { StatusBar } from "expo-status-bar";
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constant/styles";
import { Ionicons } from "@expo/vector-icons";
import IconButton from "./UI/IconButton";
import ExpensesContextProvider from "./store/expeses-context";
const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary500 },
        tabBarActiveTintColor: GlobalStyles.colors.accent500,
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <Tabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: "Recent Expenses",
          tabBarLabel: "Recent",
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name="hourglass" size={size} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ size, color }) => {
            return <Ionicons name="calendar" size={size} color={color} />;
          },
        }}
      />
    </Tabs.Navigator>
  );
}
export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <ExpensesContextProvider>
        <NavigationContainer>
         
              <Stack.Navigator
                screenOptions={{
                  headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500,
                  },
                  headerTintColor: "#fff",
                }}
              >
                <Stack.Screen
                  name="ExpensesOverview"
                  component={ExpensesOverview}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="ManageExpense"
                  component={ManageExpense}
                  options={{ presentation: "modal" }}
                />
              </Stack.Navigator>
          
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center ",
    justifyContent: "center",
  },
});
