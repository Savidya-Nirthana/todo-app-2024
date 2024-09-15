import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import TodoList from "./components/TodoList";
import DateTime from "./components/DateTime";
import Hellow from "./components/Hellow";
import { NativeWindStyleSheet } from "nativewind";
import GetItems from "./components/GetItems";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <>
      <DateTime />
      <TodoList />
    </>
  );
}
