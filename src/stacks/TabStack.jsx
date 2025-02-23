import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import {View} from 'react-native';
import HomeActive from '../../assets/icons/tabBar/homeActive.svg';
import HomeInactive from '../../assets/icons/tabBar/homeInactive.svg';
import ProfileActive from '../../assets/icons/tabBar/profileActive.svg';
import ProfileInactive from '../../assets/icons/tabBar/profileInactive.svg';

const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {backgroundColor: 'black'},
        tabBarActiveTintColor: 'white',
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <HomeActive width={24} height={24} />
              ) : (
                <HomeInactive width={24} height={24} />
              )}
            </View>
          ),
        }}
        name="HomeTab"
        component={HomeStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => (
            <View>
              {focused ? (
                <ProfileActive width={24} height={24} />
              ) : (
                <ProfileInactive width={24} height={24} />
              )}
            </View>
          ),
        }}
        name="ProfileTab"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
