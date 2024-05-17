import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Logo from '../../assets/Logo';
import Button from '../button';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from 'react-query';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const otpInput = useRef(null);

  const {mutate} = useMutation(async data => {
    const response = await axios.post(
      `${process.env.API_URL}/users/verify-otp/`,
      data,
    );
    return response.data;
  });

  const handleSubmit = () => {
    const data = {
      email: email,
      otp: parseInt(otpInput?.current?.state?.otpText?.join(''), 10),
    };

    mutate(data, {
      onSuccess: async response => {
        if (response?.accessToken) {
          await AsyncStorage.setItem(
            'accessToken',
            `Bearer ${response.accessToken}`,
          );
        }
        navigation.navigate('Main');
      },
      onError: error => {
        console.error('Mutation error:', error);
      },
    });
  };

  useEffect(() => {
    const getEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error getting email from AsyncStorage:', error);
      }
    };

    getEmail();
  }, []);

  return (
    <View style={styles.container}>
      <Logo />
      <OTPTextInput ref={otpInput} />
      <View style={styles.buttonContainer}>
        <Button text="Get Started" onClick={handleSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#007786',
    alignItems: 'center',
    padding: scale(20),
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: scale(20),
  },
});

export default SignUp;
