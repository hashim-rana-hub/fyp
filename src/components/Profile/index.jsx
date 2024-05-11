import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Input from '../Input';
import {scale} from 'react-native-size-matters';
import Button from '../button';
import GoBack from '../../assets/GoBack';

const Profile = () => {
  return (
    <View
      style={{
        height: '100%',
        paddingHorizontal: scale(20),
        position: 'relative',
      }}>
      <Pressable
        style={{
          position: 'absolute',
          left: scale(30),
          top: scale(10),
          zIndex: 33,
          elevation: 33,
          width: scale(24),
          height: scale(24),
        }}>
        <GoBack />
      </Pressable>
      <View
        style={{
          backgroundColor: '#007786',
          paddingTop: scale(40),
          borderRadius: scale(10),
          height: scale(100),
          marginBottom: scale(70),
        }}>
        <Image
          style={{}}
          source={require('../../assets/dummy.png')}
          resizeMode="contain"
        />
      </View>
      <Input placeholder={'Name'} bgLight={true} />
      <Input placeholder={'Email'} bgLight={true} />
      <Input placeholder={'Number'} bgLight={true} />
      <View style={{alignItems: 'center'}}>
        <Button text={'Update'} bgLight={true} />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({});
