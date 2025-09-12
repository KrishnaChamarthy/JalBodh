import React from "react";
import { Text, View } from "react-native";

interface MapCardProps {
  width: number;
  title: string;
  subTitle: string;
  icon: React.ReactNode;
}

const MapCard = ({ width, title, subTitle, icon }: MapCardProps) => {
  return (
    <View
      className={`flex-${width} bg-dark-100 m-1 px-4 py-2 rounded-lg shadow-md h-24 flex flex-row items-center justify-between`}
    >
      <View className="justify-center h-full w-[70%]">
        <Text className="text-2xl font-semibold text-primary">{title}</Text>
        <Text
          className="text-sm font-medium text-secondary flex-wrap break-words"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {subTitle}
        </Text>
      </View>
      <View className="items-center justify-center h-full">
        {icon}
      </View>
    </View>
  );
};

export default MapCard;
