import { View, Text, StatusBar, NativeModules, Platform } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './src/HomeScreen/HomeScreen';
import SettingsScreen from './src/SettingsScreen/SettingsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
  
  const Tab = createBottomTabNavigator();
  const {NavigationBarColor} = NativeModules

  if(Platform.OS === 'android'){
    NavigationBarColor.changeNavigationBarColor('#ffffff', false, true);
  }
  return (
    <NavigationContainer >
      <StatusBar barStyle='dark-content' backgroundColor='white'/>
      <Tab.Navigator initialRouteName='HomeScreen' screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'HomeScreen') {
              iconName = focused ? 'home' : 'home-outline';
            } 
            else if (route.name === 'SettingsScreen') {
              iconName = focused ? 'settings' : 'settings-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'lightgray',
        })}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="SettingsScreen" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}