import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabNavigator from './BottomTabNavigator';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MoreFeedScreen from '../screens/MoreFeedScreen';
import AlarmScreen from "@/screens/AlarmScreen";
import DetailScreen from "@/screens/DetailScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen
                    name="HomeTabs"
                    component={BottomTabNavigator}
                />
                <Stack.Screen
                    name="MoreFeedScreen"
                    component={MoreFeedScreen}
                />
                <Stack.Screen
                    name="AlarmScreen"
                    component={AlarmScreen}
                />
                <Stack.Screen
                    name="DetailScreen"
                    component={DetailScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}