import Loader from "@/components/Loader";

import { Tabs } from "expo-router";
import { StatusBar, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { icons } from '../../constants/icons';

type TabIconProps = {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View
      className={`flex-1 flex flex-col justify-center items-center rounded-full ${focused ? "bg-general-300" : ""}`}
      style={{ minWidth: 60, height: 60 }}
    >
      {icon(color, 24)}
      <Text
        className={`text-xs mt-1 ${focused ? "font-psemibold text-white" : "font-pregular text-gray-300"}`}
        style={{ color: color, textAlign: 'center' }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
    const loading = useSelector((state: any) => state.app.loading);
  return ( <>
      <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFA001",
        tabBarInactiveTintColor: "#CDCDE0",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#000000",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 20,
          height: 60,
          paddingTop: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
        },
      }}
      >
        <Tabs.Screen
          name="map"
          options={{
            title: "Map",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.map}
                color={color}
                name="Map"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="stations"
          options={{
            title: "Stations",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.stations}
                color={color}
                name="Stations"
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="analytics"
          options={{
            title: "Analytics",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.analytics}
                color={color}
                name="Analytics"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
        <StatusBar barStyle="light-content" />

      <Loader isLoading={loading} />
    </>);
}
