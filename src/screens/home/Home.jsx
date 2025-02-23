import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IP_URL, IMG_URL} from '@env';
import Logo from '../../../assets/icons/logo.svg';
import CustomFlatlist from '../../common/CustomFlatlist';

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);

  const fetchFeaturedMovie = async () => {
    try {
      const response = await fetch(`${IP_URL}/movie/trending`);
      const data = await response.json();

      if (data.content.length > 0) {
        const firstMovie = data.content[0]; // Get the first movie
        const detailsResponse = await fetch(
          `${IP_URL}/movie/${firstMovie.id}/details`,
        );
        const details = await detailsResponse.json();

        setFeaturedMovie({
          ...firstMovie,
          poster: details.content.poster_path
            ? `${IMG_URL}${details.content.poster_path}`
            : null,
        });
      }
    } catch (error) {
      console.error('Error fetching featured movie:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMovies = async () => {
    try {
      const response = await fetch(`${IP_URL}/movie/trending`);
      const data = await response.json();

      setMovies(data.content);
    } catch (error) {
      console.error(error);
    }
  };

  const getShows = async () => {
    try {
      const response = await fetch(`${IP_URL}/tv/trending`);
      const data = await response.json();

      setShows(data.content);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchFeaturedMovie();
    getMovies();
    getShows();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo width={100} height={40} />
      </View>
      <ScrollView style={styles.scrollContainer}>
        <CustomFlatlist header="Trending Movies" data={movies} type="movie" />
        <CustomFlatlist header="Popular TV Shows" data={shows} type="tv" />
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  logoContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  scrollContainer: {
    paddingHorizontal: 12,
  },
});
