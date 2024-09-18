import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useEffect, useRef } from "react";
import { styled } from "nativewind";

const StyledTextInput = styled(TextInput);

const GetItems = ({
  value,
  setValue,
  tasks,
  setTasks,
  eTask,
  setETask,
  deleteTask,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    eTask ? eTask.category : null
  );
  const [selectPriority, setSelectPriority] = useState(
    eTask ? eTask.priority : 0
  );

  const categoryList = [
    "Work",
    "Entertainment",
    "Family",
    "Education",
    "Personal",
    "Friends",
  ];

  const translateYAnim = useRef(new Animated.Value(300)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  const swipeUpAndFadeIn = () => {
    Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const swipeDownAndFadeOut = () => {
    Animated.parallel([
      Animated.timing(translateYAnim, {
        toValue: 300,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setValue(false);
      setETask(null);
    });
  };

  useEffect(() => {
    if (value) {
      swipeUpAndFadeIn();
    }
  }, [value]);

  const addTask = () => {
    if (eTask) {
      const updateTasks = tasks.map((task) =>
        task.id === eTask.id
          ? {
              ...task,
              text: title,
              description: description,
              date: date,
              time: time,
              priority: selectPriority,
              category: selectedCategory,
          }
          : task
      );
      setTasks(updateTasks);
      setETask(null);
    } else {
      const newTask = {
        id: Date.now(),
        text: title,
        description: description,
        date: date,
        time: time,
        priority: selectPriority,
        category: selectedCategory,
        completed: false,
      };
      setTasks([...tasks, newTask]);
    }
    resetForm();
    swipeDownAndFadeOut(); // Close the form
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setDate(new Date());
    setTime(new Date());
    setSelectedCategory(null);
    setSelectPriority(0);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  };

  const dateFromat = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const timeFormat = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12 in 12-hour format
    return `${hours}:${minutes} ${ampm}`;
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTime(false);
    setTime(currentTime);
  };

  return (
    <Animated.View
      style={{
        transform: [{ translateY: translateYAnim }],
        opacity: opacityAnim,
      }}
      className=" bg-[#230f5b]  rounded-t-3xl px-[20px] absolute top-20 bottom-0 w-[100%]"
    >
      <View className="absolute z-10 right-5 -top-5">
        <TouchableOpacity
          className=" bg-[#230f5b]  w-[40px] h-[40px] rounded-full text-center flex items-center justify-center border-[2px] border-[#f2f2f2]"
          onPress={swipeDownAndFadeOut}
        >
          <Text className="text-white text-[15px]">X</Text>
        </TouchableOpacity>
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <View className="w-[70px] h-[2px] bg-[#bbbbb] m-auto mt-2 -mb-2"></View>
            <Text className="text-[#ffffff] text-center my-[10px] text-[20px] font-bold">
              New Task To Do
            </Text>
            <View>
              <StyledTextInput
                placeholder="Title Task"
                className="bg-[#2b2766] p-0.1 rounded-md mb-[18px] placeholder:text-white"
                placeholderTextColor="#9CA3AF"
                style={{ textAlignVertical: "top" }}
                value={title}
                onChangeText={(data) => setTitle(data)}
              />
            </View>
            
            <View>
              
              <StyledTextInput
                multiline={true}
                placeholder="Enter task details or any specific notes"
                numberOfLines={5}
                className="bg-[#2b2766]  p-0.1 rounded-md mb-[2px] p-2 placeholder:text-white"
                placeholderTextColor="#9CA3AF"
                value={eTask ? eTask.description : null}
                style={{ textAlignVertical: "top" }}
                onChangeText={(data) => setDescription(data)}
              />
            </View>
            <View className="border-b-[0.5px] border-[#ffffff] mb-[20px]">
              <Text className="text-white text-[20px] top-1 font-bold">Category</Text>
              <View className="flex flex-row flex-wrap">
                {categoryList.map((cat, index) => (
                  <TouchableOpacity
                    key={index}
                    className={`m-[7px] p-[9px] pt-[6px] rounded-lg ${
                      selectedCategory === cat ? "bg-blue-500" : "bg-slate-500"
                    }`}
                    activeOpacity={0.7}
                    onPress={() => setSelectedCategory(cat)}
                  >
                    <Text className="text-white">{cat}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className="flex flex-row ml-[10px] gap-10 mb-[20px]">
              <View>
                <TouchableOpacity
                  className="bg-[#522c9d] rounded-lg"
                  onPress={() => setShowDate(true)}
                >
                  <Text className="text-center py-[10px] px-[20px] text-[#ffffff]">
                    {dateFromat(date)}
                  </Text>
                </TouchableOpacity>
                {showDate && (
                  <DateTimePicker
                    display="default"
                    onChange={onChange}
                    mode="date"
                    value={date}
                  />
                )}
                <Text className=" text-center text-white text-[10px] my-[6px]">
                  PICK DATE
                </Text>
              </View>
              <View>
                <TouchableOpacity
                  className="bg-[#522c9d] rounded-lg"
                  onPress={() => setShowTime(true)}
                >
                  <Text className="text-center py-[10px] px-[25px] text-[#ffffff]">
                    {timeFormat(time)}
                  </Text>
                </TouchableOpacity>
                {showTime && (
                  <DateTimePicker
                    mode="time"
                    onChange={onChangeTime}
                    value={time}
                  />
                )}
                <Text className="text-center text-white text-[11px] my-[5px]">
                  PICK TIME
                </Text>
              </View>
            </View>
            <View className="border-t-[0.5px] border-[#ffffff] py-[20px]">
              <Text className="text-white text-[20px] font-bold">Priority</Text>
              <View className="flex flex-row justify-around">
                <TouchableOpacity
                  className={`m-[10px] p-[10px] rounded-lg ${
                    selectPriority === 0 ? "bg-[#4CAF50]" : "bg-[#7d7dbe]"
                  }`}
                  onPress={() => setSelectPriority(0)}
                >
                  <Text className="text-white">Low</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`m-[10px] p-[10px] rounded-lg ${
                    selectPriority === 1 ? "bg-[#FFC107]" : "bg-[#7d7dbe]"
                  }`}
                  onPress={() => setSelectPriority(1)}
                >
                  <Text className="text-white">Medium</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`m-[10px] p-[10px] rounded-lg ${
                    selectPriority === 2 ? "bg-[#F44336]" : "bg-[#7d7dbe]"
                  }`}
                  onPress={() => setSelectPriority(2)}
                >
                  <Text className="text-white">High</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View className="flex flex-row justify-around mb-[10px]">
              <TouchableOpacity
                className="bg-[#343333] w-[50px] h-[50px] flex align-baseline justify-center items-center rounded-full"
                onPress={resetForm}
              >
                <Text className="text-[15px] text-white">Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-[#343333] w-[50px] h-[50px] flex align-baseline justify-center items-center rounded-full"
                onPress={addTask}
              >
                <Text className="text-[35px] text-white ">+</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

export default GetItems;
