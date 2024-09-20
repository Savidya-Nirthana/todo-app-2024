import TodoList from "./components/TodoList";
import DateTime from "./components/DateTime";
import { NativeWindStyleSheet } from "nativewind";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useState } from "react";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  const [searchText, setSearchText] = useState("");
  const [showSearch, SetShowSearch] = useState("");
  const [showAll, setShowAll] = useState(false);
  return (
    <>
      <DateTime
        setSearchText={setSearchText}
        showSearch={showSearch}
        setShowSearch={SetShowSearch}
        showAll={showAll}
        setShowAll={setShowAll}
      />
      <TodoList
        searchText={searchText}
        showSearch={showSearch}
        showAll={showAll}
        setShowAll={setShowAll}
      />
    </>
  );
}
