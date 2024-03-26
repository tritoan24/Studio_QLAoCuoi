import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './Home';
import HoaDon from './HoaDon';
import ThongKe from './ThongKe';
import KhachHang from './KhachHang';
import CongViec from './CongViec';
import NhanVien from './NhanVien';

const TabButtom = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <TabButtom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {height: 60},
      }}>
      <TabButtom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                {width: 21, height: 21},
                //Set màu cho icon khi focus vào màn hình đó
                focused == true ? {tintColor: '#00bcd2'} : {tintColor: 'black'},
              ]}
              source={require('../assets/image/home.png')}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <TabButtom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                {width: 21, height: 21},
                focused == true ? {tintColor: '#00bcd2'} : {tintColor: 'black'},
              ]}
              source={require('../assets/image/hoadon.png')}
            />
          ),
        }}
        name="HoaDon"
        component={HoaDon}
      />
      <TabButtom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                {width: 21, height: 21},
                focused == true ? {tintColor: '#00bcd2'} : {tintColor: 'black'},
              ]}
              source={require('../assets/image/thongke.png')}
            />
          ),
        }}
        name="ThongKe"
        component={ThongKe}
      />
      <TabButtom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                {width: 21, height: 21},
                focused == true ? {tintColor: '#00bcd2'} : {},
              ]}
              source={require('../assets/image/khachhang.png')}
            />
          ),
        }}
        name="KhachHang"
        component={KhachHang}
      />
      <TabButtom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                {width: 21, height: 21},
                focused == true ? {tintColor: '#00bcd2'} : {tintColor: 'black'},
              ]}
              source={require('../assets/image/congviec.png')}
            />
          ),
        }}
        name="CongViec"
        component={CongViec}
      />
      <TabButtom.Screen
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              style={[
                {width: 21, height: 21},
                focused == true ? {tintColor: '#00bcd2'} : {tintColor: 'black'},
              ]}
              source={require('../assets/image/nhanvien.png')}
            />
          ),
        }}
        name="NhanVien"
        component={NhanVien}
      />
    </TabButtom.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
