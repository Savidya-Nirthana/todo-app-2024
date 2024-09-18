import react, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const DateTime = ({ setSearchText }) => {
  const [currentDateTime, setCurrentDateTime] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };
  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const dateInfo = [
        date.toLocaleDateString(undefined, { weekday: "long" }),
        date.toLocaleDateString(undefined, { day: "numeric" }),
        date.toLocaleDateString(undefined, { month: "long" }),
        date.toLocaleDateString(undefined, { year: "numeric" }),
        date.toLocaleTimeString(),
      ];
      setCurrentDateTime(dateInfo);
    };
    const interval = setInterval(updateDateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const currentHour = (date) => {
    let currentHour = date;
    if (currentHour < 12) {
      return "Good Morning";
    } else if (currentHour < 18) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  return (
    <View className={` bg-[#151515] h-full z-[-1] pt-[35px] `}>
      {!showSearch && (
        <View className="flex flex-row pl-[20px] justify-between ">
          <View className="">
            <Text className={`text-white text-[25px]`}>
              {currentHour(new Date().getHours())}
            </Text>
            <Text
              className={`text-white`}
            >{`${currentDateTime[0]}, ${currentDateTime[1]}`}</Text>
          </View>
          <View className="mr-[20px] mt-[10px]">
            <FontAwesome
              name="search"
              color="#9ca3af"
              size={30}
              onPress={() => {
                toggleSearch();
              }}
            />
          </View>
        </View>
      )}

      {showSearch && (
        <View className="relative top-0 w-full ">
          <View className="absolute z-10 left-[5%] ml-[8px] mt-[15px]">
            <FontAwesome
              name="arrow-left"
              color="#9ca3af"
              size={25}
              onPress={() => {
                toggleSearch();
              }}
            />
          </View>

          <TextInput
            placeholder="Search..."
            className="h-[55px] bg-[#232323]  w-[90%] m-auto rounded-[20px] pl-[45px]  text-[16px] placeholder:text-[#9ca3af]"
            placeholderTextColor="#9CA3AF"
            onChangeText={(text) => {
              setSearchText(text);
            }}
          />
        </View>
      )}
    </View>
  );
};
export default DateTime;
