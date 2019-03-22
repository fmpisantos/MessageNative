import * as React from 'react';
import {TouchableOpacity, Text, View, StyleSheet  } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';

export default class WithOutPlus extends React.Component {
  
    render() {
    return (
        <Ionicons onPress={this.props.func} style={styles.containerBack} name="ios-arrow-back" size={32} color="white" />
    );
  }
}

const styles = StyleSheet.create({
  containerBack:{
    position: "absolute",
    left:5,
    top: 5,
    paddingHorizontal:14,
  },
});