import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {storage} from '../../store/Store';
import Logo from '../../../assets/icons/logo.svg';
import {useMMKVString} from 'react-native-mmkv';

const Profile = () => {
  const [username, setUsername] = useMMKVString('username');

  const signOut = () => {
    storage.delete('username');
    storage.delete('email');
    storage.delete('token');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={100} height={40} />
      </View>
      <TouchableOpacity style={styles.button} onPress={signOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  logoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  button: {
    marginTop: 12,
    width: '100%',
    height: 50,
    backgroundColor: '#D9534F', // Red for sign out
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});
