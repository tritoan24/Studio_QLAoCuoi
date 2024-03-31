import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {apiGetDichVu} from '../config/UriAPi';
import CustomHeader from '../commponents/CustomHeader';

const Home = ({navigation}) => {
  const [data, setdata] = useState([]);
  const [columns, setColumns] = useState(2);
  //luu so luong
  const [number, setnumber] = useState(0);

  const getDs = () => {
    fetch(apiGetDichVu, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(res => {
        setdata(res);
        setnumber(res.length);
      })
      .catch(e => console.log(e));
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDs();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({item}) => {
    //lấy ảnh đầu tiên của mảng ảnh
    let imageUrl = item.anh && item.anh.length > 0 ? item.anh[0] : null;
    let giaduocgiam = item.giaTien - (item.giaTien * item.giamgia) / 100;
    // Kiểm tra xem giá có giảm hay không
    let textColor = item.giamgia ? 'red' : 'black';

    return (
      <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {item})}
        style={{
          backgroundColor: '#FEFEFE',
          marginHorizontal: 5,
          marginVertical: 10,
          paddingHorizontal: 5,
          paddingVertical: 15,
          borderTopRightRadius: 68,
          borderBottomLeftRadius: 38,
          elevation: 5,
        }}>
        {imageUrl && typeof imageUrl === 'string' && (
          <Image
            source={{uri: imageUrl}}
            style={{
              width: 130,
              height: 220,
          borderTopRightRadius: 68,
          borderBottomLeftRadius: 18,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        )}

        <Text style={{fontFamily: 'NSSBold', fontSize: 17, marginTop: 10}}>
          {' '}
          {item.tenDv}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{color: textColor}}>
            {giaduocgiam.toLocaleString('vi-VN')}₫
          </Text>
          {item.giamgia > 0 && (
            <Text style={styles.discount}>Giảm: {item.giamgia}%</Text>
          )}
        </View>
        <View style={styles.sizeContainer}>
          <Text style={styles.sizeTitle}>Kích thước:</Text>
          <FlatList
            data={item.kichthuoc}
            horizontal={true}
            renderItem={({item}) => (
              <View style={styles.sizeItem}>
                <Text>{item}</Text>
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        title={'Danh sách dịch vụ'}
        messenger={'Dịch vụ có trong studio'}
        hint={'Tìm kiếm dịch vụ.................'}
      />
      <Text
        style={{
          marginHorizontal: 15,
          fontFamily: 'NSSBold',
          color: 'black',
          fontSize: 17,
        }}>
        số lượng : {number}
      </Text>

      <FlatList
        key={columns}
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={columns}
      />
      <TouchableOpacity
        onPress={() => {
          setColumns(columns === 2 ? 1 : 2);
        }}
        style={{
          backgroundColor: 'blue',
          padding: 10,
          borderRadius: 5,
          margin: 10,
          alignItems: 'center',
        }}>
        <Text style={{color: 'white'}}>Chuyển đổi cột</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  sizeContainer: {
    marginTop: 15,
  },
  sizeTitle: {
    fontWeight: 'bold',
  },
  sizeItem: {
    padding: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginRight: 5,
  },
  numberText: {
    marginHorizontal: 15,
    fontFamily: 'NSSBold',
    color: 'black',
    fontSize: 12,
  },
});
