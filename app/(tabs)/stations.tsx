import SearchBar from "@/components/SearchBar";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants/icons";
import stationsDataRaw from "../../constants/stationsInfo.json";
import { getStationsByState, Station } from "../../utils/stationUtils";

type StationStatus = "Safe" | "Semi-Critical" | "Over-Exploited";

const stationsData: Station[] = getStationsByState(
  (stationsDataRaw as { Table: Station[] }).Table || [],
  10
);

const statusColors: Record<StationStatus, string> = {
  Safe: "bg-green-500",
  "Semi-Critical": "bg-yellow-400",
  "Over-Exploited": "bg-red-500",
};

const trendIcons = {
  up: <Text className="text-green-400 text-lg">↗</Text>,
  down: <Text className="text-red-400 text-lg">↘</Text>,
};

const Stations = () => {
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const router = useRouter();
  return (
    <SafeAreaView className="bg-dark-150 h-full">
      <View className="px-4 py-3 border-b border-dark-100">
        <Text className="text-primary text-2xl font-bold mb-2">
          DWLR Stations
        </Text>
        <Text className="text-secondary text-sm">
          Explore and monitor groundwater levels across various stations.
        </Text>
      </View>
      <View className="px-4 w-full pt-2">
        <SearchBar placeholder="Search by Station ID, Name, State, District, Basin..." />
        <View className="flex-row justify-between mt-2 mb-1 space-x-2">
          <TouchableOpacity
            className="flex-row items-center bg-dark-100 px-3 py-1.5 rounded-lg mr-2"
            onPress={() => setFilterOpen((v) => !v)}
            activeOpacity={0.8}
          >
            {icons.filter("#A8B5DB", 18)}
            <Text className="ml-2 text-white">Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row items-center bg-dark-100 px-3 py-1.5 rounded-lg"
            onPress={() => setSortOpen((v) => !v)}
            activeOpacity={0.8}
          >
            {icons.sort("#A8B5DB", 18)}
            <Text className="ml-2 text-white">Sort</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1 w-full mt-2 px-4">
        {stationsData.map((station, idx) => (
          <TouchableOpacity
            key={station.Station_Name + station.District_Name + idx}
            className="bg-dark-100 rounded-xl mb-2 px-4 py-3 flex-row items-center shadow-md"
            activeOpacity={0.85}
            onPress={() =>
              router.push({
                pathname: "/station/[id]",
                params: { id: station.Station_Name },
              })
            }
          >
            <View className="flex-1">
              <View className="flex flex-row items-center justify-between">
                <Text className="text-lg font-semibold text-primary">
                  {station.Station_Name}
                </Text>
                <Text className="text-xs text-secondary">
                  {station.Agency_Name}
                </Text>
              </View>
              <View className="flex flex-row items-center justify-between mt-1">
                <Text className="text-xs text-secondary">
                  {station.State_Name}, {station.District_Name}
                </Text>
              </View>
              <View className="flex-row items-center mt-1">
                <Text className="text-base text-white font-medium">
                  Water Level:
                </Text>
                <Text className="text-base text-primary font-bold">
                  18.5 m bgl
                </Text>
              </View>
              <View className="flex flex-row items-center justify-between">
                <View className="flex-row items-center mt-1">
                  <View
                    className={`w-3 h-3 rounded-full ${statusColors["Safe"]} mr-2`}
                  />
                  <Text className="text-xs text-white">Safe</Text>
                  <View className="ml-4">{trendIcons["up"]}</View>
                  <Text className="ml-2 text-xs text-secondary">Recharge</Text>
                </View>
                <Text className="text-xs text-secondary mt-1">
                  Last updated: 2025-09-12 10:30
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Stations;
