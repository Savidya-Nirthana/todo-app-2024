import React, { useState, useEffect } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";

import TodoItem from "./TodoItem";
import GetItems from "./GetItems";
import TaskData from "./TaskData";

export default function TodoList() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState(TaskData());
  const [taskFilter, setTaskFilter] = useState("a");
  const [eTask, setETask] = useState(null);
  const [pFilter, setPFilter] = useState(null);
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function editTask(id) {
    const selectedTask = tasks.filter((task) => task.id === id)[0];
    setETask(selectedTask);
    setShowAdd(true);
  }

  useEffect(() => {
    if (eTask) {
      // console.log("Edited Task: ", eTask);
    }
  }, [eTask]);

  function toggleCompleted(id) {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }
  const pFilterTask =
    pFilter === null
      ? tasks
      : pFilter === "h"
      ? tasks.filter((task) => task.priority === 2)
      : pFilter === "m"
      ? tasks.filter((task) => task.priority === 1)
      : tasks.filter((task) => task.priority === 0);

  const filterTasks =
    taskFilter === "a"
      ? pFilterTask
      : taskFilter === "u"
      ? pFilterTask.filter((task) => !task.completed)
      : pFilterTask.filter((task) => task.completed);

  return (
    <>
      <View className=" px-5 bg-[#f2f2f2] z-10 relative -top-[85%] h-[85%] rounded-3xl">
        <View className="w-[100%]">
          <View className="w-[50px] h-[3px]  bg-[#f2f2f2] relative top-[-30px] m-auto rounded-lg"></View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View className=" flex flex-row justify-evenly py-[10px]">
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

          {filterTasks.map((task) => (
            <TodoItem
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              toggleCompleted={toggleCompleted}
              editTask={editTask}
            />
          ))}
        </ScrollView>
        <View className="z-10 flex flex-row py-[10px] justify-evenly">
          <Text
            className={` py-[10px] px-[15px] rounded-[17px] ${
              pFilter === null
                ? "bg-[#2a2b2a] text-white"
                : "bg-white text-black"
            }`}
            onPress={() => {
              setPFilter(null);
            }}
          >
            All
          </Text>
          <Text
            className={` py-[10px] px-[15px] rounded-[17px] ${
              pFilter === "h"
                ? "bg-[#2a2b2a] text-white"
                : "bg-white text-black"
            }`}
            onPress={() => {
              setPFilter("h");
            }}
          >
            High
          </Text>
          <Text
            className={` py-[10px] px-[15px] rounded-[17px] ${
              pFilter === "m"
                ? "bg-[#2a2b2a] text-white"
                : "bg-white text-black"
            }`}
            onPress={() => {
              setPFilter("m");
            }}
          >
            Medium
          </Text>
          <Text
            className={` py-[10px] px-[15px] rounded-[17px] ${
              pFilter === "l"
                ? "bg-[#2a2b2a] text-white"
                : "bg-white text-black"
            }`}
            onPress={() => {
              setPFilter("l");
            }}
          >
            Low
          </Text>
        </View>

        {!showAdd && (
          <View className=" absolute top-[80%] left-[80%] z-100">
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
          eTask={eTask}
          setETask={setETask}
          deleteTask={deleteTask}
        />
      )}
    </>
  );
}
