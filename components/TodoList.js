import React, { useState } from "react";

import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import TodoItem from "./TodoItem";
import GetItems from "./GetItems";

export default function TodoList() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctor Appointment",
      description: "",
      date: "",
      time: "",
      priority: "",
      completed: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      description: "",
      date: "",
      time: "",
      priority: "",
      completed: false,
    },
  ]);
  const [text, setText] = useState("");
  // Function to Add Task
  function addTask() {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
    setText("");
  }
  // Function to Delete Task
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }
  // Function to Toggle Task Completion
  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
  // Render TodoList Component
  return (
    <View className="p-5 bg-[#f2f2f2] z-10 relative -top-[85%] h-full rounded-3xl">
      <View className="w-[100%]">
        <View className="w-[50px] h-[3px]  bg-[#f2f2f2] relative top-[-30px] m-auto rounded-lg"></View>
      </View>

      <View className=" flex flex-row justify-evenly pb-[20px]">
        <Text className=" text-white bg-[#2a2b2a] py-[10px] px-[15px] rounded-[17px]">
          All
        </Text>
        <Text className=" bg-white py-[10px] px-[15px] rounded-[17px]">
          Undone
        </Text>
        <Text className="bg-white py-[10px] px-[15px] rounded-[17px]">
          Done
        </Text>
      </View>
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleCompleted={toggleCompleted}
        />
      ))}
      {!showAdd&&<View className=" absolute top-[75%] left-[80%] z-100">
        <TouchableOpacity
          className="bg-[#2a2b2a] w-[50px] h-[50px] rounded-lg flex items-center justify-center"
          onPress={() => {
            setShowAdd(true);
          }}
        >
          <Text className="text-white text-[30px]">+</Text>
        </TouchableOpacity>
      </View>}
      {showAdd && <GetItems value={showAdd} setValue={setShowAdd} />}
    </View>
  );
}
