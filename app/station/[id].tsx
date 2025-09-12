import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { BarChart, LineChart } from "react-native-chart-kit";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons } from "../../constants/icons";
import stationsDataRaw from "../../constants/stationsInfo.json";

// Dummy data for charts
const waterLevelTrends = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      data: [12.5, 11.8, 10.2, 9.8, 11.5, 12.1],
      color: (opacity = 1) => `rgba(255, 160, 1, ${opacity})`,
      strokeWidth: 3,
    },
  ],
};

const rechargePatterns = {
  labels: ["Monsoon", "Post-Monsoon", "Winter", "Pre-Monsoon"],
  datasets: [
    {
      data: [85, 45, 25, 15],
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#2B2B2B",
  backgroundGradientTo: "#2B2B2B",
  color: (opacity = 1) => `rgba(205, 205, 224, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(205, 205, 224, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.7,
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: "#FFA001",
  },
  propsForBackgroundLines: {
    stroke: "#39395a",
  },
  decimalPlaces: 1,
};

const screenWidth = Dimensions.get("window").width;

const StationDetail = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const stations = (stationsDataRaw as { Table: any[] }).Table || [];
  const station = stations.find((s) => s.Station_Name === id);

  return (
    <SafeAreaView className="flex-1 bg-dark-150">
      <View className="flex-row items-center px-4 py-3 border-b border-dark-100">
        <TouchableOpacity
          onPress={() => router.back()}
          className="mr-3 p-2 rounded-full"
          activeOpacity={0.7}
        >
          {icons.chevronLeft("#FFA001", 24)}
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">
          Station Details
        </Text>
      </View>

      <ScrollView className="flex-1 px-4">
        {station ? (
          <View className="py-4">
            <View className="bg-dark-100 rounded-xl p-6 mb-4 shadow-md">
              <Text className="text-3xl font-bold text-primary mb-2 text-center">
                {station.Station_Name}
              </Text>
              <Text className="text-secondary text-center text-base">
                {station.State_Name}, {station.District_Name}
              </Text>
            </View>

            <View className="bg-dark-100 rounded-xl p-4 mb-4 shadow-md">
              <Text className="text-xl font-semibold text-primary mb-4">
                Basic Information
              </Text>

              <View className="space-y-3">
                <View className="flex-row justify-between items-center py-2 border-b border-dark-150">
                  <Text className="text-secondary font-medium">Agency</Text>
                  <Text className="text-white text-right flex-1 ml-4">
                    {station.Agency_Name}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center py-2 border-b border-dark-150">
                  <Text className="text-secondary font-medium">Type</Text>
                  <Text className="text-white text-right flex-1 ml-4">
                    {station.Station_Type}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center py-2">
                  <Text className="text-secondary font-medium">Status</Text>
                  <View className="flex-row items-center">
                    <View
                      className={`w-2 h-2 rounded-full mr-2 ${
                        station.Station_Status === "Active"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <Text className="text-white">{station.Station_Status}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="bg-dark-100 rounded-xl p-4 mb-4 shadow-md">
              <Text className="text-xl font-semibold text-primary mb-4">
                Current Monitoring
              </Text>

              <View className="flex-row justify-between mb-4">
                <View className="flex-1 bg-dark-150 rounded-lg p-3 mr-2">
                  <Text className="text-secondary text-sm mb-1">
                    Water Level
                  </Text>
                  <Text className="text-primary text-xl font-bold">12.1 m</Text>
                  <Text className="text-secondary text-xs">below ground</Text>
                </View>

                <View className="flex-1 bg-dark-150 rounded-lg p-3 ml-2">
                  <Text className="text-secondary text-sm mb-1">Status</Text>
                  <Text className="text-green-500 text-xl font-bold">
                    Normal
                  </Text>
                  <Text className="text-secondary text-xs">within range</Text>
                </View>
              </View>
            </View>

            <View className="bg-dark-100 rounded-xl p-4 mb-4 shadow-md">
              <Text className="text-xl font-semibold text-primary mb-4">
                Water Level Trends
              </Text>
              <Text className="text-secondary text-sm mb-4">
                6-month historical data (meters below ground level)
              </Text>

              <LineChart
                data={waterLevelTrends}
                width={screenWidth - 64}
                height={200}
                chartConfig={chartConfig}
                bezier
                style={{
                  borderRadius: 12,
                  alignSelf: "center",
                }}
                fromZero={false}
              />

              <View className="flex-row justify-between mt-3 px-2">
                <View className="items-center">
                  <Text className="text-secondary text-xs">Trend</Text>
                  <Text className="text-green-500 text-sm font-semibold">
                    ↗ Improving
                  </Text>
                </View>
                <View className="items-center">
                  <Text className="text-secondary text-xs">Change</Text>
                  <Text className="text-primary text-sm font-semibold">
                    +0.4m
                  </Text>
                </View>
              </View>
            </View>
            <View className="bg-dark-100 rounded-xl p-4 mb-4 shadow-md">
              <Text className="text-xl font-semibold text-primary mb-4">
                Seasonal Recharge Patterns
              </Text>
              <Text className="text-secondary text-sm mb-4">
                Groundwater recharge by season (mm/month)
              </Text>

              <BarChart
                data={rechargePatterns}
                width={screenWidth - 64}
                height={200}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(255, 160, 1, ${opacity})`,
                }}
                style={{
                  borderRadius: 12,
                  alignSelf: "center",
                }}
                yAxisLabel=""
                yAxisSuffix="mm"
                showValuesOnTopOfBars
                fromZero
              />
            </View>

            <View className="bg-dark-100 rounded-xl p-4 mb-4 shadow-md">
              <Text className="text-xl font-semibold text-primary mb-4">
                AI Groundwater Estimation
              </Text>
              <Text className="text-secondary text-sm mb-4">
                Real-time availability prediction using machine learning
              </Text>

              <View className="bg-dark-150 rounded-lg p-4 mb-4">
                <View className="flex-row items-center justify-between mb-3">
                  <Text className="text-secondary">Availability Score</Text>
                  <Text className="text-2xl font-bold text-green-500">
                    78/100
                  </Text>
                </View>

                <View className="bg-dark-100 rounded-full h-2 mb-3">
                  <View
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "78%" }}
                  />
                </View>

                <Text className="text-secondary text-xs text-center">
                  Good availability - suitable for moderate extraction
                </Text>
              </View>

              <View className="flex-row justify-between">
                <View className="flex-1 bg-dark-150 rounded-lg p-3 mr-2">
                  <Text className="text-secondary text-xs mb-1">
                    Predicted Depletion
                  </Text>
                  <Text className="text-white text-lg font-semibold">
                    2.3 years
                  </Text>
                  <Text className="text-secondary text-xs">
                    at current rate
                  </Text>
                </View>

                <View className="flex-1 bg-dark-150 rounded-lg p-3 ml-2">
                  <Text className="text-secondary text-xs mb-1">
                    Confidence Level
                  </Text>
                  <Text className="text-primary text-lg font-semibold">
                    94.2%
                  </Text>
                  <Text className="text-secondary text-xs">model accuracy</Text>
                </View>
              </View>
            </View>
            <View className="bg-dark-100 rounded-xl p-4 mb-4 shadow-md">
              <Text className="text-xl font-semibold text-primary mb-4">
                Location
              </Text>

              <View className="space-y-3">
                <View className="flex-row justify-between items-center py-2 border-b border-dark-150">
                  <Text className="text-secondary font-medium">Latitude</Text>
                  <Text className="text-white text-right flex-1 ml-4">
                    {station.Latitude}°
                  </Text>
                </View>

                <View className="flex-row justify-between items-center py-2">
                  <Text className="text-secondary font-medium">Longitude</Text>
                  <Text className="text-white text-right flex-1 ml-4">
                    {station.Longitude}°
                  </Text>
                </View>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-secondary text-lg">Station not found</Text>
            <Text className="text-secondary text-sm mt-2 text-center px-4">
              The station you're looking for doesn't exist or has been removed.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StationDetail;
