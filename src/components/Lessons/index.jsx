import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {scale} from 'react-native-size-matters';
import GoBack from '../../assets/GoBack';
import {useNavigation} from '@react-navigation/native';

const Lessons = () => {
  const navigation = useNavigation();
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
          <Text>Hello Peter</Text>
        </View>
        <View style={styles.rotatedArrow}>
          <GoBack />
        </View>
      </TouchableOpacity>
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
