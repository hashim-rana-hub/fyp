import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import React, {useEffect} from 'react';
import {scale} from 'react-native-size-matters';
import GoBack from '../../assets/GoBack';
import {useNavigation} from '@react-navigation/native';
import {useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Lessons = () => {
  const navigation = useNavigation();

  const getLessonsList = async () => {
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.get(
        `${process.env.API_URL}/learnings/list/`,
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

  const {data, error, isLoading} = useQuery(['get-lessons'], getLessonsList);
  const renderItem = ({item}) => (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        borderWidth: scale(1),
        borderRadius: scale(8),
        justifyContent: 'space-between',
        marginHorizontal: 'auto',
        paddingHorizontal: scale(16),
        paddingVertical: scale(8),
        borderColor: '#fff',
        marginBottom: scale(20),
      }}
      onPress={() => navigation.navigate('LessonDetails')}>
      <View
        style={{
          gap: scale(16),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={{uri: item?.gesture_details?.image}}
          style={{
            width: scale(40),
            height: scale(40),
            backgroundColor: '#fff',
            borderRadius: scale(100),
          }}
        />
        <Text style={{color: '#fff'}}>{item?.gesture_details?.title}</Text>
      </View>
      <View style={styles.rotatedArrow}>
        <GoBack />
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    console.log('hello ', data);
  }, []);

  return (
    <View
      style={{
        backgroundColor: '#007786',
        width: '100%',
        height: '100%',
      }}>
      <Text
        style={{
          color: '#fff',
          fontSize: scale(20),
          maxWidth: '100%',
          textAlign: 'center',
          marginVertical: scale(15),
        }}>
        Master the Art of Learning
      </Text>
      <FlatList
        data={data?.results}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{alignItems: 'center'}}
      />
      {/* <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          width: '90%',
          borderWidth: scale(1),
          borderRadius: scale(8),
          justifyContent: 'space-between',
          marginHorizontal: 'auto',
          paddingHorizontal: scale(16),
          paddingVertical: scale(8),
          borderColor: '#fff',
        }}
        onPress={() => navigation.navigate('LessonDetails')}>
        <View
          style={{
            gap: scale(16),
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: scale(40),
              height: scale(40),
              backgroundColor: '#fff',
              borderRadius: scale(100),
            }}
          />
          <Text style={{color: '#fff'}}>Hello Peter</Text>
        </View>
        <View style={styles.rotatedArrow}>
          <GoBack />
        </View>
      </TouchableOpacity> */}
    </View>
  );
};

export default Lessons;

const styles = StyleSheet.create({
  rotatedArrow: {
    transform: [{rotate: '180deg'}],
    // position: 'absolute',
    // right: scale(20),
  },
});
