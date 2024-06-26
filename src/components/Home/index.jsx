import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {scale} from 'react-native-size-matters';
import Button from '../button';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
      <Text>Home</Text>
      <View style={{width: '100%', alignItems: 'center', gap: scale(15)}}>
        <Button
          text={'Gesture'}
          onClick={() => navigation.navigate('Gesture')}
        />
        <Button
          text={'Text to speech'}
          onClick={() => navigation.navigate('TextToSpeech')}
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
