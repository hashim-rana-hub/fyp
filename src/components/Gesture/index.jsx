import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {scale} from 'react-native-size-matters';
import {useInfiniteQuery, useQuery} from 'react-query';
import axios from 'axios';
// import {AuthContext} from '../../context/AuthContext'; // Import the AuthContext
// import {ACCESS_TOKEN} from '../utils/dataHelpers';
import Toast from 'react-native-toast-message';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getNextPage} from '../../Constants/constants';

export default function Gesture() {
  // const {token} = useContext(AuthContext); // Access the token from the context
  const navigation = useNavigation();
  const [apiData, setApiData] = useState([]);

  const getGesturesData = async params => {
    console.log('params ======= : ', params);
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
    return await axios.get(
      `${process.env.API_URL}/gestures/list/?page=${params.page}`,
      {
        headers: {
          Authorization: ACCESS_TOKEN,
        },
      },
    );
  };
  const {
    data,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ['get-gestures'],
    queryFn: ({pageParam = 1}) => getGesturesData({page: pageParam}),
    getNextPageParam: getNextPage,
    cacheTime: 0,
    staleTime: 0,
  });

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
  useEffect(() => {
    let newData = data?.pages?.flatMap(page => page.data?.results);
    setApiData(newData);
  }, [data]);

  console.log('has ======= : ', hasNextPage);
  // console.log('apiData ======= : ', apiData);
  return !!apiData?.length ? (
    <FlatList
      style={{flex: 1, backgroundColor: '#007786'}}
      contentContainerStyle={styles.scrollViewStyle}
      onEndReachedThreshold={0.5}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      }}
      data={apiData}
      renderItem={({item}) => {
        return (
          <View key={item?.id} style={styles.container}>
            <Image
              style={{
                width: '100%',
                height: scale(150),
                resizeMode: 'contain',
                borderRadius: 20,
                marginTop: scale(10),
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
        );
      }}
      keyExtractor={item => item?.id}
      ListFooterComponent={() =>
        isFetchingNextPage && <ActivityIndicator size={'small'} />
      }
    />
  ) : (
    <View style={styles.loaderViw}>
      <ActivityIndicator size={'large'} color={'#fff'} />
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewStyle: {
    backgroundColor: '#007786',
    // alignItems: 'center',
    padding: scale(20),
    // paddingBottom: scale(100),
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
