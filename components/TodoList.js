import React, { useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import TodoItem from "./TodoItem";
import GetItems from "./GetItems";
import TaskData from "./TaskData";

export default function TodoList() {
  const [showAdd, setShowAdd] = useState(false);
  const [tasks, setTasks] = useState(TaskData());
  const [taskFilter, setTaskFilter] = useState("a");
  const [eTask, setETask] = useState(null);
  const [pFilter, setPFilter] = useState(null);
  const [showDrop, setShowDrop] = useState(false);
  const dropdownHeight = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(dropdownHeight, {
      toValue: showDrop ? 160 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  }, [showDrop]);
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

  const toggleDrop = () => {
    setShowDrop(!showDrop);
  };

  return (
    <>
      <View className=" px-2 bg-[#181818] z-10 relative -top-[85%] h-[85%] rounded-3xl">
        <View className="w-[100%]">
          <View className="w-[90px] h-[3px]  bg-[#b6b6b6] relative top-[-10px] m-auto rounded-lg"></View>
        </View>

        <View className=" flex flex-row justify-evenly py-[10px]">
          <Text
            className="w-[110px] py-[10px] text-[#b6b6b6]  px-[2px]"
            onPress={toggleDrop}
          >
            Priority select{"  "}
            <FontAwesome
              name={`caret-${!showDrop ? "up" : "down"}`}
              size={20}
              color="#9ca3af"
            ></FontAwesome>
          </Text>
          <Animated.View
            style={{
              height: dropdownHeight,
              overflow: "hidden",
            }}
            className="z-10000 w-[110px] absolute top-[10px]"
          >
            <Text
              className={`py-[10px] px-[15px] ${
                pFilter === null
                  ? "bg-[#0c360c] text-[#1ba321]"
                  : "bg-[#212121] text-[#b6b6b6]"
              }`}
              onPress={() => {
                setPFilter(null);
                toggleDrop();
              }}
            >
              All
            </Text>
            <Text
              className={`py-[10px] px-[15px] ${
                pFilter === "h"
                  ? "bg-[#0c360c] text-[#1ba321]"
                  : "bg-[#212121] text-[#b6b6b6]"
              }`}
              onPress={() => {
                setPFilter("h");
                toggleDrop();
              }}
            >
              High
            </Text>
            <Text
              className={`py-[10px] px-[15px] ${
                pFilter === "m"
                  ? "bg-[#0c360c] text-[#1ba321]"
                  : "bg-[#212121] text-[#b6b6b6]"
              }`}
              onPress={() => {
                setPFilter("m");
                toggleDrop();
              }}
            >
              Medium
            </Text>
            <Text
              className={`py-[10px] px-[15px] ${
                pFilter === "l"
                  ? "bg-[#0c360c] text-[#1ba321]"
                  : "bg-[#212121] text-[#b6b6b6]"
              }`}
              onPress={() => {
                setPFilter("l");
                toggleDrop();
              }}
            >
              Low
            </Text>
          </Animated.View>
          <Text
            className={` py-[10px] px-[15px] rounded-[17px] ${
              taskFilter === "a"
                ? "bg-[#0c360c] text-[#1ba321]"
                : "bg-[#3b3b3b] text-[#b6b6b6]"
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
                ? "bg-[#0c360c] text-[#1ba321]"
                : "bg-[#3b3b3b] text-[#b6b6b6]"
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
                ? "bg-[#0c360c] text-[#1ba321]"
                : "bg-[#3b3b3b] text-[#b6b6b6]"
            }`}
            onPress={() => {
              setTaskFilter("d");
            }}
          >
            Done
          </Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} className="-z-10">
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

        {!showAdd && (
          <View className=" absolute top-[85%] left-[80%] z-100">
            <TouchableOpacity
              className="bg-[#136439] w-[50px] h-[50px] rounded-lg flex items-center justify-center"
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
