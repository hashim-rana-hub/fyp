import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Login from './src/components/Login';
import SignUp from './src/components/Signup';
import Profile from './src/components/Profile';
import Home from './src/components/Home';
import {QueryClient, QueryClientProvider} from 'react-query';
import Gesture from './src/components/Gesture';
import TextToSpeech from './src/components/TextToSpeech';
import Emergency from './src/components/Emergency';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Lessons" component={Profile} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="TextToSpeech" component={TextToSpeech} />
    <Stack.Screen name="Emergency" component={Emergency} />
    <Stack.Screen name="Gesture" component={Gesture} />
  </Stack.Navigator>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  </QueryClientProvider>
);

export default App;
