import TodoList from "./components/TodoList";
import DateTime from "./components/DateTime";
import { NativeWindStyleSheet } from "nativewind";

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
