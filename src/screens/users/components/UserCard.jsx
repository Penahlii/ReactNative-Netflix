import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const {scale} = Dimensions.get('window');

const getFontSize = baseSize => {
  if (scale < 1.5) return baseSize;
  if (scale < 2) return baseSize + 1;
  if (scale < 3) return baseSize + 2;
  return baseSize + 3;
};

const UserCard = ({user}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('UserDetails', {user})}>
      <View style={styles.cardContent}>
        <Text style={[styles.userName, {fontSize: getFontSize(18)}]}>
          {user.name}
        </Text>
        <Text style={[styles.userEmail, {fontSize: getFontSize(14)}]}>
          {user.email}
        </Text>
        <Text style={[styles.userPhone, {fontSize: getFontSize(14)}]}>
          {user.phone}
        </Text>
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
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardContent: {
    gap: 4,
  },
  userName: {
    fontFamily: 'Montserrat-SemiBold',
  },
  userEmail: {
    color: '#555',
  },
  userPhone: {
    color: '#777',
  },
});
