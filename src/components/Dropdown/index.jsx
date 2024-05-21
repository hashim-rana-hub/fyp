import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native';
// import {Button, Icon, Overlay} from 'react-native-elements';

const Dropdown = ({data, onSelect}) => {
  const [visible, setVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleSelect = item => {
    setSelectedItem(item);
    onSelect(item);
    toggleOverlay();
  };

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  button: {
    backgroundColor: '#007bff',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
});

export default Dropdown;
