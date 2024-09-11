import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import Checkbox, { CheckBox } from "expo-checkbox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";
import { styled } from "nativewind";

const StyledTextInput = styled(TextInput);

const GetItems = ({ value, setValue }) => {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDate, setShowDate] = useState(false);
  const [showTime, setShowTime] = useState(false);
  const [urgent, setUrgent] = useState(false);
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
    <View className=" bg-[#230f5b] z-10 rounded-3xl px-[20px]  relative w-[100%]  bottom-0">
      <View className=" absolute -right-5 -top-5">
        <TouchableOpacity
          className=" bg-[#2a2b2a]  w-[50px] h-[50px] rounded-full text-center flex items-center justify-center"
          onPress={() => {
            setValue(false);
          }}
        >
          <Text className="text-white text-[20px]  ">X</Text>
        </TouchableOpacity>
      </View>
      <View className=" w-[70px] h-[2px] bg-[#bbbbbb] m-auto mt-2 -mb-2"></View>
      <Text className=" text-[#cdcdcd] text-center my-[10px] text-[20px] font-bold">
        New Task To Do
      </Text>
      <View>
        {/* <Text className=" text-white">Title Task</Text> */}
        <StyledTextInput
          placeholder="Title Task"
          className="bg-[#2b2766] p-1 rounded-md mb-[20px] placeholder:text-white"
          placeholderTextColor="#9CA3AF"
          style={{ textAlignVertical: "top" }}
        />
      </View>
      <View>
        {/* <Text className=" text-white">Description</Text> */}
        <StyledTextInput
          multiline={true}
          placeholder="Add description"
          numberOfLines={5}
          className="bg-[#2b2766]  rounded-md mb-[20px] p-2"
          placeholderTextColor="#9CA3AF"
          style={{ textAlignVertical: "top" }}
        />
      </View>
      <View className=" flex flex-row gap-5">
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
        <TouchableOpacity className=" bg-white mb-[20px] rounded-lg">
          <Text className="text-center py-[10px] px-[20px]">ADD</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetItems;
