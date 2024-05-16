import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {getEmergencyNumbers} from '../utils/dataHelpers';
import {scale} from 'react-native-size-matters';

export default function Emergency() {
  return (
    <ScrollView
      contentContainerStyle={{paddingBottom: scale(50)}}
      style={{
        backgroundColor: '#007786',
        padding: scale(10),
      }}>
      {getEmergencyNumbers()?.map(item => (
        <View
          key={item?.service}
          style={{
            borderWidth: scale(1),
            borderColor: '#fff',
            marginBottom: scale(20),
            padding: scale(10),
            borderRadius: scale(10),
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{color: '#fff', fontSize: scale(18)}}>
              {item?.service}
            </Text>
            <Text
              style={{color: '#000', fontSize: scale(18), fontWeight: '700'}}>
              {item?.number}
            </Text>
          </View>
          <Text style={{color: '#fff'}}>{item?.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
