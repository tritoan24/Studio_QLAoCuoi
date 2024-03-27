import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import InputSearch from './InputSearch';

const CustomHeader = ({title, messenger,hint}) => {
  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: 15,
          marginTop: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={{color: 'black', fontFamily: 'TNBold', fontSize: 45}}>
            {title}
          </Text>
          <Text
            style={{
              fontFamily: 'NSRegular',
              bottom: 10,
              left: 5,
              fontSize: 13,
            }}>
            {messenger}
          </Text>
        </View>

        <Image
          style={{width: 50, height: 50, top: 3}}
          source={require('../assets/image/logo3.png')}
        />
      </View>
      <InputSearch
        hint={hint}
        icon={require('../assets/image/search.png')}
      />
    </SafeAreaView>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({});
