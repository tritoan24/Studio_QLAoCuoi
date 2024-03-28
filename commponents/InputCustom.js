import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const InputCustom = ({
  title,
  onChangeText,
  style,
  icon,
  onChangeToggle,
  enTry,
  value
}) => {
  return (
    <SafeAreaView style={{marginHorizontal: 15, marginVertical: 15}}>
      <Text
        style={{
          color: '#909090',
          fontSize: 16,
          fontFamily: 'NSSBold',
          marginBottom: 3,
        }}>
        {title}
      </Text>

      {icon == null ? (
        <View
          style={{
            borderBottomWidth: 1.75,
            borderColor: '#E0E0E0',
            color: 'black',
            fontFamily: 'NSRegular',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            onChangeText={onChangeText}
            style={[{flex: 1,fontFamily:'NSSBold'}, style]}
            secureTextEntry={enTry}
            value={value}
          />
        </View>
      ) : (
        <View
          style={{
            borderBottomWidth: 1.75,
            borderColor: '#E0E0E0',
            color: 'black',
            fontFamily: 'NSRegular',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextInput
            onChangeText={onChangeText}
            style={[{flex: 1}, style]}
            secureTextEntry={enTry}
          />

          {
            <TouchableOpacity onPress={onChangeToggle}>
              <Image
                style={{width: 20, height: 20, marginEnd: 5}}
                source={icon}
              />
            </TouchableOpacity>
          }
        </View>
      )}
    </SafeAreaView>
  );
};

export default InputCustom;

const styles = StyleSheet.create({});
