import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import Logo from '../../assets/Logo';

const Support = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/support.png')}
        style={styles.picStyle}
      />
      <Text style={styles.messageTextStyle}>For any Queries or any help</Text>
      <Text style={styles.contentStyle}>Contact at: Admin@echohands.com </Text>
    </View>
  );
};

export default Support;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007786',
    padding: scale(10),
    alignItems: 'center',
  },
  messageTextStyle: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '500',
    marginVertical: scale(20),
    textAlign: 'center',
  },
  contentStyle: {
    color: '#fff',
    fontSize: scale(16),
    fontWeight: '300',
    textAlign: 'center',
  },
  picStyle: {
    height: scale(100),
    width: scale(100),
    resizeMode: 'cover',
    borderRadius: scale(50),
    marginTop: scale(20),
  },
});
