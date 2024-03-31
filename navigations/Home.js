import { FlatList, StyleSheet, Text, View,Image,SafeAreaView } from 'react-native'
import React,{useState,useEffect} from 'react'
import { apiGetDichVu } from '../config/UriAPi';
import CustomHeader from '../commponents/CustomHeader';

const Home = ({navigation}) => {
  const [data, setdata] = useState([]);

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
      })
      .catch(e => console.log(e));
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDs();
    });
    return unsubscribe;
  }, [navigation]);

  const renderItem = ({ item }) => {
    return (
      <View   style={{
        backgroundColor: '#FEFEFE',
        marginHorizontal: 15,
        marginVertical: 10,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderRadius: 8,
        elevation: 5,
      }}>
        <Text>{item.tenDv}</Text>
        <Text>{item.giaTien}</Text>
        <Image source={{ uri: item.anh }} style={{ width: 120, height: 120, borderRadius: 100, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#525252' }} />
      </View>
    );
  }
    
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
        Danh sách công việc
      </Text>

      <FlatList 
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
        </SafeAreaView>

  )
}

export default Home

const styles = StyleSheet.create({})
