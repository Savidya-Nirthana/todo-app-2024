import react, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     textAlign: "center",
//     height: 3,
//     backgroundColor: "green",
//     flex: 1,
//   },
// });

const DateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState([]);
  useEffect(() => {
    const updateDateTime = () => {
      const date = new Date();
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      };
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
    <View className=" bg-[#2a2b2a] h-[100%] z-[-1] pt-[35px] pl-[20px]">
      <View className="">
        <Text className="text-white text-[25px]">
          {currentHour(new Date().getHours())}
        </Text>
        <Text className="text-white">{`${currentDateTime[0]}, ${currentDateTime[1]}`}</Text>
      </View>
    </View>
  );
};
export default DateTime;
