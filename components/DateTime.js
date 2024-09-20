import react, { useEffect, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import SearchBar from "./SearchBar";

const DateTime = ({ setSearchText, showSearch, setShowSearch, showAll, setShowAll}) => {
  const [currentDateTime, setCurrentDateTime] = useState([]);
  
  

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowAll(!showAll)
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
    <View className={` bg-[#151515] h-[15%]  pt-[35px] `}>
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
          <View className="mr-[20px] pt-[10px]">
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
      <SearchBar
        showSearch={showSearch}
        setShowSearch={setShowSearch}
        toggleSearch={toggleSearch}
        setSearchText={setSearchText}
      />
    </View>
  );
};
export default DateTime;
