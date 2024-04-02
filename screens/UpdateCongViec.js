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
import {apiGetNhanVien, apiPutCongViec} from '../config/UriAPi';
import DatePicker from 'react-native-date-picker';

const UpdateCongViec = ({navigation, route}) => {
  const [dataNhanVien, setDataNhanVien] = useState([]);
  const [nameNv, setNameNv] = useState(route.params.nameNv);
  const [name, setName] = useState(route.params.name);
  const [stdate, setStdate] = useState(route.params.stdate);
  const [endate, setEndate] = useState(route.params.endate);
  const [discriptions, setDiscriptions] = useState(route.params.discriptions);
  const [showHideEnd, setShowHideEnd] = useState('');
  const [showHideStart, setShowHideStart] = useState('');

  console.log('UpdateCongViec  dataNhanVien:', route.params._id);

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

  const UpdateJob = () => {
    fetch(apiPutCongViec + route.params._id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        stdate: stdate,
        endate: endate,
        nameNv: nameNv,
        discriptions: discriptions,
      }),
    })
      .then(res => {
        if (res.status == 200) {
          ToastAndroid.show('Sửa thành công', ToastAndroid.SHORT);
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
          title={'Sửa công việc cho studio'}
          messenger={'Xin mời sửa công việc cho studio'}
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
            value={name}
          />
          <TouchableOpacity onPress={() => setShowHideStart(true)}>
            <InputCustom
              title={'Ngày bắt đầu'}
              onChangeText={txt => setStdate(txt)}
              value={stdate}
              edittable={false}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowHideEnd(true)}>
            <InputCustom
              title={'Ngày kết thúc'}
              onChangeText={txt => setEndate(txt)}
              value={endate}
              edittable={false}
            />
          </TouchableOpacity>

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
            placeholder={nameNv}
            value={''}
            onChange={item => setNameNv(item.hoTen)}
          />
          <InputCustom
            title={'Mô tả công việc'}
            onChangeText={txt => setDiscriptions(txt)}
            value={discriptions}
          />
        </View>
        <TouchableOpacity
          onPress={UpdateJob}
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
            Sửa công việc
          </Text>
        </TouchableOpacity>
        <DatePicker
          modal
          mode={'date'}
          title={'Mời chọn ngày bắt đầu'}
          locale="vi-VN"
          open={showHideStart}
          date={new Date()}
          onConfirm={newDate => {
            setStdate(
              `${newDate.getDate()}/${
                newDate.getMonth() + 1
              }/${newDate.getFullYear()}`,
            );
            setShowHideStart(false);
          }}
          onCancel={() => setShowHideStart(false)}
        />
        <DatePicker
          modal
          mode={'date'}
          title={'Mời chọn ngày kết thúc'}
          open={showHideEnd}
          locale="vi-VN"
          date={new Date()}
          onConfirm={newDate => {
            setEndate(
              `${newDate.getDate()}/${
                newDate.getMonth() + 1
              }/${newDate.getFullYear()}`,
            );
            setShowHideEnd(false);
          }}
          onCancel={() => setShowHideEnd(false)}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UpdateCongViec;

const styles = StyleSheet.create({});
