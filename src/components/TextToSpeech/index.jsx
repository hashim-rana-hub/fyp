import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Tts from 'react-native-tts';
import Button from '../button';
import {scale} from 'react-native-size-matters';
import Input from '../Input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function TextToSpeech() {
  const [inputValue, setInputValue] = useState('');
  const [isAudioGenerated, setIsAudioGenerated] = useState(false);
  const [generatedAudio, setGeneratedAudio] = useState(null);
  const textArray = [
    {id: '1', text: 'Hello, this is the first text to speech example.'},
    {id: '2', text: 'Here is the second piece of text to read aloud.'},
    {
      id: '3',
      text: 'This is the third example for text to speech functionality.',
    },
    {id: '4', text: 'Hello, this is the first text to speech example.'},
    {id: '5', text: 'Here is the second piece of text to read aloud.'},
    {
      id: '6',
      text: 'This is the third example for text to speech functionality.',
    },
    {id: '7', text: 'Hello, this is the first text to speech example.'},
    {id: '8', text: 'Here is the second piece of text to read aloud.'},
    {
      id: '9',
      text: 'This is the third example for text to speech functionality.',
    },
  ];

  const speak = text => {
    Tts.stop();
    Tts.speak(text);
  };

  const handleGenerateAudioClick = async () => {
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.post(
        `${process.env.API_URL}/gestures/audio/generate/`,
        {
          text: inputValue,
        },
        {
          headers: {
            Authorization: ACCESS_TOKEN,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Audio generated successfully:', response);
      setInputValue('');
      // setIsAudioGenerated(pre => !pre);
      if (response?.status === 201) handleGetGeneratedAudio();
      // Handle successful response
    } catch (error) {
      console.error('Error generating audio:', error);
      // Handle error
    }
  };

  const handleGetGeneratedAudio = async () => {
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.get(
        `${process.env.API_URL}/gestures/audio/generate/`,
        {
          headers: {
            Authorization: ACCESS_TOKEN,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('Audio generated successfully n   r4esults:', response?.data);
      if (response) setGeneratedAudio(response?.data?.results);
      // Handle successful response
    } catch (error) {
      console.error('Error generating audio:', error);
      // Handle error
    }
  };

  console.log('------- ', generatedAudio);

  // useEffect(() => {
  //   handleGetGeneratedAudio();
  // }, [isAudioGenerated]);

  useEffect(() => {
    // Initialize TTS and set default options
    Tts.getInitStatus()
      .then(() => {
        Tts.setDefaultRate(0.5);
        Tts.setDefaultPitch(1.0);
        Tts.setDefaultLanguage('en-US');
      })
      .catch(err => {
        if (err.code === 'no_engine') {
          Tts.requestInstallEngine();
        }
      });

    const handleStart = event => console.log('TTS start', event);
    const handleFinish = event => console.log('TTS finish', event);
    const handleCancel = event => console.log('TTS cancel', event);

    // Add event listeners
    Tts.addEventListener('tts-start', handleStart);
    Tts.addEventListener('tts-finish', handleFinish);
    Tts.addEventListener('tts-cancel', handleCancel);

    // Clean up the listeners on unmount
    // return () => {
    //   Tts.removeEventListener('tts-start', handleStart);
    //   Tts.removeEventListener('tts-finish', handleFinish);
    //   Tts.removeEventListener('tts-cancel', handleCancel);
    // };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007786',
        paddingTop: scale(20),
        paddingHorizontal: scale(16),
      }}>
      <Input
        placeholder="Enter Your Text Here"
        value={inputValue}
        onChange={val => setInputValue(val)}
      />
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          width: scale(150),
          height: scale(25),
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: scale(8),
          marginBottom: scale(20),
        }}
        onPress={handleGenerateAudioClick}>
        <Text style={{color: '#000'}}>Generate Audio</Text>
      </TouchableOpacity>
      {/* {isAudioGenerated ? ( */}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        contentContainerStyle={{
          padding: scale(10),
          paddingBottom: scale(100),
        }}
        data={generatedAudio}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={{
              marginBottom: scale(30),
              width: '100%',
              height: scale(100),
              borderWidth: 1,
              borderRadius: scale(10),
              borderColor: '#ededed',
              padding: scale(5),
              paddingHorizontal: scale(20),
            }}>
            <Text style={{color: '#fff', textAlign: 'justify'}}>
              {item?.text}
              {console.log(item)}
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#cdcdcd',
                width: '50%',
                marginHorizontal: 'auto',
                marginTop: scale(10),
                alignItems: 'center',
              }}
              onPress={() => speak(item.text)}>
              <Text>Tap To Listen</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
