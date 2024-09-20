import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import Checkbox from "expo-checkbox";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  todoItemContainer: {
    paddingVertical: 10,
    paddingLeft: 5,
    paddingHorizontal: 12,
    marginVertical: 5,
    backgroundColor: "#181818",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#181818",
    // shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  priorityLine: {
    width: 13, // Width of the priority line
    height: "100%",
    marginRight: 10,
    marginLeft: 1, // Space between line and checkbox
    borderBottomLeftRadius: 10,
    // borderTopLeftRadius: 15,
  },
  checkboxContainer: {
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
  },
  todoItemText: {
    // flex: 1,
    fontSize: 16,
    color: "#ffffff",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  buttonContainer: {
    flexDirection: "column",
    alignItems: "left",
    justifyContent: "left",
  },
  // editButton: {
  //   backgroundColor: "#00BFFF",
  //   paddingVertical: 3,
  //   paddingHorizontal: 10,
  //   borderRadius: 5,
  //   marginRight: 1,
  //   marginBottom: 5,
  // },
  // // editButtonText: {
  // //   color: "#fff",
  // //   fontSize: 13,
  // //   paddingHorizontal: 5,
  // //   paddingVertical: 3,
  // // },
  // deleteButton: {
  //   backgroundColor: "#FF6347",
  //   paddingVertical: 6,
  //   paddingHorizontal: 10,
  //   borderRadius: 5,
  // },
  // deleteButtonText: {
  //   color: "#fff",
  //   fontSize: 12,
  // },
  // New style for date and time
  dateText: {
    fontSize: 12,
    color: "#888",
    marginTop: 3,
  },
  categoryText: {
    fontSize: 12,
    color: "#888", // Lighter color for category
  },
});

export default function TodoItem({
  task,
  deleteTask,
  editTask,
  toggleCompleted,
  priority,
}) {
  const timeFormat = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const [showDescription, setShowDescription] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const toggleDescription = () => {
    Animated.timing(animation, {
      toValue: showDescription ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setShowDescription(!showDescription);
  };

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100],
  });

  return (
    <View style={styles.todoItemContainer} className=" z-[-1]">
      <View style={styles.todoItem}>
        <View
          // style={styles.priorityLine}
          className={`${
            task.priority === 0
              ? "bg-[#4CAF50]"
              : task.priority === 1
              ? "bg-[#FFC107]"
              : task.priority === 2
              ? "bg-[#F44336]"
              : "bg-[#f2f2f2]"
          }`}
        ></View>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={task.completed}
            onValueChange={() => toggleCompleted(task.id)}
            tintColors={{ true: "#4CAF50", false: "#ccc" }} // Green when checked
          />
        </View>
        {/* Content containing task name and date/time */}
        <View style={{ flex: 1 }}>
          {/* Task Text */}
          <Text
            style={[styles.todoItemText, task.completed && styles.completed]}
          >
            {task.text}
          </Text>
          {/* Decorative Date and Time (smaller and lighter) */}
          <Text style={styles.dateText}>
            {task.date.toDateString()} at {timeFormat(task.time)}
          </Text>
          <Text style={styles.categoryText}>{task.category}</Text>
        </View>
        <View className="flex flex-row gap-[20px] items-center justify-center align-baseline h-[100%] pt-[2px]">
          {/* Decorative Edit Button */}
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => editTask(task.id)}
          >
            <FontAwesome
              name="pencil-square-o"
              color="#b6b6b6"
              size={28}
              style={styles.editButtonText}
              className=" bg-[#0d0d43] text-blue-500 text-center py-[3px] rounded-[5px] mb-[10px] "
            ></FontAwesome>
          </TouchableOpacity>

          {/* Functional Delete Button */}
          <TouchableOpacity
            style={styles.deleteButton}
            // className=" bg-[#431c0d] py-[3px] px-[10px] rounded-[5px]"
            onPress={() => deleteTask(task.id)}
          >
            <FontAwesome
              name="trash"
              color="#b6b6b6"
              size={28}
              // style={styles.deleteButtonText}
              className=" bg-[#431c0d] text-orange-500 text-center "
            ></FontAwesome>
          </TouchableOpacity>
        </View>
      </View>
      <View className="relative">
        <Animated.View
          style={{ height: heightInterpolate, overflow: "hidden" }}
        >
          {showDescription && (
            <View>
              <Text className="text-gray-500 pl-[5px]">Note: </Text>
              <Text
                className={`border-l-[1px] px-[8px] ml-[5px] mb-[20px] ${
                  task.priority === 0
                    ? "border-[#4CAF50]"
                    : task.priority === 1
                    ? "border-[#FFC107]"
                    : task.priority === 2
                    ? "border-[#F44336]"
                    : "border-[#f2f2f2]"
                } text-gray-400`}
              >
                {task.description}
              </Text>
            </View>
          )}
        </Animated.View>

        <View className="absolute left-0 right-0 text-center -bottom-[10px]">
          <View className="flex items-center">
            <FontAwesome
              name={`caret-${!showDescription ? "up" : "down"}`}
              size={25}
              color="#9ca3af"
              onPress={toggleDescription}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
