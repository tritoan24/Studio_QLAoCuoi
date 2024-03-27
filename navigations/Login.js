import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import InputCustom from '../commponents/InputCustom';
import { useNavigation } from '@react-navigation/native';

const Login = ({navigation}) => {
  // const navigation = useNavigation();

  const [email, setEmail] = useState('');
  // console.log('Login  email:', email);
  const [password, setPassword] = useState('');
  // console.log('Login  password:', password);

  const [toggole, setToggole] = useState(true);
  // viet ham chuyen sang man hình dang ky
  
  const logSign = () => {
    navigation.navigate('DangKy');
  }
// Hàm đăng nhập
  const login = () => {
    fetch('http://192.168.1.3:3001/apiUser/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(res => {
        if (res.status == 200) {
          ToastAndroid.show('Login thành công', ToastAndroid.SHORT);
          navigation.navigate('Main');
        }
        if (res.status == 405) {
          ToastAndroid.show('Sai mật khẩu', ToastAndroid.SHORT);
        }
        if (res.status == 404) {
          ToastAndroid.show('Tài khoản không tồn tại', ToastAndroid.SHORT);
        }
        if (res.status == 500) {
          ToastAndroid.show('Erro Server', ToastAndroid.SHORT);
        }
      })
      .catch(e => console.log(e));
  };
// Return tổng
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == 'android' ? 'padding' : 'height'}
      style={{}}>
      <ScrollView>
        {/* Phan anh */}
        <View
          style={{
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
          {/* Phan chu tieu de */}
        <View style={{marginHorizontal: 20, marginTop: 20}}>
          <Text
            style={{
              color: '#909090',
              fontFamily: 'MRegular',
              fontSize: 30,
            }}>
            Xin chào !
          </Text>
          <Text
            style={{
              color: 'black',
              fontFamily: 'MBold',
              fontSize: 24,
            }}>
            Chào mừng bạn trở lại 👋
          </Text>
        </View>

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
          <InputCustom title="Email" onChangeText={txt => setEmail(txt)} icon={null}/>
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
          {/* Qurn mat khau */}
          <Text
            style={{
              fontFamily: 'NSSBold',
              fontSize: 16,
              textAlign: 'center',
              color: '#242424',
            }}>
            Quên mật khẩu
          </Text>
          {/* Nut dang nhap */}
          <TouchableOpacity
            onPress={login}
            style={{
              backgroundColor: '#242424',
              height: 50,
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 40,
              marginVertical: 20,
            }}>
            <Text style={{color: 'white', fontFamily: 'NSSBold'}}>
              Đăng nhập
            </Text>
          </TouchableOpacity>
          {/* Dang ky */}
          <Pressable onPress={logSign}>
          <Text
            style={{
              color: '#242424',
              fontFamily: 'NSSBold',
              fontSize: 17,
              textAlign: 'center',
              marginBottom: 30,
            }}>
            Đăng ký
          </Text>
          </Pressable>
          
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({});
