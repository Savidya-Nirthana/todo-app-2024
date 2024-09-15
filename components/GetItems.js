import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
} from "react-native";
import Checkbox from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState, useEffect, useRef } from "react";
import { styled } from "nativewind";

const StyledTextInput = styled(TextInput);

const GetItems = ({ value, setValue, tasks, setTasks }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [urgent, setUrgent] = useState(false);

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
    });
  };

  useEffect(() => {
    if (value) {
      swipeUpAndFadeIn();
    }
  }, [value]);

  const addTask = () => {
    const newTask = {
      id: Date.now(),
      text: title,
      description: description,
      date: date,
      time: time,
      priority: urgent,
      completed: false,
    };

    console.log(newTask);

    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
    setValue(false);
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
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
  };

  const toggleComplete = () => {
    if (urgent) {
      setUrgent(false);
    } else {
      setUrgent(true);
    }
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
      className=" bg-[#230f5b] z-10 rounded-t-3xl px-[20px] absolute bottom-0 w-[100%]"
    >
      <View className="absolute right-5 -top-5">
        <TouchableOpacity
          className=" bg-[#230f5b]  w-[50px] h-[50px] rounded-full text-center flex items-center justify-center border-[2px] border-[#f2f2f2]"
          onPress={swipeDownAndFadeOut}
        >
          <Text className="text-white text-[20px]">X</Text>
        </TouchableOpacity>
      </View>
      <View className=" w-[70px] h-[2px] bg-[#bbbbbb] m-auto mt-2 -mb-2"></View>
      <Text className=" text-[#cdcdcd] text-center my-[10px] text-[20px] font-bold">
        New Task To Do
      </Text>
      <View>
        <StyledTextInput
          placeholder="Title Task"
          className="bg-[#2b2766] p-1 rounded-md mb-[20px] placeholder:text-white"
          placeholderTextColor="#9CA3AF"
          style={{ textAlignVertical: "top" }}
          onChangeText={(data) => {
            setTitle(data);
          }}
        />
      </View>
      <View>
        <StyledTextInput
          multiline={true}
          placeholder="Add description"
          numberOfLines={5}
          className="bg-[#2b2766]  rounded-md mb-[20px] p-2"
          placeholderTextColor="#9CA3AF"
          style={{ textAlignVertical: "top" }}
          onChangeText={(data) => {
            setDescription(data);
          }}
        />
      </View>
      <View className="flex flex-row gap-5 ">
        <View>
          <TouchableOpacity
            className=" bg-[#522c9d] rounded-lg"
            onPress={() => {
              setShowDate(true);
            }}
          >
            <Text className="text-center py-[10px] px-[20px] text-[#ffffff]">
              {dateFromat(date)}
            </Text>
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              value={date}
              display="default"
              onChange={onChange}
              mode="date"
            />
          )}
          <Text className=" text-center text-white text-[10px] my-[5px]">
            PICK DATE
          </Text>
        </View>

        <View>
          <TouchableOpacity
            className=" bg-[#1c1c1c] rounded-lg"
            onPress={() => {
              setShowTime(true);
            }}
          >
            <Text className="text-center py-[10px] px-[20px] text-[#ffffff]">
              {timeFormat(time)}
            </Text>
          </TouchableOpacity>
          {showTime && (
            <DateTimePicker value={time} mode="time" onChange={onChangeTime} />
          )}
          <Text className=" text-center text-white text-[10px] my-[5px]">
            PICK TIME
          </Text>
        </View>
      </View>

      <View className=" flex flex-row gap-[15px] mb-[15px]">
        <Text className=" text-[#d1d0d2] ">Is it urgent:</Text>
        <Checkbox
          value={urgent}
          onValueChange={toggleComplete}
          tintColors={{ true: "#7f25c8", false: "#7f25c8" }}
        />
      </View>
      <View>
        <TouchableOpacity
          className=" bg-[#f2f2f2] mb-[20px] rounded-lg"
          onPress={addTask}
        >
          <Text className="text-center py-[10px] px-[20px]">ADD</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default GetItems;
