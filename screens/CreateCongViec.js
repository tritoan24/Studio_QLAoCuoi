import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomHeader from '../commponents/CustomHeader';
import InputCustom from '../commponents/InputCustom';
import {Dropdown} from 'react-native-element-dropdown';
import {apiGetNhanVien, apiPostCongViec} from '../config/UriAPi';
import {CallApiCv} from '../navigations/CongViec';


const CreateCongViec = ({navigation}) => {
  const [dataNhanVien, setDataNhanVien] = useState([]);
  const [nameNv, setNameNv] = useState('');
  const [name, setName] = useState('');
  const [stdate, setStdate] = useState('');
  const [endate, setEndate] = useState('');
  const [discriptions, setDiscriptions] = useState('');

  const CallApiUser = async () => {
    try {
      const res = await fetch(apiGetNhanVien);
      const data = await res.json();
      setDataNhanVien(data);
    } catch (error) {
      console.log('CallApiUser  error:', error);
    }
  };
  useEffect(() => {
    CallApiUser();
  }, []);

  const CreateJob = () => {
    fetch(apiPostCongViec, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        stdate: stdate,
        endate: endate,
        nameNv: nameNv,
        status: 0,
        discriptions: discriptions,
      }),
    })
      .then(res => {
        if (res.status == 200) {
          ToastAndroid.show('Thêm thành công', ToastAndroid.SHORT);
          navigation.goBack();
        }
      })
      .catch(e => console.log(e));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          style={{
            width: 25,
            height: 25,
            marginHorizontal: 15,
            marginTop: 10,
          }}
          source={require('../assets/image/back.png')}
        />
      </TouchableOpacity>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <CustomHeader
          title={'Thêm công việc cho studio'}
          messenger={'Xin mời thêm công việc cho studio'}
        />
        <Text
          style={{
            color: '#242424',
            fontFamily: 'NSSBold',
            fontSize: 17,
            marginTop: 10,
            marginHorizontal: 10,
            marginVertical: 5,
          }}>
          Thông tin công việc
        </Text>

        <View
          style={{
            backgroundColor: '#FEFEFE',
            paddingHorizontal: 15,
            paddingVertical: 15,
            marginHorizontal: 15,
            borderRadius: 8,
            elevation: 5,
            paddingBottom: 40,
          }}>
          <InputCustom
            title={'Tên công việc'}
            onChangeText={txt => setName(txt)}
          />
          <InputCustom
            title={'Ngày bắt đầu'}
            onChangeText={txt => setStdate(txt)}
          />
          <InputCustom
            title={'Ngày kết thúc'}
            onChangeText={txt => setEndate(txt)}
          />
          {/* <InputCustom title={'Tên nhân viên'} /> */}
          <Text
            style={{
              marginHorizontal: 15,
              color: '#909090',
              fontSize: 16,
              fontFamily: 'NSSBold',
              marginBottom: 3,
              marginTop: 15,
              marginBottom: 13,
            }}>
            Tên nhân viên
          </Text>
          <Dropdown
            style={{
              borderBottomWidth: 1.75,
              borderColor: '#E0E0E0',
              marginHorizontal: 15,
              marginBottom: 15,
            }}
            data={dataNhanVien}
            labelField="hoTen"
            placeholder=""
            value={''}
            onChange={item => setNameNv(item.hoTen)}
          />
          <InputCustom
            title={'Mô tả công việc'}
            onChangeText={txt => setDiscriptions(txt)}
          />
        </View>
        <TouchableOpacity
          onPress={CreateJob}
          style={{
            backgroundColor: '#242424',
            height: 40,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            marginHorizontal: 40,
            marginVertical: 30,
            height: 50,
          }}>
          <Text style={{color: 'white', fontFamily: 'NSSBold'}}>
            Thêm công việc
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CreateCongViec;

const styles = StyleSheet.create({});
