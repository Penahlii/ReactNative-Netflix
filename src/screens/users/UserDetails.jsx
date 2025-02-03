import {Text, View, StyleSheet} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

const UserDetails = () => {
  const route = useRoute();
  const {user} = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userPhone}>{user.phone}</Text>
        <Text style={styles.userAddress}>
          {user.address.street}, {user.address.city}
        </Text>
      </View>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F9F9F9',
  },
  card: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  userPhone: {
    fontSize: 16,
    color: '#777',
    marginBottom: 6,
  },
  userAddress: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
