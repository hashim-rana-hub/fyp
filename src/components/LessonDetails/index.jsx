import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';
import GoBack from '../../assets/GoBack';

const LessonDetails = () => {
  const navigation = useNavigation();
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const data = [
    {label: 'Item 1', value: '1'},
    {label: 'Item 2', value: '2'},
    {label: 'Item 3', value: '3'},
  ];
  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: 'blue'}]}>
          Dropdown label
        </Text>
      );
    }
    return null;
  };

  const handleSelect = item => {
    console.log('Selected item:', item);
  };

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
          LessonName
        </Text>
        <View
          style={{
            width: scale(150),
            height: scale(150),
            backgroundColor: '#fff',
            marginHorizontal: 'auto',
          }}>
          <Image />
        </View>
        <Text
          style={{
            marginVertical: scale(10),
            fontSize: scale(14),
            color: '#fff',
          }}>
          Local: ___
        </Text>
      </View>
      {/* {renderLabel()} */}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select item' : '...'}
        searchPlaceholder="Search..."
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
        }}>
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
        }}>
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