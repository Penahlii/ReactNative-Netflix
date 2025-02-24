import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  StatusBar,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {IP_URL, IMG_URL} from '@env';
import Logo from '../../../assets/icons/logo.svg';
import CustomFlatlist from '../../common/CustomFlatlist';
import {useNavigation} from '@react-navigation/native';
import {useMMKVString} from 'react-native-mmkv';
import {fetchVideoKey} from '../../api/videoService';
import YoutubePlayer from 'react-native-youtube-iframe';

const Home = () => {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [shows, setShows] = useState([]);
  const [videokey, setVideokey] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);
  const navigation = useNavigation();
  const [token, setToken] = useMMKVString('token');

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

  const getFeaturedMovieVideoKey = async () => {
    const key = await fetchVideoKey({
      type: 'movie',
      id: featuredMovie.id,
      token,
    });
    if (key) {
      setVideokey(key);
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

  useEffect(() => {
    if (featuredMovie) {
      getFeaturedMovieVideoKey();
    }
  }, [featuredMovie]);

  return (
    <ScrollView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
        translucent={true}
      />
      <View style={styles.logoContainer}>
        <Logo width={100} height={40} />
      </View>

      {/* Featured Movie Section with Loading */}
      <View style={styles.featuredContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" style={styles.loader} />
        ) : featuredMovie ? (
          <>
            <Image
              source={{uri: featuredMovie.poster}}
              style={styles.featuredPoster}
              resizeMode="cover"
            />
            <View style={styles.gradient}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setShowPlayer(true)}>
                  <Text style={styles.buttonText}>Play</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (featuredMovie) {
                      navigation.navigate('Details', {
                        id: featuredMovie.id,
                        type: 'movie',
                      });
                    }
                  }}
                  style={[styles.button, styles.moreInfoButton]}>
                  <Text style={[styles.buttonText, styles.moreInfoText]}>
                    More Info
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        ) : null}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={showPlayer}
        onRequestClose={() => setShowPlayer(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.playerContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowPlayer(false)}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
            <YoutubePlayer height={220} videoId={videokey} />
          </View>
        </View>
      </Modal>

      <View style={styles.scrollContainer}>
        <CustomFlatlist header="Trending Movies" data={movies} type="movie" />
        <CustomFlatlist header="Popular TV Shows" data={shows} type="tv" />
      </View>
    </ScrollView>
  );
};

export default Home;

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  logoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#000',
  },
  featuredContainer: {
    width: width,
    height: height * 0.55,
    paddingHorizontal: 15,
    position: 'relative',
    marginBottom: 15,
    justifyContent: 'center', // Centers the loader when loading
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: '50%',
    transform: [{translateY: -25}],
  },
  featuredPoster: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 15,
    right: 15,
    height: '50%',
    justifyContent: 'flex-end',
    paddingBottom: 25,
    backgroundColor: 'transparent',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundImage:
      'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.9) 100%)',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 4,
    minWidth: 120,
    alignItems: 'center',
  },
  moreInfoButton: {
    backgroundColor: 'rgba(109, 109, 109, 0.7)',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Poppins-Regular',
  },
  moreInfoText: {
    color: '#fff',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerContainer: {
    width: '90%',
    backgroundColor: '#000',
    borderRadius: 10,
    padding: 20,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
});
