import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const UserCard = ({user}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('UserDetails', {user})}>
      <View style={styles.cardContent}>
        <Text style={styles.userName}>{user.name}</Text>
        <Text style={styles.userEmail}>{user.email}</Text>
        <Text style={styles.userPhone}>{user.phone}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Android shadow
    marginBottom: 12,
  },
  cardContent: {
    gap: 4,
  },
  userName: {
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold', // Use of Custom Fonts
  },
  userEmail: {
    fontSize: 14,
    color: '#555',
  },
  userPhone: {
    fontSize: 14,
    color: '#777',
  },
});
