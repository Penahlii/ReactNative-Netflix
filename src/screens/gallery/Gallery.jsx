import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {PERMISSIONS, request} from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';

const Gallery = () => {
  const os = Platform.OS;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleGalleryOpen = () => {
    request(
      os === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    ).then(status => {
      status === 'granted' &&
        launchImageLibrary({mediaType: 'photo'}, response => {
          !response.didCancel && setSelectedImage(response.assets[0].uri);
        });
    });
  };

  return (
    <View>
      {selectedImage && (
        <FastImage
          style={{width: 200, height: 200}}
          source={{uri: selectedImage, priority: FastImage.priority.high}}
          resizeMode={FastImage.resizeMode.contain}
        />
      )}

      <TouchableOpacity
        onPress={handleGalleryOpen}
        className="w-full bg-blue-600 dark:bg-blue-800 py-3 rounded-lg shadow-md">
        <Text className="text-white text-center text-lg font-semibold">
          Select an Image
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Gallery;
