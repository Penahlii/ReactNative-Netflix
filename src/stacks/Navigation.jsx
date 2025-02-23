import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TabStack from './TabStack';
import AuthStack from './AuthStack';
import {useMMKVString} from 'react-native-mmkv';

const Navigation = () => {
  const [token, setToken] = useMMKVString('token');
  // const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="SignIn" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} />
      </Stack.Navigator> */}
      {token ? <TabStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default Navigation;
