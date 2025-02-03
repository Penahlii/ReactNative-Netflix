import {StyleSheet, Text, TouchableOpacity, View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import UserCard from './components/UserCard';

const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/users',
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={styles.container}>
      {/* Sticky Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Todos')}>
          <Text style={styles.buttonText}>Go to Todos</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable List */}
      <FlatList
        ListHeaderComponent={() => <Text style={styles.title}>Users</Text>}
        contentContainerStyle={styles.listContainer}
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <UserCard user={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No users found</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  headerContainer: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    paddingVertical: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  listContainer: {
    gap: 16,
    paddingTop: 60,
    paddingBottom: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});
