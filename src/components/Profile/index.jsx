import {Alert, Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../Input';
import {scale} from 'react-native-size-matters';
import Button from '../button';
import GoBack from '../../assets/GoBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WebView from 'react-native-webview';
import {useQuery} from 'react-query';
import axios from 'axios';

const Profile = ({navigation}) => {
  const [currentUrl, setCurrentUrl] = useState(null);

  const links = [
    {title: 'Learn ASL', url: 'https://www.asldeafined.com/'},
    {title: 'Learn PSL', url: 'https://psl.org.pk/'},
  ];
  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure to logout?', [
      {
        text: 'No',
        onPress: () => {},
      },
      {
        text: 'yes',
        onPress: async () => {
          await AsyncStorage.removeItem('accessToken');
          navigation.replace('Auth');
        },
      },
    ]);
  };

  const getProfileData = async () => {
    const ACCESS_TOKEN = await AsyncStorage.getItem('accessToken');
    try {
      const response = await axios.get(
        `${process.env.API_URL}/users/profile/`,
        {
          headers: {
            Authorization: ACCESS_TOKEN,
          },
        },
      );

      return response?.data;
    } catch (error) {}
  };
  const {data, isLoading} = useQuery('profile', getProfileData);

  return (
    <View style={styles.container}>
      {currentUrl ? (
        <View style={styles.webViewContainer}>
          <Pressable
            style={styles.goBackButton}
            onPress={() => setCurrentUrl(null)}>
            <GoBack />
          </Pressable>
          <WebView source={{uri: currentUrl}} style={styles.webView} />
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={require('../../assets/dummy.png')}
              resizeMode="contain"
            />
          </View>
          <Input
            bgLight={true}
            readOnly={true}
            style={styles.input}
            value={data?.full_name}
          />
          <Input
            placeholder={data?.email}
            bgLight={true}
            readOnly={true}
            style={styles.input}
            value={data?.email}
          />

          {links?.map((link, index) => (
            <View key={index} style={styles.linkButtonContainer}>
              <Button
                bgLight={false}
                text={link?.title}
                onClick={() => setCurrentUrl(link?.url)}
              />
            </View>
          ))}
          <View style={styles.updateButtonContainer}>
            <Button
              bgLight={false}
              text={'Feedback'}
              onClick={() => navigation.navigate('Feedback')}
            />
          </View>
          <View style={styles.updateButtonContainer}>
            <Button text={'Logout'} onClick={handleLogout} bgLight={false} />
          </View>
        </>
      )}
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: scale(20),
    position: 'relative',
  },
  webViewContainer: {
    flex: 1,
  },
  goBackButton: {
    position: 'absolute',
    left: scale(20),
    top: scale(10),
    zIndex: 33,
    elevation: 33,
    width: scale(34),
    height: scale(34),
    backgroundColor: '#007786',
    borderRadius: scale(100),
    borderWidth: scale(1),
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#007786',
    paddingTop: scale(40),
    borderRadius: scale(10),
    height: scale(100),
    marginBottom: scale(60),
    marginTop: scale(10),
  },
  image: {},
  updateButtonContainer: {
    alignItems: 'center',
    marginBottom: scale(10),
  },
  linkButtonContainer: {
    alignItems: 'center',
    marginBottom: scale(10),
  },
  webView: {
    flex: 1,
  },
  input: {
    backgroundColor: '#ddd',
    borderColor: '#ccc',
  },
});
