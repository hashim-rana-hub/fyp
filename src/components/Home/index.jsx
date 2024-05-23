import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {scale} from 'react-native-size-matters';
import Button from '../button';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/Logo';

const Home = () => {
  const navigation = useNavigation();
  useEffect(() => {
    AsyncStorage.getItem('accessToken');
  }, []);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#007786',
        justifyContent: 'center',
        alignItems: 'center',
        padding: scale(20),
      }}>
      <Logo />
      <View style={{width: '100%', alignItems: 'center', gap: scale(15)}}>
        <Button
          text={'Gestures'}
          onClick={() => navigation.navigate('Gesture')}
        />
        <Button
          text={'Text to Gestures'}
          onClick={() => navigation.navigate('Text To Gesture')}
        />
        <Button
          text={'Text to speech'}
          onClick={() => navigation.navigate('Text To Speech')}
        />
        <Button
          text={'Emergency'}
          onClick={() => navigation.navigate('Emergency')}
        />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
