import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {scale} from 'react-native-size-matters';
import {useQuery} from 'react-query';
import axios from 'axios';
// import {AuthContext} from '../../context/AuthContext'; // Import the AuthContext
import {ACCESS_TOKEN} from '../utils/dataHelpers';
import Toast from 'react-native-toast-message';

export default function Gesture() {
  // const {token} = useContext(AuthContext); // Access the token from the context

  const getGesturesData = async () => {
    try {
      const response = await axios.get(
        `${process.env.API_URL}/gestures/list/`,
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching gestures data:', error);
      throw error;
    }
  };
  const {data, error, isLoading} = useQuery(['get-gestures'], getGesturesData);

  const addGesture = async gestureId => {
    try {
      const response = await axios.post(
        `${process.env.API_URL}/learnings/list/`,
        {gesture: gestureId},
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      );
      Toast.show({
        type: 'success',

        text2: 'Sucessfully added to learnings',
      });
      console.log('Gesture added successfully:', response.data);
    } catch (error) {
      console.error('Error adding gesture:', error);
      throw error;
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#007786',
        alignItems: 'center',
        padding: scale(20),
        paddingBottom: scale(100),
      }}>
      {data?.results?.map(item => (
        <View key={item?.id} style={{width: '100%'}}>
          <Text style={{fontSize: scale(20), color: '#fff'}}>
            {item?.title}
          </Text>
          <Image
            style={{
              width: scale(200),
              height: scale(200),
            }}
            source={{uri: item?.image}}
          />
          <TouchableOpacity
            style={{
              width: '100%',
              height: scale(40),
              backgroundColor: '#ededed',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: scale(30),
            }}
            onPress={() => addGesture(item?.id)}>
            <Text>Add</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
