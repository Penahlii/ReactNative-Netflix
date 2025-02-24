import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute, useNavigation} from '@react-navigation/native';
import {IP_URL} from '@env';
import {useMMKVString} from 'react-native-mmkv';
import GenreTag from './components/GenreTag';
import YoutubePlayer from 'react-native-youtube-iframe';
import CustomFlatList from '../../common/CustomFlatlist';
import Back from '../../../assets/icons/details/back.svg';
import Logo from '../../../assets/icons/logo.svg';
import {fetchVideoKey} from '../../api/videoService';

const Details = () => {
  const navigation = useNavigation();
  const [token, setToken] = useMMKVString('token');
  const route = useRoute();
  const {id, type} = route.params;
  const [videokey, setVideokey] = useState('');
  const [similar, setSimilar] = useState([]);

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch Details
  const getData = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${IP_URL}/${type}/${id}/details`);
      const result = await response.json();

      setData(result.content);
    } catch (error) {
      console.error('Error fetching details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch video key
  const getVideoKey = async () => {
    const key = await fetchVideoKey({type, id, token});
    if (key) {
      setVideokey(key);
    }
  };

  // Fetch Similars
  const getSimilar = async () => {
    if (!token) return;

    try {
      const response = await fetch(`${IP_URL}/${type}/${id}/similar`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (result.success && result.similar.length > 0) {
        setSimilar(result.similar);
      }
    } catch (error) {
      console.error('Error fetching similars:', error);
    }
  };

  useEffect(() => {
    getVideoKey();
    getData();
    getSimilar();
  }, [id, type]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Logo width={100} height={40} />
        </View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Back width={24} height={24} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={styles.loader} />
      ) : data ? (
        <View style={styles.contentContainer}>
          {videokey ? (
            <YoutubePlayer height={200} videoId={videokey} />
          ) : (
            <Text style={styles.noTrailerText}>No Trailer Available</Text>
          )}
          <Text style={styles.title}>{data.title || data.name}</Text>

          {data.genres && data.genres.length > 0 && (
            <GenreTag genres={data.genres} />
          )}

          <Text style={styles.overview}>{data.overview}</Text>

          {similar.length ? (
            <View style={styles.similarContainer}>
              <CustomFlatList
                header={type === 'tv' ? 'Similar TV Shows' : 'Similar Movies'}
                data={similar}
                type={type}
              />
            </View>
          ) : (
            <Text style={styles.noTrailerText}>No Similar Available</Text>
          )}
        </View>
      ) : null}
    </ScrollView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  headerContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#000',
  },
  logoContainer: {
    paddingVertical: 20,
    backgroundColor: '#000',
  },
  backButton: {
    padding: 8,
    marginBottom: 10,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
  },
  overview: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
    textAlign: 'left',
  },
  noTrailerText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 16,
  },
  similarContainer: {
    marginTop: 24,
    marginLeft: -9,
  },
  similarTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
