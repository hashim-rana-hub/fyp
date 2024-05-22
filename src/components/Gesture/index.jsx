import {
  ActivityIndicator,
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
// import {ACCESS_TOKEN} from '../utils/dataHelpers';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Gesture() {
  // const {token} = useContext(AuthContext); // Access the token from the context
  const navigation = useNavigation();

  const getGesturesData = async () => {
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
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
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
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

  return data ? (
    <ScrollView
      style={{flex: 1, backgroundColor: '#007786'}}
      contentContainerStyle={styles.scrollViewStyle}>
      {data?.results?.map(item => (
        <View key={item?.id} style={styles.container}>
          <Image
            style={{
              width: '100%',
              height: scale(200),
              resizeMode: 'contain',
            }}
            source={{uri: item?.image}}
          />
          <Text style={{fontSize: scale(20), color: '#000'}}>
            Gesture : {item?.title}
          </Text>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => addGesture(item?.id)}>
            <Text style={{color: '#fff'}}>Add</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  ) : (
    <View style={styles.loaderViw}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: '#007786',
    alignItems: 'center',
    padding: scale(20),
    paddingBottom: scale(100),
  },
  container: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: scale(10),
    borderRadius: scale(30),
  },
  btnStyle: {
    width: '50%',
    height: scale(40),
    backgroundColor: '#007786',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(30),
    marginTop: scale(10),
    marginBottom: scale(20),
  },
  loaderViw: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007786',
  },
});
