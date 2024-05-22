import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../Input';
import {scale} from 'react-native-size-matters';
import Button from '../button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from 'react-query';
import Toast from 'react-native-toast-message';

const TextToGestuers = () => {
  const [gestureName, setGestureName] = useState('');
  const {data, error, isLoading, refetch} = useQuery({
    queryKey: ['TEXT_TO_GESTURE'],
    queryFn: () => getData(gestureName),
    cacheTime: 0,
    staleTime: 0,
    enabled: false,
  });
  const getData = async params => {
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
    if (gestureName === '') {
      Alert.alert('Error', 'Please enter gesture name');
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.API_URL}/gestures/text-to-gesture/?title=${params}`,
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      );
      console.log('response ====== : ', response?.data);
      return response?.data;
    } catch (error) {
      console.log('error ====== : ', error.response);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Input
          placeholder={'Gesture Name'}
          style={styles.inputStyle}
          bgLight={true}
          value={gestureName}
          onChange={val => setGestureName(val)}
        />
        <Button
          onClick={() => refetch()}
          text={'Go'}
          style={styles.BtnStyle}
          textStyle={styles.btnTextStyle}
        />
      </View>
      <ScrollView
        style={styles.gesturesContainer}
        contentContainerStyle={{alignItems: 'center'}}>
        {!!data?.results?.length ? (
          data?.results?.map(item => {
            return (
              <View
                key={item?.id}
                style={{
                  width: '100%',
                  height: scale(200),
                  backgroundColor: '#fff',
                  borderRadius: scale(20),
                  marginBottom: scale(20),
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: scale(200),
                    resizeMode: 'contain',
                  }}
                  source={{uri: item?.image}}
                />
              </View>
            );
          })
        ) : (
          <Text style={styles.messageTextStyle}>
            Your Gestures Will Show here...
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default TextToGestuers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007786',
    padding: scale(10),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  inputStyle: {
    flex: 1,
    marginBottom: 0,
  },
  BtnStyle: {
    marginLeft: scale(10),
    width: scale(35),
    height: scale(35),
    marginTop: 0,
  },
  btnTextStyle: {color: '#007786', fontWeight: 'bold', fontSize: scale(16)},
  gesturesContainer: {
    flex: 1,
  },
  messageTextStyle: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '500',
  },
});
