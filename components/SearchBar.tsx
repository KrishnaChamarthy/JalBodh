import { TextInput, View } from "react-native";

import { icons } from "@/constants/icons";

interface Props {
  placeholder: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onPress?: () => void;
  rightIcon?: React.ReactNode;
}

const SearchBar = ({ placeholder, value, onChangeText, onPress, rightIcon }: Props) => {
  return (
    <View className="flex-row items-center bg-dark-200 rounded-full px-5 py-4">
        {icons.search("#FFA001", 20)}
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        className="flex-1 ml-2 text-white"
        placeholderTextColor="#A8B5DB"
      />
      {rightIcon}
    </View>
  );
};

export default SearchBar;