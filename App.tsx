// App.tsx
import 'react-native-gesture-handler';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppNavigator from './src/navigation/AppNavigator';
import {SafeAreaProvider} from "react-native-safe-area-context";

export default function App() {
  return (
      <SafeAreaProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
              <AppNavigator />
          </GestureHandlerRootView>
      </SafeAreaProvider>
  );
}