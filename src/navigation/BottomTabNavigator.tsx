import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '@/screens/HomeScreen';
import DiscoverScreen from '@/screens/DiscoverScreen';
import ProfileScreen from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    bottom: 12,
                    left: 16,
                    right: 16,
                    height: 70,
                    borderRadius: 30,
                    backgroundColor: '#fff',
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 5,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = '';

                    if (route.name === 'Home') iconName = 'search';
                    else if (route.name === 'Discover') iconName = 'sparkles-outline';
                    else if (route.name === 'Profile') iconName = 'person-circle-outline';

                    return <Ionicons name={iconName as any} size={24} color={focused ? '#0056b3' : '#aaa'} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Discover" component={DiscoverScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
}