import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../auth/SignIn';
import ClientNavigator from './ClientNavigation';
import AdminNavigator from './AdminNavigator';

const Stack = createStackNavigator();

const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ClientHome" component={ClientNavigator} />
      <Stack.Screen name="AdminHome" component={AdminNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
