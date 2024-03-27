import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, Modal, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomButton from '../commponents/CustomButton';
import moment from 'moment';
import { ActivityIndicator } from 'react-native';



const NhanVien = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  //xác nhận xa thải nhân viên
  const [confirmVisible, setConfirmVisible] = useState(false);

  //modal chi tiết
  const showEmployeeDetail = (employee) => {
    setSelectedEmployee(employee);
    setModalVisible(true);
  }
  //modal xa thải
  const showConfirmModal = () => {
    setConfirmVisible(true);
  }

  //tắt modal chi tiết
  const offModal = () => {
    setModalVisible(false);
  }

  //xác nhận xa thải
  const handleConfirm = (confirmed) => {
    if (confirmed) {
      // Thực hiện xa thải ở đây
    }
    setConfirmVisible(false);
  }


  const handleEditEmployee = () => {
    navigation.navigate('EditEmployee', { employee: selectedEmployee });
    setModalVisible(false);
  }
  const getDs = () => {
    fetch('http://192.168.0.101:3001/apiUser/listUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setData(res);
      })
      .catch(e => console.log(e));
  }
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDs();
    });

    return unsubscribe;
  }, [navigation]);

  const taoTkNhanVien = () => {
    navigation.navigate('TaoTK');
  }

  const renderItem = ({ item }) => {
    if (item.trangThai !== 1) {
      return null;
    }
    return (
      <TouchableOpacity onPress={() => showEmployeeDetail(item)}
        style={styles.containerFlatList}>

        <View style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image source={{ uri: item.image }} style={{ width: 120, height: 120, borderRadius: 100, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#525252' }} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            padding: 16,
          }}

        >
          <Text style={{
            fontFamily: 'NRegular',
            fontSize: 17,
          }}>Full Name: {item.hoTen}</Text>
          <Text>Email: {item.email}</Text>
          <Text>Phone Number: {item.dienThoai}</Text>
          <Text>Gender: {item.gender}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ height: '100%' }}>
      <Text style={styles.title}>List Staff</Text>
      {data.length === 0 && (
  <View style={styles.loadingIndicator}>
    <ActivityIndicator size="large" color="#000000" />
  </View>
)}
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <TouchableOpacity onPress={taoTkNhanVien} style={styles.cbutton}>
        <Text style={styles.ctext}>Add Staff</Text>
      </TouchableOpacity>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Staff Detail:</Text>
            {selectedEmployee && selectedEmployee.image && (
              <Image
                source={{ uri: selectedEmployee.image }}
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 10
                }}
              />
            )}
            <Text>Name: {selectedEmployee?.hoTen}</Text>
            <Text>Email: {selectedEmployee?.email}</Text>
            <Text>Phone Number: {selectedEmployee?.dienThoai}</Text>
            <Text>Birthday: {moment(selectedEmployee?.birthday).format('DD/MM/YYYY')}</Text>
            <Text>Adress: {selectedEmployee?.diaChi}</Text>
            <Text>Gender: {selectedEmployee?.gender}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 20 }}>
              <CustomButton title={"Close"} width={90} height={40} onPress={offModal} />
              <CustomButton title="Edit" onPress={handleEditEmployee} width={90} height={40} />
            </View>
            <TouchableOpacity style={{
              backgroundColor: '#fe0000',
              borderRadius: 10,
              marginTop: 10,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
            }}
              onPress={showConfirmModal}>
              <Text style={{ color: '#ffffff', margin: 10 }}>Dismissal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={confirmVisible}
        onRequestClose={() => {
          setConfirmVisible(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView2}>
            <Text style={styles.modalText}>Bạn có chắc muốn Xa Thải nhân viên này không?</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
              <CustomButton title="No" onPress={() => handleConfirm(false)} width={90} height={40} />
              <CustomButton title="Yes" onPress={() => handleConfirm(true)} width={90} height={40} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default NhanVien

const styles = StyleSheet.create({
  containerFlatList: {
    padding: 10,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    margin: 15,
    elevation: 5
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'MRegular',
    margin: 10
  },
  cbutton: {
    backgroundColor: '#131313',
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5
  },
  ctext: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'NSRegular'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: '#8f8f8f',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'MRegular',
    fontSize: 20
  },
  modalView2: {
    margin: 20,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    elevation: 10
  },
  loadingIndicator: {
    height:'20%',
    justifyContent: 'center',
    alignItems: 'center',
  }

})
