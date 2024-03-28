import { Button, StyleSheet, Text, View, Image, ImageBackground, Alert, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import InputCustom from '../InputCustom';
import CustomButton from '../CustomButton';

const AddNhanVien = ({ navigation }) => {
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [repeatpassword, setrepeatpassword] = useState('');
  const signupData = () => {
    if (!email || !password || !repeatpassword) {
      Alert.alert('Missing Information', 'Please fill in all fields');
      return;
    }

    // Kiểm tra tính hợp lệ của email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // Kiểm tra tính hợp lệ của mật khẩu
    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long');
      return;
    }

    // Kiểm tra mật khẩu và mật khẩu lặp lại có khớp nhau không
    if (password !== repeatpassword) {
      Alert.alert('Passwords Do Not Match', 'Please make sure passwords match');
      return;
    }

    navigation.navigate('AddContunie', {
      email: email,
      password: password,
      repeatpassword: repeatpassword
    })
  }

  const back=()=>{
    navigation.goBack();
  }


  return (
    <View style={styles.container}>

      <Text style={styles.text}>Add Account</Text>

      <View
        style={{
          padding: 10,
          marginHorizontal: 15,
          marginVertical: 15,
          backgroundColor: '#F9F9F9',
          borderRadius: 5,
          elevation: 3,
          width: 300,
        }}>
        <InputCustom
          title="Email" onChangeText={txt => setemail(txt)} icon={null}
        />
        <View style={{ marginTop: 10 }}></View>
        <InputCustom title="Password" onChangeText={txt => setpassword(txt)} icon={null} />
        <View style={{ marginTop: 10 }}></View>
        <InputCustom title="Repeat Password" onChangeText={txt => setrepeatpassword(txt)} icon={null} />
      </View>
      <View style={{ height: 30 }} />
      <View style = {{flexDirection:'row',width:300,justifyContent:'space-around'}}>
      <TouchableOpacity onPress={back} >
        <View style={{ backgroundColor: '#000000', padding: 10, borderRadius: 10, width: 120, alignItems: 'center' ,elevation:5}}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Back</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={signupData} >
        <View style={{ backgroundColor: '#000000', padding: 10, borderRadius: 10, width: 120, alignItems: 'center' ,elevation:5}}>
          <Text style={{ color: 'white', fontWeight: 'bold' }}>Next</Text>
        </View>
      </TouchableOpacity>
      </View>

      
    </View>
  )
}

export default AddNhanVien

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  text: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    marginBottom: 10,
    alignSelf: 'flex-start',
    marginLeft: 22,
    fontFamily: 'italic',
    fontSize: 16,
  },




})