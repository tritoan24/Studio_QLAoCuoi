import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import InputCustom from '../InputCustom'

const EditNhanVien = () => {
    return (
        <View style = {{justifyContent:'center',alignItems:'center'}}>
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
                <View style={{ marginTop: 6 }}></View>
                <InputCustom
                    title="Full Name" onChangeText={txt => setemail(txt)} icon={null}
                />
                <View style={{ marginTop:6 }}></View>
                <InputCustom
                    title="Adress" onChangeText={txt => setemail(txt)} icon={null}
                />
                <View style={{ marginTop:6 }}></View>
                <InputCustom
                    title="Phone Number" onChangeText={txt => setemail(txt)} icon={null}
                />
                <View style={{ marginTop:6 }}></View>
            </View>
            <View style={{ height: 30 }} />

            <TouchableOpacity >
                <View style={{ backgroundColor: '#000000', padding: 10, borderRadius: 10, width: 150, alignItems: 'center', elevation: 5 }}>
                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Next</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default EditNhanVien

const styles = StyleSheet.create({})