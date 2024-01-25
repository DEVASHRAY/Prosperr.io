import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Test from '../screens/user-detail';

const AppNavigator = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <AppNavigator.Navigator>
      <AppNavigator.Screen name="home" component={Home} />
      <AppNavigator.Screen name="test" component={Test} />
    </AppNavigator.Navigator>
  );
}
