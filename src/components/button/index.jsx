import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';

const Button = ({
  onClick,
  text,
  bgLight = true,
  isLoading,
  style = {},
  textStyle = {},
}) => {
  return (
    <Pressable
      style={[styles.button(bgLight), style]}
      onPress={onClick}
      disabled={isLoading}>
      {!isLoading ? (
        <Text style={[{color: !bgLight ? '#fff' : '#000'}, textStyle]}>
          {text}
        </Text>
      ) : (
        <ActivityIndicator size={'small'} />
      )}
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: bgLight => ({
    marginTop: scale(10),
    backgroundColor: !bgLight ? '#007786' : '#fff',
    width: '80%',
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }),
});
