import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from 'react-native'
import React, {useState} from 'react'
import InputCustom from '../commponents/InputCustom'

const DangKy = ({navigation}) => {

  const [email, setEmail] = useState('');
  // console.log('Login  email:', email);
  const [password, setPassword] = useState('');
  // console.log('Login  password:', password);
  const [rePasseord, setrePasseord] = useState('');

  const [toggole, setToggole] = useState(true);

  // if(password !== rePasseord) {
  //   console.log("Mật khẩu không trùng khớp");
  //   return;
  // }

  // Viet ham dang ky
  const dangKy = () => {
    fetch('http://192.168.1.3:3001/apiUser/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    })
    .then(res => {
      if(res.status === 201) {
        console.log("Đăng ký thành công");
        navigation.navigate('Login');
      } else {
        console.log("Đăng ký thất bại");
      }
    })
    .catch(error => console.error("Lỗi: ", error));
  }
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'android' ? 'padding' : 'height'}
    >
      <ScrollView>
        {/* View hien thi anh o dau */}
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
          }}>
              <View style={{height: 1, width: 130, backgroundColor: '#BDBDBD'}} />
          <Image
            style={{width: 80, height: 80, marginStart: 5, marginEnd: 5}}
            source={require('../assets/image/logo3.png')}
          />
          <View style={{height: 1, width: 130, backgroundColor: '#BDBDBD'}} />
        </View>

        {/* View hien thi chu */}
        <View style={{marginHorizontal: 20, marginTop: 20}}>
        <Text
            style={{
              color: 'black',
              fontFamily: 'MBold',
              fontSize: 30,
            }}>
            Chào mừng 👋
          </Text>
          <Text
            style={{
              color: '#909090',
              fontFamily: 'MRegular',
              fontSize: 13,
            }}>
            Tạo tài khoản để bắt đầu
          </Text>    
        </View>

        {/* Phan noi dung nhap */}
        <View
          style={{
            padding: 10,
            marginHorizontal: 15,
            marginVertical: 15,
            backgroundColor: '#F9F9F9',
            borderRadius: 5,
            elevation: 3,
          }}>
          <View style={{marginTop: 10}}></View>
          {/* O nhap Email */}
          <InputCustom title="Email" onChangeText={txt => setEmail(txt)} icon={null}/>
          {/* O nhap pass */}
          <InputCustom
            title="Password"
            onChangeText={txt => setPassword(txt)}
            icon={
              toggole == true
                ? require('../assets/image/show.png')
                : require('../assets/image/hide.png')
            }
            enTry={toggole}
            onChangeToggle={() =>
              toggole == true ? setToggole(false) : setToggole(true)
            }
          />
          {/* O nhap lai Pass */}
          <InputCustom
            title="Re-Password"
            onChangeText={txt => setPassword(txt)}
            icon={
              toggole == true
                ? require('../assets/image/show.png')
                : require('../assets/image/hide.png')
            }
            enTry={toggole}
            onChangeToggle={() =>
              toggole == true ? setToggole(false) : setToggole(true)
            }
          />
          
          {/* Nut dang nhap */}
          <TouchableOpacity
            onPress={dangKy}
            style={{
              backgroundColor: '#242424',
              height: 50,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 10,
              marginVertical: 20,
            }}>
            <Text style={{color: 'white', fontFamily: 'NSSBold'}}>
              Đăng ký
            </Text>
          </TouchableOpacity>
          {/* Dang nhap */}
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // alignItems: 'center'
          }}>
            <Text style={{
              color: '#909090',
              fontFamily: 'NSSBold',
              fontSize: 15,
              textAlign: 'center',
              marginBottom: 30,
              // fontWeight: '300',
              marginEnd: 4
            }} >
              Bạn có sẵn tài khoản chưa?
            </Text>
          <Pressable onPress={()=> navigation.navigate('Login')}>
          <Text
            style={{
              color: '#242424',
              fontFamily: 'NSSBold',
              fontSize: 15,
              textAlign: 'center',
              marginBottom: 30,
            }}>
            Đăng nhập
          </Text>
          </Pressable>
          </View>
          
          
        </View>
      </ScrollView>

    </KeyboardAvoidingView>
  )
}

export default DangKy

const styles = StyleSheet.create({})