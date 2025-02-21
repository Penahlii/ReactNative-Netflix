import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from 'react';
import Input from './components/Input';
import {useMMKVString} from 'react-native-mmkv';
import Logo from '../../../assets/icons/logo.svg';
import Button from './components/Button';

const Login = ({navigation}) => {
  const [formData, setFormData] = useState({});
  const [token, setToken] = useMMKVString('token');

  const login = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.100:5001/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const data = await response.json();
        setToken(data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={100} height={40} />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Sign In</Text>
        <Input
          name="email"
          setFormData={setFormData}
          value={formData?.email}
          placeholder="Email"
        />

        <Input
          name="password"
          setFormData={setFormData}
          value={formData?.password}
          placeholder="Password"
        />

        <Button title="Sign In" onPress={login} />

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>New to Netflix? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign up now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  logoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: -50,
  },
  title: {
    fontSize: 32,
    color: '#FFFFFF',
    fontWeight: '500',
    marginBottom: 30,
  },
  signInButton: {
    width: '100%',
    height: 48,
    backgroundColor: '#E50914',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '500',
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpText: {
    color: '#737373',
    fontSize: 15,
  },
  signUpLink: {
    color: '#FFFFFF',
    fontSize: 15,
  },
});

export default Login;
