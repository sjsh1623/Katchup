import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Ionicons} from '@expo/vector-icons';

import HomeScreen from '@/screens/HomeScreen';
import DiscoverScreen from '@/screens/DiscoverScreen';
import ProfileScreen from '@/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({
                tabBarShowLabel: false,
                tabBarStyle: {
                    position: 'absolute',
                    alignSelf: 'center',
                    height: 70,
                    borderRadius: 15,
                    backgroundColor: '#fff',
                    elevation: 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                tabBarIcon: ({focused, color, size}) => {
                    let iconName: string = '';

                    if (route.name === 'Home') iconName = 'search';
                    else if (route.name === 'Discover') iconName = 'sparkles-outline';
                    else if (route.name === 'Profile') iconName = 'person-circle-outline';

                    return <Ionicons name={iconName as any} size={26} color={focused ? '#0056b3' : '#aaa'}/>;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen}/>
            <Tab.Screen name="Discover" component={DiscoverScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    );
}