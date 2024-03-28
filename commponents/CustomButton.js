import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';


const CustomButton = ({ onPress, title, width, height, backgroundColor, selected }) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { width, height, backgroundColor: selected ? backgroundColor : '#000000' }]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}


export default CustomButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E2BFB3',
    alignItems: 'center',
    justifyContent: 'center',
     borderRadius: 10,
     elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
});
