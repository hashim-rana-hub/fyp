import {StyleSheet, View} from 'react-native';
import React from 'react';
import Logo from '../../assets/Logo';
import Button from '../button';
import {scale} from 'react-native-size-matters';
import Input from '../Input';
import {useNavigation} from '@react-navigation/native';

const Login = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#007786',
        alignItems: 'center',
        padding: scale(20),
      }}>
      <View
        style={{
          width: '100%',
          height: '70%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Logo />
        <Input placeholder="enter your email" />
        <Button
          text={'Generate OTP'}
          bgLight={false}
          onClick={() => navigation.navigate('SignUp')}
        />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
