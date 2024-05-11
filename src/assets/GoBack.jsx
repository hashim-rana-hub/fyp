import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Path, Svg} from 'react-native-svg';

const GoBack = () => {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none">
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={4.688}
        d="M12.813 4.375 7.186 10l5.625 5.625"
      />
    </Svg>
  );
};

export default GoBack;

const styles = StyleSheet.create({});
