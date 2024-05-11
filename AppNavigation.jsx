import React from 'react';
import routes from './src/app/routes';
import {useContext} from 'react';
import {GlobalContext} from './src/app/context';
import {NavigationContainer} from '@react-navigation/native';
import {appScreens, authScreens} from './src/app/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {globalStyles} from './src/stylesheet/global';

const Stack = createNativeStackNavigator();
function AppNavigation() {
  const {isAuthenticated} = useContext(GlobalContext);
  const screens = isAuthenticated ? appScreens() : authScreens();

  return (
    <GestureHandlerRootView style={globalStyles.flex1}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={routes.SPLASH}>
          {screens?.map(({id, route, component}) => (
            <Stack.Screen
              key={id}
              name={route}
              component={component}
              options={{headerShown: false, headerBackVisible: false}}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default AppNavigation;
