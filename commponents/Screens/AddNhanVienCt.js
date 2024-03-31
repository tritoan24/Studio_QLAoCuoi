import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import React, { useState,useEffect } from 'react'
import InputCustom from '../InputCustom';
import CustomButton from '../CustomButton';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImageResizer from 'react-native-image-resizer';


const AddNhanVienCt = ({ navigation, route }) => {
    const { email, password } = route.params;
    const [phone, setphone] = useState('');
    const [address, setaddress] = useState('');
    const [imageUri, setImageUri] = useState('https://i.pinimg.com/564x/ad/57/b1/ad57b11e313616c7980afaa6b9cc6990.jpg');
    const [name, setname] = useState('');
    const [selectedButton, setSelectedButton] = useState(null);
    let trangThai = 1;
    const [showDatePicker, setShowDatePicker] = useState(false);
    const defaultImageSource = source= {uri: 'https://i.pinimg.com/564x/ad/57/b1/ad57b11e313616c7980afaa6b9cc6990.jpg'}
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        console.log(imageUri)
    }, []);

    const DangKi = async () => {
        let resizedImageUri = imageUri;
        if (imageUri) {
            try {
                const resizedImage = await ImageResizer.createResizedImage(
                    imageUri,
                    800, // maxWidth
                    600, // maxHeight
                    'JPG', // compressFormat
                    80, // quality
                    0, // rotation
                );
                resizedImageUri = resizedImage.uri;
            } catch (error) {
                console.error('Error resizing image:', error);
            }
        }

        if (!name || !phone || !address || !date || !selectedButton) {
            // Hiển thị cảnh báo nếu có trường nào đó chưa được điền
            Alert.alert('Missing Information', 'Please fill in all fields');
            return;
        }
        if (!phone.trim()) {
            alert('Please enter your phone number');
            return false;
          } else if (!/^\d+$/.test(phone)) {
            alert('Phone number must contain only digits');
            return false;
          }
    
     

        fetch('http://192.168.0.101:3001/apiUser/addUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
                hoTen: name,
                diaChi: address,
                dienThoai: phone,
                gender: selectedButton,
                birthday: date,
                trangThai: trangThai,
                image: resizedImageUri,
            }),
        })
            .then(res => {
                if (res.status == 201) {
                    Alert.alert('Đăng kí thành công');
                    navigation.navigate('NhanVien');
                    console.log('Đăng kí thành công');
                }
                if (res.status == 405) {
                    Alert.alert('Email đã tồn tại');
                }
            })
            .catch(e => console.log(e));
    };



    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
        console.log('selected date:', currentDate);
    };

    const showDatepicker = () => {
        setShowDatePicker(true);
    };




    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('Image picker error: ', response.error);
            } else {
                const base64Image = response.assets?.[0]?.base64;
                setImageUri(`data:image/jpeg;base64,${base64Image}`);

            }
        });
    };


    const handleCameraLaunch = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: true,
            maxHeight: 2000,
            maxWidth: 2000,
        };

        
            launchCamera(options, response => {
                if (response.didCancel) {
                    console.log('User cancelled camera');
                } else if (response.error) {
                    console.log('Camera Error: ', response.error);
                } else {
                    const base64Image = response.assets?.[0]?.base64;
                   setImageUri(`data:image/jpeg;base64,${base64Image}`);
                }
            });
        }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <Image source={imageUri ? { uri: imageUri } : defaultImageSource} style={{ width: 150, height: 150, borderRadius: 100, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#525252' }} />
                <TouchableOpacity onPress={handleCameraLaunch} style={{ position: 'absolute', right: 20, top: 110 }}>
                    <Image source={require('../Screens/image/photo-camera.png')} style={styles.Choiceiamge} />
                </TouchableOpacity>
                <TouchableOpacity onPress={openImagePicker} style={{ position: 'absolute', right: 20, top: 50 }}>
                    <Image source={require('../Screens/image/image-.png')} style={styles.Choiceiamge} />
                </TouchableOpacity>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                        title="Name" onChangeText={txt => setname(txt)} icon={null}
                    />
                    <View style={{ marginTop: 10 }}></View>
                    <InputCustom title="Phone Number" onChangeText={txt => setphone(txt)} icon={null} />
                    <View style={{ marginTop: 10 }}></View>
                    <InputCustom title="Address" onChangeText={txt => setaddress(txt)} icon={null} />
                    <View style={{ marginTop: 10 }}></View>
                    <SafeAreaView>
                        <View style={{
                            flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
                            borderRadius: 10, elevation: 5, backgroundColor: '#f1f1f1',
                            height: 47, marginRight: 14, marginLeft: 14
                        }}>
                            <Text style={styles.birthday}>Birthday: </Text>
                            <Text style={styles.date}  onPress={showDatepicker}>
                                {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`} </Text>
                        </View>
                    </SafeAreaView>
                </View>
            </View>






            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 25 }}>
                <CustomButton title={"Male"} width={80} height={40} backgroundColor={'#2d663f'} selected={selectedButton === "Male"} onPress={() => setSelectedButton('Male')} />
                <CustomButton title={"Female"} width={80} height={40} backgroundColor={'#cc15a4'} selected={selectedButton === "Female"} onPress={() => setSelectedButton('Female')} />
                <CustomButton title={"Other"} width={80} height={40} backgroundColor={'#6b16b1'} selected={selectedButton === "Other"} onPress={() => setSelectedButton('Other')} />
            </View>
            <View
                style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
            >
                <CustomButton title={"Add New"} width={315} height={50} onPress={DangKi} />
            </View>
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode="date"
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>

    );
}

const styles = StyleSheet.create({
    Choiceiamge: {
        width: 30,
        height: 30
    },
    container: {
        justifyContent: 'center',
        height: '100%',



    },
    date: {
        fontSize: 20,
        fontFamily: 'italic',
        marginLeft: 29,
    },
    birthday: {
        position: 'absolute',
        left: 20,
        fontSize: 16,
    }

});

export default AddNhanVienCt

