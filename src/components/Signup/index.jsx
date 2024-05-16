import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Logo from '../../assets/Logo';
import Button from '../button';
import {scale} from 'react-native-size-matters';
import Input from '../Input';
import {useNavigation} from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation} from 'react-query';
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.current.clear();
  };

  const setText = () => {
    otpInput.current.setValue('1234');
  };

  const {mutate} = useMutation(async data => {
    console.log(data);
    try {
      const response = await axios.post(
        `${process.env.API_URL}/verify-otp`,
        data,
      );
      return response.data;
    } catch (error) {
      console.error('Error:', error);
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  });

  const handleSubmit = () => {
    // Example data to send in the POST request
    const data = {
      email: email,
      otp: parseInt(otpInput?.current?.state?.otpText?.join(''), 10),
      // Other data you want to send
    };

    // Step 3: Call the mutation function with the data
    mutate(data, {
      onSuccess: () => {
        // Handle success
        navigation.navigate('Main');
      },
      onError: error => {
        // Handle error
        console.error('Mutation error:', error);
      },
    });
  };

  useEffect(() => {
    const getEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedEmail !== null) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.log('Error getting email from AsyncStorage:', error);
      }
    };

    getEmail();
  }, []);

  console.log(
    'emil is ',
    email,
    'otp ',
    'otp',
    parseInt(otpInput?.current?.state?.otpText?.join(''), 10),
  );

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
      {/* <OTPTextInput ref={e => (otpInput = e)} /> */}
      <OTPTextInput ref={otpInput} />

      <View style={{width: '100%', alignItems: 'center', marginTop: scale(20)}}>
        <Button
          text={'Get Started'}
          // onClick={() => navigation.navigate('Main')}
          onClick={handleSubmit}
        />
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({});
