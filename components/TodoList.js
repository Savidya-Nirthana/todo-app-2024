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
import TaskData from "./TaskData";

export default function TodoList() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState(TaskData());
  const [text, setText] = useState("");
  const [taskFilter, setTaskFilter] = useState("a");

  // function addTask() {
  //   const newTask = { id: Date.now(), text, completed: false };
  //   setTasks([...tasks, newTask]);
  //   setText("");
  // }
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
    <>
      <View className="p-5 bg-[#f2f2f2] z-10 relative -top-[85%] h-full rounded-3xl">
        <View className="w-[100%]">
          <View className="w-[50px] h-[3px]  bg-[#f2f2f2] relative top-[-30px] m-auto rounded-lg"></View>
        </View>

        <View className=" flex flex-row justify-evenly pb-[20px]">
          <Text
            className={` py-[10px] px-[15px] rounded-[17px] ${
              taskFilter === "a"
                ? "bg-[#2a2b2a] text-white"
                : "bg-white text-black"
            }`}
            onPress={() => {
              setTaskFilter("a");
            }}
          >
            All
          </Text>
          <Text
            className={` py-[10px] px-[15px] rounded-[17px] ${
              taskFilter === "u"
                ? "bg-[#2a2b2a] text-white"
                : "bg-white text-black"
            }`}
            onPress={() => {
              setTaskFilter("u");
            }}
          >
            Undone
          </Text>
          <Text
            className={` py-[10px] px-[15px] rounded-[17px] ${
              taskFilter === "d"
                ? "bg-[#2a2b2a] text-white"
                : "bg-white text-black"
            }`}
            onPress={() => {
              setTaskFilter("d");
            }}
          >
            Done
          </Text>
        </View>
        {taskFilter === "a"
          ? tasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
              />
            ))
          : taskFilter === "u"
          ? tasks
              .filter((task) => !task.completed)
              .map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  toggleCompleted={toggleCompleted}
                />
              ))
          : tasks
              .filter((task) => task.completed)
              .map((task) => (
                <TodoItem
                  key={task.id}
                  task={task}
                  deleteTask={deleteTask}
                  toggleCompleted={toggleCompleted}
                />
              ))}

        {!showAdd && (
          <View className=" absolute top-[75%] left-[80%] z-100">
            <TouchableOpacity
              className="bg-[#2a2b2a] w-[50px] h-[50px] rounded-lg flex items-center justify-center"
              onPress={() => {
                setShowAdd(true);
              }}
            >
              <Text className="text-white text-[30px]">+</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      {showAdd && (
        <GetItems
          value={showAdd}
          setValue={setShowAdd}
          tasks={tasks}
          setTasks={setTasks}
        />
      )}
    </>
  );
}
