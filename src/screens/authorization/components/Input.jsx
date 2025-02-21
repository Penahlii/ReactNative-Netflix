import React from 'react';
import {TextInput, StyleSheet, View} from 'react-native';

const Input = ({name, placeholder, value, setFormData}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        secureTextEntry={name === 'password' || name === 'repeat_password'}
        defaultValue={value}
        onChangeText={text => {
          setFormData(prevState => ({
            ...prevState,
            [name]: name === 'email' ? text.toLowerCase() : text,
          }));
        }}
        placeholder={placeholder}
        placeholderTextColor="#A0A0A0"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 48,
    backgroundColor: '#333333',
    borderRadius: 4,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#FFFFFF',
    width: '100%',
  },
});

export default Input;
