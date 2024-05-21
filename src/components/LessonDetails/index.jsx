import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {scale} from 'react-native-size-matters';
import {Dropdown} from 'react-native-element-dropdown';

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
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>Go Back</Text>
      </TouchableOpacity>
      <View>
        <Text>LessonName</Text>
        <View
          style={{
            width: scale(150),
            height: scale(150),
            backgroundColor: '#fff',
            marginHorizontal: 'auto',
          }}>
          <Image />
        </View>
        <Text>Local: ___</Text>
      </View>
      {/* <Dropdown data={data} onSelect={handleSelect} />
       */}
      {renderLabel()}
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
        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color={isFocus ? 'blue' : 'black'}
        //     name="Safety"
        //     size={20}
        //   />
        // )}
      />
      <TouchableOpacity
        style={{
          width: '50%',
          height: scale(40),
          backgroundColor: '#fff',
          borderRadius: scale(10),
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: scale(30),
          marginHorizontal: 'auto',
        }}>
        <Text>Update</Text>
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
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#fff',
  },
});
