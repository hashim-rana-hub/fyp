import React, {useEffect, useState} from 'react';
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
import Lessons from './src/components/Lessons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import FeedBack from './src/components/Feedback/FeedBack';
import TextToGestuers from './src/components/Gesture/TextToGestuers';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

const AuthStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

const MainTabNavigator = () => (
  <Tab.Navigator screenOptions={{headerShown: false}}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Lessons" component={Lessons} />
    <Tab.Screen name="Profile" component={ProfileStack} />
  </Tab.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Tab.Screen name="userProfile" component={Profile} />
    <Tab.Screen name="Feedback" component={FeedBack} />
  </Stack.Navigator>
);
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="Text To Speech" component={TextToSpeech} />
    <Stack.Screen name="Emergency" component={Emergency} />
    <Stack.Screen name="Gesture" component={Gesture} />
    <Stack.Screen name="Text To Gesture" component={TextToGestuers} />
  </Stack.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      setIsAuthenticated(token ? true : false); // Set isAuthenticated to true if token exists, false otherwise
    } catch (error) {
      console.error('Error checking token:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (isLoading) {
    // You can return a loading spinner or splash screen here
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={isAuthenticated ? 'Main' : 'Auth'}>
          <Stack.Screen name="Auth" component={AuthStack} />
          <Stack.Screen name="Main" component={MainTabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </QueryClientProvider>
  );
};

export default App;
