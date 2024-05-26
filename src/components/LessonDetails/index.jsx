import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import GoBack from '../../assets/GoBack';
import {useMutation, useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LessonDetails = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const route = useRoute();
  const {id} = route.params;

  const getLessonDetails = async () => {
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.get(
        `${process.env.API_URL}/learnings/${id}/`,
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      );
      console.log('details are ==== ', response);
      return response.data;
    } catch (error) {
      console.error('Error fetching gestures data:', error?.response);
      throw error;
    }
  };
  const getLanguages = async () => {
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.get(
        `${process.env.API_URL}/core/languages/`,
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

  const {data: details, isLoading} = useQuery(
    ['get-lessons-details'],
    getLessonDetails,
  );

  const {data: language, isLoading: languageLoader} = useQuery(
    ['get-languages'],
    getLanguages,
  );

  const performLocalTranslation = async langId => {
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.patch(
        `${process.env.API_URL}/learnings/${langId}`,
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      );
      getLessonDetails();
      console.log('respoonse ===== ', response);
      return response.data;
    } catch (error) {
      console.log('error from upate api ', error);
    }
  };

  const performDeleteLocalTranslation = async langId => {
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.delete(
        `${process.env.API_URL}/learnings/${langId}`,
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      );
      getLessonDetails();
      console.log('respoonse ===== ', response);
      return response.data;
    } catch (error) {
      console.log('error from upate api ', error);
    }
  };

  const lang = language?.results?.map(item => ({
    label: item?.name,
    value: item?.id,
  }));

  const performPatchReq = useMutation(performLocalTranslation);
  const performDeleteReq = useMutation(performDeleteLocalTranslation);

  return (
    <View
      style={{
        backgroundColor: '#007786',
        width: '100%',
        height: '100%',
        paddingTop: scale(10),
        paddingHorizontal: scale(16),
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <GoBack />
      </TouchableOpacity>
      <View>
        <Text
          style={{
            marginVertical: scale(10),
            fontSize: scale(18),
            color: '#fff',
          }}>
          {details?.gesture_details?.title}
        </Text>
        <View
          style={{
            width: scale(160),
            height: scale(160),
            backgroundColor: '#fff',
            marginHorizontal: 'auto',
            borderRadius: scale(100),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              width: '90%',
              height: '90%',
              borderRadius: scale(100),
            }}
            source={{uri: details?.gesture_details?.image}}
            resizeMode="contain"
          />
        </View>
        <Text
          style={{
            marginVertical: scale(10),
            fontSize: scale(14),
            color: '#fff',
          }}>
          Local: {details?.local_translation}
        </Text>
      </View>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={lang || []}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder="Select language"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
      <TouchableOpacity
        style={{
          width: '30%',
          height: scale(30),
          backgroundColor: '#fff',
          borderRadius: scale(10),
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: scale(30),
          marginHorizontal: 'auto',
        }}
        onPress={() => performPatchReq.mutate(value)}>
        <Text>Update</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '30%',
          height: scale(30),
          backgroundColor: '#fff',
          borderRadius: scale(10),
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: scale(30),
          marginHorizontal: 'auto',
        }}
        onPress={() => performDeleteReq.mutate(value)}>
        <Text
          style={{
            color: 'red',
          }}>
          Delete
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LessonDetails;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    borderColor: 'white',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
    marginHorizontal: scale(20),
    width: '70%',
    marginHorizontal: 'auto',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#fff',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
