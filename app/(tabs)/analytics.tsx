import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { icons } from '../../constants/icons';

const waterLevelTrends = {
  labels: ["2019", "2020", "2021", "2022", "2023", "2024"],
  datasets: [
    {
      data: [15.2, 14.8, 13.5, 12.1, 11.8, 12.3],
      color: (opacity = 1) => `rgba(255, 160, 1, ${opacity})`,
      strokeWidth: 3,
    },
    {
      data: [18.5, 17.9, 16.2, 15.8, 16.1, 16.8],
      color: (opacity = 1) => `rgba(99, 102, 241, ${opacity})`,
      strokeWidth: 3,
    },
  ],
  legend: ["Critical Zones", "Normal Zones"]
};

const rechargeData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      data: [5, 8, 12, 15, 45, 85, 120, 110, 75, 35, 15, 8],
      color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const availabilityDistribution = [
  {
    name: "Excellent",
    population: 25,
    color: "#22c55e",
    legendFontColor: "#CDCDE0",
    legendFontSize: 12,
  },
  {
    name: "Good",
    population: 35,
    color: "#3b82f6",
    legendFontColor: "#CDCDE0",
    legendFontSize: 12,
  },
  {
    name: "Moderate",
    population: 25,
    color: "#f59e0b",
    legendFontColor: "#CDCDE0",
    legendFontSize: 12,
  },
  {
    name: "Poor",
    population: 15,
    color: "#ef4444",
    legendFontColor: "#CDCDE0",
    legendFontSize: 12,
  },
];

const stateWiseData = {
  labels: ["MH", "UP", "RJ", "MP", "GJ", "TN"],
  datasets: [
    {
      data: [78, 65, 45, 72, 58, 83],
    },
  ],
};

const aiPredictionData = {
  labels: ["Current", "3M", "6M", "9M", "12M", "15M"],
  datasets: [
    {
      data: [12.3, 11.8, 10.5, 9.2, 8.8, 9.5],
      color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
      strokeWidth: 3,
    },
    {
      data: [12.3, 12.1, 11.9, 11.7, 11.5, 11.3],
      color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
      strokeWidth: 2,
      strokeDashArray: [5, 5],
    },
  ],
  legend: ["AI Prediction", "Conservative Estimate"]
};

const chartConfig = {
  backgroundGradientFrom: "#2B2B2B",
  backgroundGradientTo: "#2B2B2B",
  color: (opacity = 1) => `rgba(205, 205, 224, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(205, 205, 224, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.6,
  propsForDots: {
    r: "4",
  },
  propsForBackgroundLines: {
    stroke: "#39395a",
  },
  decimalPlaces: 1,
};

const screenWidth = Dimensions.get("window").width;

const Analytics = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('6M');
  const [selectedRegion, setSelectedRegion] = useState('National');

  const timeframes = ['1M', '3M', '6M', '1Y', '5Y'];
  const regions = ['National', 'State', 'District'];

  return (
    <SafeAreaView className="flex-1 bg-dark-150">
      <View className="px-4 py-3 border-b border-dark-100">
        <Text className="text-primary text-2xl font-bold mb-2">Analytics Dashboard</Text>
        <Text className="text-secondary text-sm">Comprehensive groundwater insights and decision support</Text>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-2">
          <View className="flex-row justify-between items-center mb-2">
            <View className='flex-1 mr-1'>
              <Text className="text-secondary text-sm mb-2">Timeframe</Text>
              <View className="flex-row bg-dark-100 rounded-lg p-1">
                {timeframes.map((time) => (
                  <TouchableOpacity
                    key={time}
                    onPress={() => setSelectedTimeframe(time)}
                    className={`px-2 flex-1 py-2 rounded-md ${selectedTimeframe === time ? 'bg-primary' : ''}`}
                    activeOpacity={1}
                  >
                    <Text className={`text-sm text-center ${selectedTimeframe === time ? 'text-dark-150 font-semibold' : 'text-secondary'}`}>
                      {time}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View className='flex-1 ml-1'>
              <Text className="text-secondary text-sm mb-2">Scope</Text>
              <View className="flex-row bg-dark-100 rounded-lg p-1">
                {regions.map((region) => (
                  <TouchableOpacity
                    key={region}
                    onPress={() => setSelectedRegion(region)}
                    className={`px-2 py-2 flex-1 rounded-md ${selectedRegion === region ? 'bg-primary' : ''}`}
                    activeOpacity={1}
                  >
                    <Text className={`text-sm text-center ${selectedRegion === region ? 'text-dark-150 font-semibold' : 'text-secondary'}`}>
                      {region}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>

        <View className="px-4 mb-2">
          <View className="flex-row justify-between">
            <View className="flex-1 bg-dark-100 rounded-xl p-4 mr-1">
              <View className="flex-row items-center mb-2">
                {icons.level("#FFA001", 24)}
                <Text className="text-secondary text-sm ml-2">Avg Water Level</Text>
              </View>
              <Text className="text-2xl font-bold text-primary">14.2m</Text>
              <Text className="text-green-500 text-xs">↑ 0.8m from last month</Text>
            </View>

            <View className="flex-1 bg-dark-100 rounded-xl p-4 ml-1">
              <View className="flex-row items-center mb-2">
                {icons.water("#3b82f6", 24)}
                <Text className="text-secondary text-sm ml-2">Availability Index</Text>
              </View>
              <Text className="text-2xl font-bold text-blue-400">72</Text>
              <Text className="text-red-400 text-xs">↓ 3 from last month</Text>
            </View>
          </View>
        </View>
        <View className="bg-dark-100 mx-4 mb-2 rounded-xl p-4">
          <Text className="text-xl font-semibold text-primary mb-2">Water Level Trends</Text>
          <Text className="text-secondary text-sm mb-4">Multi-year comparison across zones</Text>
          
          <LineChart
            data={waterLevelTrends}
            width={screenWidth - 64}
            height={220}
            chartConfig={chartConfig}
            bezier
            style={{
              borderRadius: 12,
              alignSelf: 'center',
            }}
            fromZero={false}
          />

          <View className="flex-row justify-around mt-4 pt-4 border-t border-dark-150">
            <View className="items-center">
              <Text className="text-secondary text-xs">Critical Zones</Text>
              <Text className="text-red-400 text-lg font-semibold">23%</Text>
            </View>
            <View className="items-center">
              <Text className="text-secondary text-xs">Improving Areas</Text>
              <Text className="text-green-500 text-lg font-semibold">67%</Text>
            </View>
            <View className="items-center">
              <Text className="text-secondary text-xs">Stable Regions</Text>
              <Text className="text-blue-400 text-lg font-semibold">45%</Text>
            </View>
          </View>
        </View>
        <View className="bg-dark-100 mx-4 mb-2 rounded-xl p-4">
          <Text className="text-xl font-semibold text-primary mb-2">Seasonal Recharge Patterns</Text>
          <Text className="text-secondary text-sm mb-4">Monthly recharge rates (mm/month)</Text>
          
          <LineChart
            data={rechargeData}
            width={screenWidth - 64}
            height={200}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(34, 197, 94, ${opacity})`,
            }}
            style={{
              borderRadius: 12,
              alignSelf: 'center',
            }}
          />

          <View className="mt-4 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <Text className="text-green-400 text-sm font-medium mb-1">Peak Recharge Period</Text>
            <Text className="text-secondary text-xs">
              July-September shows maximum recharge potential. Recommend intensified rainwater harvesting.
            </Text>
          </View>
        </View>

        <View className="bg-dark-100 mx-4 mb-2 rounded-xl p-4">
          <View className="flex-row items-center justify-between mb-2">
            <View>
              <Text className="text-xl font-semibold text-primary">AI Predicted Water Levels</Text>
              <Text className="text-secondary text-sm mt-1">Machine learning forecast for next 15 months</Text>
            </View>
            <View className="bg-purple-500/20 px-3 py-1 rounded-full">
              <Text className="text-purple-400 text-xs font-medium">AI Model</Text>
            </View>
          </View>
          
          <LineChart
            data={aiPredictionData}
            width={screenWidth - 64}
            height={220}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(139, 92, 246, ${opacity})`,
            }}
            bezier
            style={{
              borderRadius: 12,
              alignSelf: 'center',
            }}
            fromZero={false}
          />

          <View className="mt-4 space-y-2">
            <View className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <View className="flex-row items-center mb-1">
                <View className="w-2 h-2 bg-purple-400 rounded-full mr-2" />
                <Text className="text-purple-400 text-sm font-medium">AI Prediction Confidence: 87%</Text>
              </View>
              <Text className="text-secondary text-xs">
                Model indicates declining trend with potential recovery in month 15
              </Text>
            </View>
            
            
          </View>

          <View className="flex-row justify-around mt-4 pt-4 border-t border-dark-150">
            <View className="items-center">
              <Text className="text-secondary text-xs">Predicted Drop</Text>
              <Text className="text-red-400 text-lg font-semibold">-2.8m</Text>
            </View>
            <View className="items-center">
              <Text className="text-secondary text-xs">Recovery Point</Text>
              <Text className="text-green-500 text-lg font-semibold">Month 15</Text>
            </View>
            <View className="items-center">
              <Text className="text-secondary text-xs">Accuracy Rate</Text>
              <Text className="text-purple-400 text-lg font-semibold">87%</Text>
            </View>
          </View>
        </View>

        <View className="bg-dark-100 mx-4 mb-20 rounded-xl p-4">
          <Text className="text-xl font-semibold text-primary mb-2">State-wise Performance Index</Text>
          <Text className="text-secondary text-sm mb-4">Groundwater management effectiveness scores</Text>
          
          <BarChart
            data={stateWiseData}
            width={screenWidth - 64}
            height={200}
            chartConfig={{
              ...chartConfig,
              color: (opacity = 1) => `rgba(255, 160, 1, ${opacity})`,
            }}
            style={{
              borderRadius: 12,
              alignSelf: 'center',
            }}
            yAxisLabel=""
            yAxisSuffix=""
            showValuesOnTopOfBars
            fromZero
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Analytics;