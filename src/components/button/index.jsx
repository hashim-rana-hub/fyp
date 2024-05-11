import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';

const Button = ({onClick, text, bgLight}) => {
  return (
    <Pressable style={styles.button} onPress={onClick}>
      <Text style={{color: bgLight ? '#fff' : '#000'}}>{text}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: bgLight => ({
    marginTop: scale(30),
    backgroundColor: !bgLight ? '#007786' : '#fff',
    width: '80%',
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }),
});
