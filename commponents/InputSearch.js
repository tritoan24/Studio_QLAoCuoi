import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';

const InputSearch = ({hint, onChangeText, icon}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: '#FEFEFE',
          marginHorizontal: 15,
          marginVertical: 15,
          alignItems: 'center',
          paddingHorizontal: 10,
          borderRadius: 8,
          elevation: 5,
          height: 50,
        }}>
        <Image
          style={{width: 25, height: 25, bottom: 2, marginEnd: 10}}
          source={icon}
        />
        <TextInput
          style={{fontFamily: 'NSRegular', flex: 1}}
          placeholder={hint}
          onChangeText={onChangeText}
        />
      </View>
    </>
  );
};

export default InputSearch;

const styles = StyleSheet.create({});
