import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/authorization/Login';
import SignUp from '../screens/authorization/SignUp';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import {useMMKVBoolean} from 'react-native-mmkv';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useMMKVBoolean(
    'isOnboardingCompleted',
  );

  const initialRoute = isOnboardingCompleted ? 'SignIn' : 'OnBoarding';
  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="OnBoarding" component={OnboardingScreen} />
      <Stack.Screen name="SignIn" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthStack;
