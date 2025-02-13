import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TabStack from './TabStack';
import AuthStack from './AuthStack';
import {useMMKVString} from 'react-native-mmkv';

const Navigation = () => {
  const [token, setToken] = useMMKVString('token');

  return (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  );
};

export default Navigation;
