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
import {useNavigation} from '@react-navigation/native';

export default function Gesture() {
  // const {token} = useContext(AuthContext); // Access the token from the context
  const navigation = useNavigation();

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
      console.error('Error fetching gestures data:', error?.response);
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
    <ScrollView
      contentContainerStyle={{
        backgroundColor: '#007786',
        alignItems: 'center',
        padding: scale(20),
        paddingBottom: scale(100),
        flex: 1,
      }}>
      <View style={{width: '100%', alignItems: 'flex-start'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
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
