import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import Download from '../../../assets/icons/onboarding/download.svg';
import Films from '../../../assets/icons/onboarding/films.svg';
import Laptop from '../../../assets/icons/onboarding/laptop.svg';
import Population from '../../../assets/icons/onboarding/population.svg';
import Logo from '../../../assets/icons/logo.svg';
import {useMMKVBoolean} from 'react-native-mmkv';

const slides = [
  {
    id: 1,
    title: 'Watch on any device',
    description:
      'Stream on your phone, tablet, laptop and TV without paying more',
    image: <Laptop />,
    background: 'black',
  },
  {
    id: 2,
    title: '3, 2, 1,... Download!',
    description: 'Always have something to watch offline.',
    image: <Download />,
    background: 'black',
  },
  {
    id: 3,
    title: 'No pesky contracts.',
    description: 'Cancel anytime',
    image: <Population />,
    background: 'black',
  },
  {
    id: 4,
    title: 'How do I watch?',
    description: 'Members that subscribe to Netflix can watch here in the app.',
    image: <Films />,
    background: 'image',
  },
];

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const swiperRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [openedAppFirst, setOpenedAppFirst] = useMMKVBoolean('openedAppFirst');

  const handleNext = () => {
    if (currentIndex === slides.length - 1) {
      setOpenedAppFirst(false);
      // TODO: Navigate to your next screen here
      // For example:
      // navigation.navigate('Login');
      console.log('Last slide - Navigate to next screen');
    } else {
      swiperRef.current.scrollBy(1);
    }
  };

  // useEffect(() => {
  //   navigation.navigate('Users');
  // }, [openedAppFirst]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="black"
        translucent={true}
      />
      <Swiper
        ref={swiperRef}
        autoplay={true}
        autoplayTimeout={3}
        showsPagination={true}
        loop={false}
        paginationStyle={styles.pagination}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        onIndexChanged={index => setCurrentIndex(index)}>
        {slides.map(slide => (
          <View
            key={slide.id}
            style={[
              styles.slideContainer,
              {
                backgroundColor: 'black',
              },
            ]}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Logo width={100} height={40} />
              </View>
              <Text style={styles.helpText}>Help</Text>
            </View>
            {slide.background !== 'black' && (
              <View style={styles.backgroundSvg}>
                <Films width="100%" height="100%" />
              </View>
            )}
            <View style={styles.contentContainer}>
              <View style={styles.imageContainer}>{slide.image}</View>
              <Text style={styles.title}>{slide.title}</Text>
              <Text style={styles.description}>{slide.description}</Text>
            </View>
            <View style={styles.nextButtonContainer}>
              <TouchableOpacity onPress={handleNext}>
                <Text style={styles.nextButton}>NEXT</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </Swiper>
    </>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    width: '100%',
    zIndex: 2,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
  },
  helpText: {
    color: 'white',
    fontSize: 14,
    position: 'absolute',
    right: 20,
    top: 2,
    paddingTop: 28,
  },
  backgroundSvg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.15,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 100,
  },
  imageContainer: {
    marginBottom: 50,
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#e5e5e5',
    textAlign: 'center',
    lineHeight: 24,
  },
  nextButtonContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  nextButton: {
    backgroundColor: '#E50914',
    color: 'black',
    textAlign: 'center',
    paddingVertical: 12,
    fontSize: 14,
    fontWeight: '600',
    borderRadius: 4,
  },
  pagination: {
    bottom: 80,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    margin: 3,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E50914',
    margin: 3,
  },
});

export default OnboardingScreen;
