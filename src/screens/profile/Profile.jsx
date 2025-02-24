import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from 'react-native';
import React from 'react';
import {storage} from '../../store/Store';
import Logo from '../../../assets/icons/logo.svg';
import {useMMKVString} from 'react-native-mmkv';

const {width} = Dimensions.get('window');

const Profile = () => {
  const [username] = useMMKVString('username');
  const [email] = useMMKVString('email');

  const signOut = () => {
    storage.delete('username');
    storage.delete('email');
    storage.delete('token');
  };

  return (
    <View style={styles.container}>
      {/* Logo Section */}
      <View style={styles.logoContainer}>
        <Logo width={100} height={40} />
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{
            uri: 'https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg',
          }}
          style={styles.avatar}
        />
        <Text style={styles.email}>{email}</Text>
      </View>

      {/* Sign Out Button Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#000',
    width: '100%',
    alignItems: 'flex-start',
    position: 'absolute',
    top: 0,
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: 120, // Ensures space below the logo
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#e50914',
    marginBottom: 15,
  },
  email: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    width: width * 0.8, // Responsive width
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#e50914',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 6,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  signOutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
