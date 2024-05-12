import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useRef} from 'react';
import Logo from '../../assets/Logo';
import Button from '../button';
import {scale} from 'react-native-size-matters';
import Input from '../Input';
import {useNavigation} from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';

const SignUp = () => {
  const navigation = useNavigation();

  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue('1234');
  };
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#007786',
        alignItems: 'center',
        padding: scale(20),
      }}>
      <Logo />
      {/* <Input placeholder="enter full name" /> */}
      <OTPTextInput ref={e => (otpInput = e)} />
      {/* <Input placeholder="enter email" />
      <Input placeholder="enter password" />
      <Input placeholder="confirm password" /> */}
      <View style={{width: '100%', alignItems: 'center', marginTop: scale(20)}}>
        <Button
          text={'Get Started'}
          onClick={() => navigation.navigate('Main')}
        />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
