import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import Logo from '../../assets/Logo';
import Button from '../button';
import {scale} from 'react-native-size-matters';
import Input from '../Input';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
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
      <Logo />
      <Input placeholder="enter full name" />

      <Input placeholder="enter email" />
      <Input placeholder="enter password" />
      <Input placeholder="confirm password" />
      <Button text={'Signup'} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: scale(30),
        }}>
        <Text style={{color: '#fff'}}>Don't you have an account. </Text>
        <Pressable onPress={() => navigation.navigate('Login')}>
          <Text style={{color: 'wheat', textDecorationLine: 'underline'}}>
            Login
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
