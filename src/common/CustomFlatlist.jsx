import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IMG_URL, IP_URL} from '@env';

const CustomFlatList = ({header, data, type}) => {
  const navigation = useNavigation();
  const [posters, setPosters] = useState({});

  useEffect(() => {
    const fetchPosters = async () => {
      const updatedPosters = {};
      for (const item of data) {
        try {
          const response = await fetch(`${IP_URL}/${type}/${item.id}/details`);
          const details = await response.json();
          updatedPosters[item.id] = details.content.poster_path
            ? `${IMG_URL}${details.content.poster_path}`
            : null;
        } catch (error) {
          console.error(`Error fetching poster for ${item.id}:`, error);
        }
      }
      setPosters(updatedPosters);
    };

    if (data.length > 0) {
      fetchPosters();
    }
  }, [data, type]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      {data.length === 0 ? (
        <ActivityIndicator size="large" color="white" />
      ) : (
        <FlatList
          data={data}
          horizontal
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={() =>
                navigation.navigate('Details', {id: item.id, type})
              }>
              {posters[item.id] ? (
                <Image source={{uri: posters[item.id]}} style={styles.poster} />
              ) : (
                <ActivityIndicator size="small" color="white" />
              )}
            </TouchableOpacity>
          )}
          contentContainerStyle={{paddingHorizontal: 10}}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  header: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: 'Montserrat-Bold',
  },
  imageContainer: {
    marginRight: 10,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
});

export default CustomFlatList;
