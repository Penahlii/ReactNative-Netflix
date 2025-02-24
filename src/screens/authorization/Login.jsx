import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Modal,
  StatusBar,
} from 'react-native';
import {useState} from 'react';
import Input from './components/Input';
import {useMMKVString} from 'react-native-mmkv';
import Logo from '../../../assets/icons/logo.svg';
import Button from './components/Button';
import {IP_URL} from '@env';

const Login = ({navigation}) => {
  const [formData, setFormData] = useState({});
  const [token, setToken] = useMMKVString('token');
  const [email, setEmail] = useMMKVString('email');
  const [errorMessage, setErrorMessage] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const login = async () => {
    setErrorMessage('');

    if (!formData?.email || !formData?.password) {
      showErrorMessage('Email and password are required');
      return;
    }

    try {
      const response = await fetch(`${IP_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Invalid credentials');
      }

      setEmail(formData.email);
      setToken(data.token);
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  const showErrorMessage = message => {
    setErrorMessage(message);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
        translucent={true}
      />
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
          secureTextEntry
        />

        <Button fontFamily="Roboto-Regular" title="Sign In" onPress={login} />

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>New to Netflix? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signUpLink}>Sign up now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Error Modal */}
      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Login Failed</Text>
            <Text style={styles.modalMessage}>{errorMessage}</Text>
            <TouchableOpacity
              style={styles.dismissButton}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.dismissButtonText}>Dismiss</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    fontFamily: 'Roboto-Regular',
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
    fontFamily: 'Roboto-Regular',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#222',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#E50914',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
  },
  dismissButton: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 4,
  },
  dismissButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Login;
