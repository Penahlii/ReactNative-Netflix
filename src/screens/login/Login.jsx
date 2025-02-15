import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import {useState} from 'react';
import Input from './components/Input';
import {useMMKVString} from 'react-native-mmkv';
import Mercedes from '../../../assets/icons/mercedes.svg';

const Login = () => {
  const [formData, setFormData] = useState({});
  const [token, setToken] = useMMKVString('token');

  const login = async () => {
    try {
      const response = await fetch(
        'http://192.168.1.107:5001/api/v1/auth/login',
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
      <Mercedes />
      <Text style={styles.title}>Login</Text>
      <Input
        name="email"
        setFormData={setFormData}
        value={formData?.email}
        placeholder="Enter your email"
      />

      <Input
        name="password"
        setFormData={setFormData}
        value={formData?.password}
        placeholder="Enter your password"
      />

      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
  },
  button: {
    marginTop: 12,
    width: '100%',
    height: 50,
    backgroundColor: '#007BFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default Login;
