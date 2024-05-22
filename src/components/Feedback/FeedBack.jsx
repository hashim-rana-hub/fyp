import {
  StyleSheet,
  Text,
  View,
  Keyboard,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import Input from '../Input';
import {scale} from 'react-native-size-matters';
import Button from '../button';
import Logo from '../../assets/Logo';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const FeedBack = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comments, setComments] = useState('');
  return (
    <KeyboardAwareScrollView style={{flex: 1, backgroundColor: '#007786'}}>
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <Logo />
        <Input
          placeholder={'Name'}
          style={styles.inputStyle}
          bgLight={true}
          value={name}
          onChange={val => setName(val)}
        />
        <Input
          placeholder={'Email'}
          style={styles.inputStyle}
          bgLight={true}
          value={email}
          onChange={val => setEmail(val.trim())}
        />
        <Input
          multiline={true}
          placeholder={'Comments'}
          style={styles.inputStyle}
          bgLight={true}
          value={comments}
          onChange={val => setComments(val)}
        />
        <Button
          text={'Send'}
          textStyle={styles.btnTextStyle}
          onClick={() => {}}
        />
      </Pressable>
    </KeyboardAwareScrollView>
  );
};

export default FeedBack;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: scale(10),
    alignItems: 'center',
    paddingBottom: scale(20),
  },
  inputStyle: {},
  btnTextStyle: {
    color: '#007786',
    fontWeight: 'bold',
    fontSize: scale(16),
  },
});
