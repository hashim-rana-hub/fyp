import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Logo from '../../assets/Logo';
import Button from '../button';
import {scale} from 'react-native-size-matters';
import Input from '../Input';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useMutation} from 'react-query';
import {Form, useFormik} from 'formik';
import * as Yup from 'yup';
import {err} from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const postUserData = async data => {
    try {
      setIsLoading(true);
      const response = await axios.post(
        `${process.env.API_URL}/users/create-otp/`,
        data,
      );
      if (response) {
        setIsLoading(false);
        await AsyncStorage.setItem('email', data?.email);
        navigation.navigate('SignUp');
        return response.data;
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      throw new Error(error.response.data.message || 'Something went wrong');
    }
  };
  const formik = useFormik({
    initialValues: {email: ''},
    validationSchema: Yup.object().shape({
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    onSubmit: postUserData,
    validateOnChange: false,
  });

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
        <Input
          placeholder="enter your email"
          onChange={formik.handleChange('email')}
          value={formik.values.email}
          error={formik.errors.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <Text style={styles.error}>{formik.errors.email}</Text>
        ) : null}
        <Button
          isLoading={isLoading}
          text={'Generate OTP'}
          bgLight={false}
          onClick={formik.handleSubmit}
          // onClick={() => navigation.navigate('SignUp')}
        />
        {/* </Form> */}
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    width: '100%',
    marginTop: -scale(10),
    opacity: 0.7,
    marginBottom: scale(20),
  },
});
