import React from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions, ScrollView } from 'react-native';
const { width } = Dimensions.get('window');

const ChiTietService = ({route}) => {
   
    const {item} = route.params;
    
  return (
    <ScrollView>

       <FlatList
                data={item.anh}
                renderItem={({ item }) => (
                    <View style={{ width }}>
                        <Image source={{ uri: item }} style={{ width: '100%', height: 300 }} resizeMode="cover" />
                    </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
            />
            <Text style = {styles.title}>{item.tenDv}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.price}>
                {item.giaTien.toLocaleString('vi-VN')}₫
            </Text>
            {item.giamgia > 0 && (
                <Text style={styles.discount}>Giảm: {item.giamgia}%</Text>
            )}
            </View>
            
    </ScrollView>
  )
}

export default ChiTietService

const styles = StyleSheet.create({
    title:{
        fontFamily: 'NSSBold',
        fontSize: 22,
        marginTop: 10,
        textAlign: 'center'
    },
    price:{
        fontSize: 20,
        fontFamily: 'NSSBold',
        marginTop: 10,
        marginLeft: 10
    },
    discount:{
        fontSize: 20,
        fontFamily: 'NSSBold',
        marginTop: 10,
        marginLeft: 10
    }
})