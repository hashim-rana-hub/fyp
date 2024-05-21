import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';

const Input = ({
  placeholder,
  value,
  onChange,
  error,
  bgLight = false,
  readOnly = false,
  style = {},
}) => {
  return (
    <>
      <TextInput
        placeholderTextColor={bgLight ? '#000' : '#fff'}
        style={[styles.input(bgLight), style]}
        placeholder={placeholder}
        onChangeText={onChange}
        value={value}
        readOnly={readOnly}
      />
      {/* {error && <Text>{error}</Text>} */}
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: bgLight => ({
    // backgroundColor: '#fff',
    width: '100%',
    padding: scale(5),
    borderRadius: scale(5),
    marginBottom: scale(15),
    borderWidth: 1,
    borderColor: bgLight ? '#000' : '#fff',
    color: bgLight ? '#000' : '#fff',
    paddingVertical: scale(5),
    paddingHorizontal: scale(10),
  }),
});
