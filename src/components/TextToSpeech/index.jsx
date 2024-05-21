import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import Tts from 'react-native-tts';
import Button from '../button';
import {scale} from 'react-native-size-matters';

export default function TextToSpeech() {
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007786',
      }}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // alignItems: 'center',
          padding: scale(10),
          paddingBottom: scale(100),
        }}
        data={textArray}
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
              {item.text}
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
