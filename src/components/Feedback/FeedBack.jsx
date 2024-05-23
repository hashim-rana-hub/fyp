import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../Input';
import {scale} from 'react-native-size-matters';
import Button from '../button';
import Logo from '../../assets/Logo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const FeedBack = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');

  // Validation function
  const validate = () => {
    if (!name.trim()) {
      Alert.alert('Validation Error', 'Name is required');
      return false;
    }
    if (!email.trim()) {
      Alert.alert('Validation Error', 'Email is required');
      return false;
    }
    // Simple email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Enter a valid email');
      return false;
    }
    if (!comments.trim()) {
      Alert.alert('Validation Error', 'Comments are required');
      return false;
    }
    return true;
  };

  // Handle button click
  const handleSubmit = () => {
    if (validate()) {
      // Handle form submission
      sendFeedback(name, email, comments);
      console.log('Form is valid. Submitting...');
      // You can add your form submission logic here
    }
  };

  const sendFeedback = async (name, email, comments) => {
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.post(
        `${process.env.API_URL}/users/feedback/`,
        {name, email, text: comments},
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      );
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Sucessfully added to learnings',
      });
      console.log('Gesture added successfully:', response.data);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.response?.data?.gesture,
      });
      console.error('Error adding gesture:', error.response);
      throw error;
    }
  };

  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#007786'}}>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <Logo />
        <Input
          placeholder={'Name'}
          style={styles.inputStyle}
          bgLight={true}
          value={name}
          onChange={val => setName(val)}
        />
        <Input
          placeholder={'Email'}
          style={styles.inputStyle}
          bgLight={true}
          value={email}
          onChange={val => setEmail(val.trim())}
        />
        <Input
          multiline={true}
          placeholder={'Comments'}
          style={styles.inputStyle}
          bgLight={true}
          value={comments}
          onChange={val => setComments(val)}
        />
        <Button
          text={'Send'}
          textStyle={styles.btnTextStyle}
          onClick={handleSubmit}
        />
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(10),
    alignItems: 'center',
    paddingBottom: scale(20),
  },
  inputStyle: {},
  btnTextStyle: {
    color: '#007786',
    fontWeight: 'bold',
    fontSize: scale(16),
  },
});
