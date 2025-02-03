import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen
        options={{tabBarLabel: 'Home'}}
        name="HomeTab"
        component={HomeStack}
      />
      <Tab.Screen
        options={{tabBarLabel: 'Profile'}}
        name="ProfileTab"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
