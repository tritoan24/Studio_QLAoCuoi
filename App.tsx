import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainNavigation from './navigations/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './navigations/Login';
import Welcome from './navigations/Welcome';

import DangKy from './navigations/DangKy';
import CreateCongViec from './screens/CreateCongViec';
import UpdateCongViec from './screens/UpdateCongViec';

import AddNhanVien from './commponents/Screens/AddNhanVien';
import AddNhanVienCt from './commponents/Screens/AddNhanVienCt';
import EditNhanVien from './commponents/Screens/EditNhanVien';


const Stack = createNativeStackNavigator();

const App = () => {
  return (

    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Main">
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={MainNavigation} />
        <Stack.Screen name="DangKy" component={DangKy}/>
        <Stack.Screen name="CreateCongViec" component={CreateCongViec} />
        <Stack.Screen name="UpdateCongViec" component={UpdateCongViec} />
        <Stack.Screen name="TaoTK" component={AddNhanVien} />
        <Stack.Screen name="AddContunie" component={AddNhanVienCt} />
        <Stack.Screen name="EditEmployee" component={EditNhanVien} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
