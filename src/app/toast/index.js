import React from 'react';
import {StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {bgColor, colorCode, fontColor} from '../../stylesheet/color';
import fonts from '../../stylesheet/fonts';

export const showSuccessToast = ({title, message}) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
  });
};

export const showErrorToast = ({title, message}) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
  });
};

export const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={[styles.successToastStyle, bgColor.whiteSecondary]}
      contentContainerStyle={styles.toastContainer}
      text1Style={[styles.text1, fontColor.success]}
      text2Style={styles.text2}
    />
  ),

  error: props => (
    <ErrorToast
      {...props}
      style={[styles.errorToastStyle, bgColor.whiteSecondary]}
      contentContainerStyle={styles.toastContainer}
      text1Style={[styles.text1, fontColor.error]}
      text2Style={styles.text2}
    />
  ),
};

const styles = StyleSheet.create({
  successToastStyle: {
    borderLeftColor: colorCode?.success,
  },
  errorToastStyle: {borderLeftColor: colorCode?.error},
  toastContainer: {
    paddingHorizontal: scale(15),
  },
  text1: {
    fontSize: scale(15),
    fontFamily: fonts.catamaranBold,
    marginBottom: scale(-2),
  },
  text2: {fontSize: scale(13), fontFamily: fonts.catamaranMedium},
});
