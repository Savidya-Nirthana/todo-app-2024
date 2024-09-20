import { View, Text, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
const SearchBar = ({ showSearch, setShowSearch, toggleSearch, setSearchText }) => {
  return (
    <View className="">
      {showSearch && (
        <View className="relative top-0 w-full ">
          <View className="absolute z-10 left-[5%] ml-[8px] pt-[15px]">
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

export default SearchBar;
