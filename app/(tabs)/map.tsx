import MapCard from "@/components/MapCard";
import SearchBar from "@/components/SearchBar";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView
} from "@gorhom/bottom-sheet";
import * as Location from "expo-location";
import React, { useMemo, useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import MapView, { Marker } from "react-native-maps";
import { useSelector } from "react-redux";
import { icons } from "../../constants/icons";
import stationsDataRaw from "../../constants/stationsInfo.json";
import { getStationsByState, Station } from "../../utils/stationUtils";

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
  { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
  { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
  { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#181818' }] },
  { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
  { featureType: 'poi.park', elementType: 'labels.text.stroke', stylers: [{ color: '#1b1b1b' }] },
  { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#2c2c2c' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#8a8a8a' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#373737' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#3c3c3c' }] },
  { featureType: 'road.highway.controlled_access', elementType: 'geometry', stylers: [{ color: '#4e4e4e' }] },
  { featureType: 'road.local', elementType: 'labels.text.fill', stylers: [{ color: '#616161' }] },
  { featureType: 'transit', elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3d3d3d' }] }
];

const chartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      data: [18.5, 18.2, 18.7, 18.3, 18.1, 18.4, 18.6],
      color: (opacity = 1) => `rgba(255, 160, 1, ${opacity})`, 
      strokeWidth: 2,
    },
  ],
};

const chartConfig = {
  backgroundGradientFrom: "#2B2B2B",
  backgroundGradientTo: "#2B2B2B",
  color: (opacity = 1) => `rgba(205, 205, 224, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(205, 205, 224, ${opacity})`,
  propsForDots: {
    r: "4",
    strokeWidth: "2",
    stroke: "#FFA001",
  },
  propsForBackgroundLines: {
    stroke: "#39395a",
  },
  decimalPlaces: 1,
  paddingTop: 16,
  paddingBottom: 16,
};


const Map = () => {
  const mapRef = useRef<MapView>(null);
  const snapPoints = useMemo(() => ["25%", "75%"], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const region = useSelector((state: any) => state.mapData.region);
  const [sheetIndex, setSheetIndex] = useState(0);

  const handleLocateMe = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    if (mapRef.current && location?.coords) {
      mapRef.current.animateToRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
    }
  };

  const stationsData = stationsDataRaw as { Table: Station[] };
  const markers: Station[] = useMemo(
    () => getStationsByState(stationsData.Table, 10),
    [stationsData.Table]
  );

  const [showMarkers, setShowMarkers] = useState(false);

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        style={StyleSheet.absoluteFillObject}
        // provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 22.5937,
          longitude: 78.9629,
          latitudeDelta: 20,
          longitudeDelta: 20,
        }}
        customMapStyle={darkMapStyle}
      >
        {showMarkers &&
          markers.map((station, idx) => (
            <Marker
              key={station.Station_Name + idx}
              coordinate={{
                latitude: station.Latitude,
                longitude: station.Longitude,
              }}
              title={station.Station_Name}
              description={
                station.State_Name +
                (station.District_Name ? ", " + station.District_Name : "")
              }
            />
          ))}
      </MapView>
      <View
        className="absolute left-0 w-full items-end z-10"
        style={{ top: 80 }}
        pointerEvents="box-none"
      >
        <View className="px-4 w-full">
          <SearchBar
            placeholder="Search state or district..."
            rightIcon={
              <TouchableOpacity onPress={handleLocateMe} activeOpacity={0.8}>
                {icons.locate("#FFA001", 22)}
              </TouchableOpacity>
            }
          />
        </View>
        <View className="flex-row items-center mx-4 mt-2 mb-1">
          <TouchableOpacity
            onPress={() => setShowMarkers((v) => !v)}
            className={`flex-row items-center rounded-xl border px-3 py-1.5 ${
              showMarkers
                ? "bg-primary border-primary"
                : "bg-dark-150 border-dark-150"
            }`}
            activeOpacity={1}
          >
            {icons.stations(showMarkers ? "#232336" : "#A8B5DB", 20)}
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={0}
        enablePanDownToClose={false}
        enableDynamicSizing={false}
        backgroundStyle={{
          backgroundColor: "#1A1A1A",
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        handleIndicatorStyle={{ backgroundColor: "#FFA001" }}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={1}
            disappearsOnIndex={0}
            opacity={0.5}
          />
        )}
        onChange={setSheetIndex}
      >
        <BottomSheetView style={{ height: '100%' }}>
          <View className="px-4 py-3 border-b border-dark-100">
            <Text className="text-primary text-xl font-bold mb-1">Regional Overview</Text>
            <Text className="text-secondary text-sm">Current: {region}</Text>
          </View>
          <ScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ 
              paddingBottom: 100
            }}
            showsVerticalScrollIndicator={false}
          >
            <View className="px-4 pt-2 pb-1">
              <View className="flex-row justify-between ">
                <MapCard
                  width={1}
                  title="18.5 m"
                  subTitle="Avg groundwater level (bgl)"
                  icon={icons.level("#FFA001", 32)}
                />
                <MapCard
                  width={1}
                  title="70"
                  subTitle="Availability Index"
                  icon={icons.water("#3b82f6", 32)}
                />
              </View>
              <View className="flex-row justify-between">
                <MapCard
                  width={1}
                  title="Stress"
                  subTitle="Region health status"
                  icon={icons.health("#ef4444", 32)}
                />
                <MapCard
                  width={1}
                  title="45%"
                  subTitle="Safe vs critical ratio"
                  icon={icons.shieldCheck("#22c55e", 32)}
                />
              </View>
            </View>

            <View className="px-4 mb-2">
              <View className="bg-dark-100 rounded-xl p-4 shadow-md">
                <Text className="text-xl font-semibold text-primary mb-2">
                  Weekly Groundwater Trends
                </Text>
                <Text className="text-secondary text-sm mb-4">
                  Average levels (m below ground level)
                </Text>
                <LineChart
                  data={chartData}
                  width={
                    require("react-native").Dimensions.get("window").width - 64
                  }
                  height={180}
                  chartConfig={chartConfig}
                  bezier
                  style={{ borderRadius: 12, alignSelf: "center" }}
                  fromZero
                />
                <View className="flex-row justify-between mt-4 pt-3 border-t border-dark-150">
                  <View className="items-center">
                    <Text className="text-secondary text-xs">Current</Text>
                    <Text className="text-primary text-lg font-semibold">18.6m</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-secondary text-xs">Change</Text>
                    <Text className="text-green-500 text-lg font-semibold">+0.2m</Text>
                  </View>
                  <View className="items-center">
                    <Text className="text-secondary text-xs">Status</Text>
                    <Text className="text-blue-400 text-lg font-semibold">Stable</Text>
                  </View>
                </View>
              </View>
            </View>

            <View className="px-4 mb-6">
              <View className="bg-dark-100 rounded-xl p-4 shadow-md">
                <Text className="text-xl font-semibold text-primary mb-4">
                  Water Balance Analysis
                </Text>
                
                <View className="flex-row justify-between mb-4">
                  <View className="flex-1 bg-dark-150 rounded-lg p-3 mr-2">
                    <Text className="text-secondary text-sm mb-1">Recharge</Text>
                    <Text className="text-green-500 text-xl font-bold">+3.2 MCM</Text>
                    <Text className="text-secondary text-xs">annual input</Text>
                  </View>
                  
                  <View className="flex-1 bg-dark-150 rounded-lg p-3 ml-2">
                    <Text className="text-secondary text-sm mb-1">Extraction</Text>
                    <Text className="text-red-400 text-xl font-bold">-4.1 MCM</Text>
                    <Text className="text-secondary text-xs">annual usage</Text>
                  </View>
                </View>

                <View className="bg-red-500/10 rounded-lg p-3 border border-red-500/20">
                  <View className="flex-row items-center justify-between">
                    <View>
                      <Text className="text-red-400 font-medium mb-1">Net Balance</Text>
                      <Text className="text-red-400 text-lg font-bold">-0.9 MCM (Deficit)</Text>
                    </View>
                    {icons.health("#ef4444", 32)}
                  </View>
                  <Text className="text-secondary text-xs mt-2">
                    Current extraction exceeds natural recharge. Conservation measures recommended.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
};

export default Map;
