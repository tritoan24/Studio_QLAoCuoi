import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainNavigation from './navigations/MainNavigation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './navigations/Login';
import Welcome from './navigations/Welcome';
import AddNhanVien from './commponents/Screens/AddNhanVien';
import AddNhanVienCt from './commponents/Screens/AddNhanVienCt';
import EditNhanVien from './commponents/Screens/EditNhanVien';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} /> */}
        <Stack.Screen name="Main" component={MainNavigation} />
        <Stack.Screen name="TaoTK" component={AddNhanVien} />
        <Stack.Screen name="AddContunie" component={AddNhanVienCt} />
        <Stack.Screen name="EditEmployee" component={EditNhanVien} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});
