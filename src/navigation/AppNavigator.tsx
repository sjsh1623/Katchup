import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DiscoverScreen from '@/screens/DiscoverScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Discover" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Discover" component={DiscoverScreen} />
                {/* 다른 화면 추가 가능 */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}