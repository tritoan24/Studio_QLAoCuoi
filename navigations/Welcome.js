import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, { useEffect } from 'react';

const Welcome = ({navigation}) => {

    useEffect(() => {
        
        setTimeout(() => {
            
            navigation.navigate('Login');

        }, 3000);


    }, [])
    


  return (
    <SafeAreaView
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Image
        style={{width: 200, height: 200}}
        source={require('../assets/image/logo3.png')}
      />
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({});
