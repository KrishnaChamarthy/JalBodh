import 'react-native-gesture-handler';

import { Stack } from "expo-router";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import './global.css';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: '#232336' },
          }}
        >
          <Stack.Screen name="(tabs)" options={{headerShown: false}} />
          <Stack.Screen name="index" options={{headerShown: false}} />
          <Stack.Screen name="station/[id]" options={{headerShown: false}} />
        </Stack>
      </Provider>
    </GestureHandlerRootView>
  );
}
