import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../../assets/icons/logo.svg';
import Input from './components/Input';
import Button from './components/Button';
import {IP_URL} from '@env';
import {useMMKVString} from 'react-native-mmkv';

const SignUp = ({navigation}) => {
  const [formData, setFormData] = useState({});
  const [username, setUsername] = useMMKVString('username');

  const signup = async () => {
    try {
      const response = await fetch(`${IP_URL}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setUsername(formData.username);
        navigation.navigate('SignIn');
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
        <Text style={styles.title}>Sign Up</Text>

        <Input
          name="username"
          setFormData={setFormData}
          value={formData?.username}
          placeholder="Username"
        />

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

        <Button title="Sign Up" onPress={signup} />

        <View style={styles.signInContainer}>
          <Text style={styles.signInText}>Already have an account?</Text>
          <TouchableOpacity
            fontFamily="Roboto-Regular"
            onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.signInLink}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

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
  signInContainer: {
    flexDirection: 'column',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  signInText: {
    color: '#737373',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
  signInLink: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Roboto-Regular',
  },
});
