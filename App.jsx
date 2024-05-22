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
import LessonDetails from './src/components/LessonDetails';
import FeedBack from './src/components/Feedback/FeedBack';
import TextToGestuers from './src/components/Gesture/TextToGestuers';
import Feather from 'react-native-vector-icons/Feather';
import Support from './src/components/Support/Support';
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
  <Tab.Navigator
    screenOptions={({route}) => ({
      headerShown:
        route.name === 'Support' || route.name === 'Lessons' ? true : false,
      tabBarHideOnKeyboard: true,
      tabBarIcon: ({focused, color, size}) => {
        let iconName;

        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home';
        } else if (route.name === 'Lessons') {
          iconName = focused ? 'book-open' : 'book-open';
        } else if (route.name === 'profile') {
          iconName = focused ? 'user' : 'user';
        } else if (route.name === 'Support') {
          iconName = focused ? 'message-circle' : 'message-circle';
        }

        // You can return any component that you like here!
        return <Feather name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007786',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen name="Home" component={HomeStack} />
    <Tab.Screen name="Lessons" component={Lessons} />
    <Tab.Screen name="Support" component={Support} />
    <Tab.Screen name="profile" component={ProfileStack} />
  </Tab.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Tab.Screen name="Profile" component={Profile} />
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

const LessonStack = () => (
  <Stack.Navigator screenOptions={{headerShown: false}}>
    <Stack.Screen name="lessons" component={Lessons} />
    <Stack.Screen name="LessonDetails" component={LessonDetails} />
  </Stack.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkToken = async () => {
    try {
      const token = await AsyncStorage.getItem('accessToken');

      setIsAuthenticated(token ? true : false);
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
