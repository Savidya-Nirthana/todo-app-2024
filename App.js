import TodoList from "./components/TodoList";
import DateTime from "./components/DateTime";
import { NativeWindStyleSheet } from "nativewind";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <DateTime setSearchText={setSearchText} />
      <TodoList searchText={searchText} />
    </>
  );
}
