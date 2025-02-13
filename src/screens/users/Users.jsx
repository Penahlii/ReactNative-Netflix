import {Text, TouchableOpacity, View, FlatList} from 'react-native';
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
    <View className="flex-1 bg-gray-100 px-5 pt-16">
      {/* Sticky Button */}
      <View className="absolute top-2 left-0 right-0 z-10 items-center bg-gray-100 py-3">
        <TouchableOpacity
          className="bg-blue-600 py-3 px-5 rounded-lg shadow-md mb-2"
          onPress={() => navigation.navigate('Todos')}>
          <Text className="text-white text-lg font-semibold">Go to Todos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-600 py-3 px-5 rounded-lg shadow-md"
          onPress={() => navigation.navigate('Gallery')}>
          <Text className="text-white text-lg font-semibold">
            Go to Gallery
          </Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable List */}
      <FlatList
        ListHeaderComponent={() => (
          <Text className="text-2xl font-bold text-gray-900 text-center mb-3">
            Users
          </Text>
        )}
        contentContainerStyle={{paddingTop: 60, paddingBottom: 20}}
        data={users}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <UserCard user={item} />}
        ListEmptyComponent={() => (
          <View className="items-center mt-5">
            <Text className="text-lg text-gray-500">No users found</Text>
          </View>
        )}
      />
    </View>
  );
};

export default Users;
