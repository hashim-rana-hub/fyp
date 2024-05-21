import {Image, Pressable, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Input from '../Input';
import {scale} from 'react-native-size-matters';
import Button from '../button';
import GoBack from '../../assets/GoBack';
import WebView from 'react-native-webview';

const Profile = () => {
  const [currentUrl, setCurrentUrl] = useState(null);

  const links = [
    {title: 'Learn ASL', url: 'https://www.asldeafined.com/'},
    {title: 'Learn PSL', url: 'https://psl.org.pk/'},
  ];

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
          <Pressable style={styles.goBackButton}>
            <GoBack />
          </Pressable>
          <View style={styles.header}>
            <Image
              style={styles.image}
              source={require('../../assets/dummy.png')}
              resizeMode="contain"
            />
          </View>
          <Input placeholder={'Name'} bgLight={true} />
          <Input placeholder={'Email'} bgLight={true} />
          <Input placeholder={'Number'} bgLight={true} />
          <View style={styles.updateButtonContainer}>
            <Button text={'Update'} />
          </View>
          {links?.map((link, index) => (
            <View key={index} style={styles.linkButtonContainer}>
              <Button
                text={link?.title}
                onClick={() => setCurrentUrl(link?.url)}
              />
            </View>
          ))}
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
    marginBottom: scale(70),
  },
  image: {},
  updateButtonContainer: {
    alignItems: 'center',
    marginBottom: scale(10),
  },
  linkButtonContainer: {
    alignItems: 'center',
    marginVertical: scale(10),
  },
  webView: {
    flex: 1,
  },
});
