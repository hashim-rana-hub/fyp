import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import {useQuery} from 'react-query';
import axios from 'axios';

export default function Gesture() {
  const getGesturesData = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/gestures/list/`);
      return response.data;
    } catch (error) {
      console.error('Error fetching gestures data:', error);
      throw error; // Optional: re-throw the error if you want it to be handled elsewhere
    }
  };
  const {data, error, isLoading} = useQuery(['get-gestures'], getGesturesData);

  console.log('data ==== ', data);
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#007786',
        alignItems: 'center',
        padding: scale(20),
      }}>
      <Text>Gesture</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
