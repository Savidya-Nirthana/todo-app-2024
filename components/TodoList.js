import React, { useState, useEffect, useRef } from "react";

import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import TodoItem from "./TodoItem";
import GetItems from "./GetItems";
import TaskData from "./TaskData";

export default function TodoList({ searchText, showSearch, showAll, setShowAll }) {
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

  const searchTasks = () => {
    return sorting().filter((task) =>
      task.text.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const sorting = () => {
    const notSelectedTasksSort = [...tasks]
      .filter((task) => !task.completed)
      .sort((a, b) => a.id - b.id);

    const selectedTasksSort = [...tasks]
      .filter((task) => task.completed)
      .sort((a, b) => a.id - b.id);
    return [...notSelectedTasksSort, ...selectedTasksSort];
  };

  const pFilterTask =
    pFilter === null
      ? searchTasks()
      : pFilter === "h"
      ? searchTasks().filter((task) => task.priority === 2)
      : pFilter === "m"
      ? searchTasks().filter((task) => task.priority === 1)
      : searchTasks().filter((task) => task.priority === 0);

  const filterTasks =
    taskFilter === "a"
      ? pFilterTask
      : taskFilter === "u"
      ? pFilterTask.filter((task) => !task.completed)
      : pFilterTask.filter((task) => task.completed);

  const TaskToShow = showAll ? filterTasks : filterTasks.slice(0, 4);
  const today = new Date();
  const todayTasks = tasks.filter(
    (task) =>
      task.date.getFullYear() === today.getFullYear() &&
      task.date.getMonth() === today.getMonth() &&
      task.date.getDate() === today.getDate()
  );
  const toggleDrop = () => {
    setShowDrop(!showDrop);
  };
  const categoryList = [
    "Work",
    "Education",
    "Family",
    "Entertainment",
    "Cooking",
    "Friends",
  ];

  return (
    <View className="h-[72%] bg-[#181818]">
      <View>
        <View className=" px-2 bg-[#181818] ">
          <View className="w-[100%]">
            <View className="w-[90px] h-[3px]  bg-[#b6b6b6] relative top-[-10px] m-auto rounded-lg"></View>
          </View>
          <View className=" flex flex-row justify-evenly py-[10px]">
            <Animated.View
              style={{
                height: dropdownHeight,
                overflow: "hidden",
              }}
              className=" w-[110px] absolute top-[40px] right-[20px]"
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
              className={`py-[6px] px-[15px] rounded-[10px] ${
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
              className={`py-[6px] px-[15px] rounded-[10px] ${
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
              className={`py-[6px] px-[15px] rounded-[10px] ${
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
            <Text
              className="w-[110px] py-[5px] text-[#b6b6b6]  px-[2px]"
              onPress={toggleDrop}
            >
              Priority select{"  "}
              <FontAwesome
                name={`caret-${!showDrop ? "up" : "down"}`}
                size={20}
                color="#9ca3af"
              ></FontAwesome>
            </Text>
          </View>
          {!showAdd && (
            <View className="absolute top-[80%] z-[1] right-[10%]">
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
          <ScrollView>
            {!showSearch ? (
              <>
                <Text className=" text-[#b6b6b6] text-[20px]">Today</Text>
                {todayTasks.map((task) => (
                  <TodoItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                    editTask={editTask}
                  />
                ))}
                {todayTasks.length === 0 ? (
                  <View className="flex items-center justify-center w-full h-[70px]">
                    <Text className="text-[#b6b6b6]">No task to view</Text>
                  </View>
                ) : null}
              </>
            ) : null}
            <Text className=" text-[#b6b6b6] text-[20px]">All Tasks</Text>
            {showSearch && TaskToShow.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                toggleCompleted={toggleCompleted}
                editTask={editTask}
              />
            ))}
            {filterTasks.length > 4 && (
              <View className="flex items-center justify-center mt-4">
                <TouchableOpacity
                  className="bg-[#181818] p-1 rounded w-[100px] flex flex-row gap-2 "
                  onPress={() => setShowAll(!showAll)}
                >
                  <Text className="text-white text-center  text-[16px]">
                    {showAll ? "See Less" : "See More"}
                  </Text>
                  <FontAwesome
                    name={`caret-${!showAll ? "up" : "down"}`}
                    size={20}
                    color="#9ca3af"
                  ></FontAwesome>
                </TouchableOpacity>
              </View>
            )}

            {categoryList.map((cat) => {
              const catTasks = tasks.filter((task) => task.category === cat);

              return (
                <View key={cat}>
                  <Text className="text-[#b6b6b6] text-[20px]">{cat}</Text>
                  {catTasks.map((task) => (
                    <TodoItem
                      key={task.id}
                      task={task}
                      deleteTask={deleteTask}
                      toggleCompleted={toggleCompleted}
                      editTask={editTask}
                    />
                  ))}
                </View>
              );
            })}
          </ScrollView>
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
      </View>
    </View>
  );
}
