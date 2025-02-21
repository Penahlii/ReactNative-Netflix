import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import TabStack from './TabStack';
import AuthStack from './AuthStack';
import {useMMKVString} from 'react-native-mmkv';
import OnBoardingStack from './OnBoardingStack';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import Users from '../screens/users/Users';
import Login from '../screens/authorization/Login';
import SignUp from '../screens/authorization/SignUp';

const Navigation = () => {
  const [token, setToken] = useMMKVString('token');
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OnBoarding"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
        <Stack.Screen name="Users" component={Users} />
        <Stack.Screen name="SignIn" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
