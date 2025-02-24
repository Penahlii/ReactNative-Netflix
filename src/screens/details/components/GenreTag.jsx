import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

const GenreTag = ({genres}) => {
  return (
    <View style={styles.container}>
      {genres.map((genre, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.text}>{genre.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#27272a',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  text: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default GenreTag;
