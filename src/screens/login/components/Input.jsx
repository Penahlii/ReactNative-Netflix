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
    marginBottom: 12,
  },
  input: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#DDD',
  },
});

export default Input;
