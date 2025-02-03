import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import TabStack from './TabStack';

const Navigation = () => {
  return (
    <NavigationContainer>
      <TabStack />
    </NavigationContainer>
  );
};

export default Navigation;
