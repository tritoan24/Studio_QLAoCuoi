import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  ToastAndroid,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import InputSearch from '../commponents/InputSearch';
import CustomHeader from '../commponents/CustomHeader';
import {apiDeleteCongViec, apiGetCongViec} from '../config/UriAPi';

const CongViec = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleCT, setIsModalVisibleCT] = useState(false);
  const [id, setId] = useState('');
  const [item, setItem] = useState('');
  console.log('CongViec  item:', item);
  console.log('CongViec  id:', id);

  const PostItemCv = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: '#FEFEFE',
          marginHorizontal: 15,
          marginVertical: 10,
          paddingHorizontal: 15,
          paddingVertical: 15,
          borderRadius: 8,
          elevation: 5,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', bottom: 3}}>
            <Text style={{color: '#242424', fontFamily: 'NSSBold'}}>
              Tên công việc:{' '}
            </Text>
            <Text style={{color: '#909090', fontFamily: 'NSSBold'}}>
              {item.name}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsModalVisible(true);
              setId(item._id);
              setItem(item);
            }}>
            <Image
              style={{width: 30, height: 30}}
              source={require('../assets/image/menu.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row', bottom: 6}}>
          <Text style={{color: '#242424', fontFamily: 'NSSBold'}}>
            Ngày bắt đầu:{' '}
          </Text>
          <Text style={{color: '#909090', fontFamily: 'NSSBold'}}>
            {item.stdate}
          </Text>
        </View>
        <View style={{flexDirection: 'row', bottom: 4}}>
          <Text style={{color: '#242424', fontFamily: 'NSSBold'}}>
            Ngày kết thúc:{' '}
          </Text>
          <Text style={{color: '#909090', fontFamily: 'NSSBold'}}>
            {item.endate}
          </Text>
        </View>
        <View style={{flexDirection: 'row', bottom: 2.75}}>
          <Text style={{color: '#242424', fontFamily: 'NSSBold'}}>
            Tên nhân viên:{' '}
          </Text>
          <Text style={{color: '#909090', fontFamily: 'NSSBold'}}>
            {item.nameNv}
          </Text>
        </View>
        <View style={{flexDirection: 'row', bottom: 2}}>
          <Text style={{color: '#242424', fontFamily: 'NSSBold'}}>
            Trạng thái:{' '}
          </Text>
          <Text
            style={[
              {fontFamily: 'NSSBold'},
              item.status == 1 ? {color: '#30E849'} : {color: '#E8B730'},
            ]}>
            {item.status == 1 ? 'Hoàn thành' : 'Chưa hoàn thành'}
          </Text>
        </View>
      </View>
    );
  };
  const [listCV, setListCV] = useState([]);
  const CallApiCv = async () => {
    try {
      const res = await fetch(apiGetCongViec);
      const json = await res.json();
      // console.log('CallApiCv  json:', json);
      setListCV(json);
    } catch (error) {
      console.log('CallApiCv  error:', error);
    }
  };

  useEffect(() => {
    CallApiCv();
    const load = navigation.addListener('focus', () => {
      CallApiCv();
    });
    return load;
  }, [navigation]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <CustomHeader
        title={'Danh sách công việc'}
        messenger={'Xin mời kiểm tra công việc có trong studio'}
        hint={'Tìm kiếm công việc.................'}
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
        data={listCV}
        renderItem={PostItemCv}
        keyExtractor={(e, i) => e._id}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreateCongViec');
        }}
        style={{
          width: 50,
          height: 50,
          backgroundColor: '#242424',
          bottom: 20,
          justifyContent: 'center',
          alignSelf: 'flex-end',
          right: 20,
          borderRadius: 8,
          alignItems: 'center',
        }}>
        <Image
          style={{width: 15, height: 15, position: 'absolute'}}
          source={require('../assets/image/plus.png')}
        />
      </TouchableOpacity>

      {/* Modal chức năng */}
      <Modal transparent={true} animationType="fade" visible={isModalVisible}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '85%',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              style={{
                width: 150,
                height: 150,
              }}
              source={require('../assets/image/logo3.png')}
            />
            <Text
              style={{
                color: 'black',
                fontFamily: 'NSSBold',
                fontSize: 18,
                marginBottom: 10,
              }}>
              Chọn chức năng
            </Text>
            <View
              style={{height: 1.75, backgroundColor: '#DBDBDB', width: '95%'}}
            />

            <View style={{marginTop: 15}}>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  Alert.alert('Thông báo!', 'Bạn có chắc muỗn xóa không?', [
                    {
                      text: 'Không',
                    },
                    {
                      text: 'Có',
                      onPress: () => {
                        fetch(apiDeleteCongViec + id, {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                        })
                          .then(res => {
                            if (res.status == 200) {
                              ToastAndroid.show(
                                'Xóa thành công',
                                ToastAndroid.SHORT,
                              );
                              CallApiCv();
                            }
                          })
                          .catch(e => console.log(e));
                      },
                    },
                  ]);
                }}
                style={{
                  backgroundColor: '#242424',
                  height: 50,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 280,
                  marginBottom: 10,
                }}>
                <Text style={{color: 'white', fontFamily: 'NSSBold'}}>Xóa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  navigation.navigate('UpdateCongViec', item);
                }}
                style={{
                  backgroundColor: '#242424',
                  height: 50,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 280,
                  marginBottom: 10,
                }}>
                <Text style={{color: 'white', fontFamily: 'NSSBold'}}>Sửa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  setIsModalVisibleCT(true);
                }}
                style={{
                  backgroundColor: '#242424',
                  height: 50,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 280,
                  marginBottom: 10,
                }}>
                <Text style={{color: 'white', fontFamily: 'NSSBold'}}>
                  Xem chi tiết
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: '90%',
                height: 1.75,
                backgroundColor: '#BDBDBD',
                marginTop: 10,
              }}
            />
            <View
              style={{
                marginTop: 20,
                marginBottom: 10,
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                right: 15,
              }}>
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{
                  backgroundColor: '#242424',
                  height: 40,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 150,
                }}>
                <Text style={{color: 'white', fontFamily: 'NSSBold'}}>
                  Thoát
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal chitiet */}
      <Modal transparent={true} animationType="fade" visible={isModalVisibleCT}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.6)',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              width: '90%',
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}>
            <Text
              style={{
                marginTop: 10,
                marginBottom: 10,
                color: '#242424',
                fontFamily: 'NSSBold',
                fontSize: 18,
                textAlign: 'center',
              }}>
              Thông tin chi tiết công việc
            </Text>
            <View
              style={{
                height: 1.75,
                width: '95%',
                backgroundColor: '#DBDBDB',
                alignSelf:'center'
              }}
            />

            <View style={{marginHorizontal: 10, marginVertical: 15}}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'NSSBold',
                    fontSize: 16,
                    color: '#242424',
                  }}>
                  Tên công việc:
                </Text>
                <Text
                  style={{
                    fontFamily: 'NSSBold',
                    fontSize: 16,
                    marginStart: 5,
                    color: '#909090',
                  }}>
                  {item.name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'NSSBold',
                    fontSize: 16,
                    color: '#242424',
                  }}>
                  Ngày bắt đầu:
                </Text>
                <Text
                  style={{
                    fontFamily: 'NSSBold',
                    fontSize: 16,
                    marginStart: 5,
                    color: '#909090',
                  }}>
                  {item.stdate}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'NSSBold',
                    fontSize: 16,
                    color: '#242424',
                  }}>
                  Ngày kết thúc:
                </Text>
                <Text
                  style={{
                    fontFamily: 'NSSBold',
                    fontSize: 16,
                    marginStart: 5,
                    color: '#909090',
                  }}>
                  {item.endate}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'NSSBold',
                    fontSize: 16,
                    color: '#242424',
                  }}>
                  Tên nhân viên:
                </Text>
                <Text
                  style={{
                    fontFamily: 'NSSBold',
                    fontSize: 16,
                    marginStart: 5,
                    color: '#909090',
                  }}>
                  {item.nameNv}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontFamily: 'NSSBold',
                    fontSize: 16,
                    color: '#242424',
                  }}>
                  Trạng thái:
                </Text>
                <Text
                  style={[
                    {
                      fontFamily: 'NSSBold',
                      fontSize: 16,
                      marginStart: 5,
                    },
                    item.status == 1 ? {color: '#30E849'} : {color: '#E8B730'},
                  ]}>
                  {item.status == 1 ? 'Hoàn thành' : 'Chưa hoàn thành'}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <Text
                  style={{
                    fontFamily: 'NSSBold',
                    fontSize: 16,
                    color: '#242424',
                  }}>
                  Mô tả chi tiết:
                </Text>
                <Text
                  style={{
                    fontFamily: 'NSSBold',
                    fontSize: 16,
                    marginStart: 5,
                    color: '#909090',
                    textAlign: 'justify',
                  }}>
                  {item.discriptions} {item.discriptions}
                </Text>
              </View>
            </View>

            <View
              style={{
                marginTop: 20,
                marginBottom: 10,
                alignItems: 'flex-end',
                alignSelf: 'flex-end',
                right: 15,
              }}>
              <TouchableOpacity
                onPress={() => setIsModalVisibleCT(false)}
                style={{
                  backgroundColor: '#242424',
                  height: 40,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 150,
                }}>
                <Text style={{color: 'white', fontFamily: 'NSSBold'}}>
                  Thoát
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default CongViec;

const styles = StyleSheet.create({});
