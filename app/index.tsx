

import { Redirect } from 'expo-router';
import { useRef } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import { useSelector } from 'react-redux';
import Loader from '../components/Loader';

export default function Index() {
  const mapRef = useRef<MapView>(null);
  const loading = useSelector((state: any) => state.app.loading);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <Loader isLoading={loading} />
      </View>
    );
  }
  return <Redirect href="/(tabs)/map" />;
}
