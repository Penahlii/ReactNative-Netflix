import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {storage} from '../../store/Store';

const Profile = () => {
  const signOut = () => {
    storage.delete('token');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>

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
