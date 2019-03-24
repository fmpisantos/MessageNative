import * as React from 'react';
import {View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import Logout from './onlyLogout';
import BackIcon from './withOutPlus';

export default class WithPlus extends React.Component {
  
  render() {
    
    return (
        <Ionicons onPress={this.props.func} style={styles.containerPlus} name="ios-add" size={32} color="white" />
    );
  }
}

const styles = StyleSheet.create({
  containerPlus:{
    position: "absolute",
    right:5,
    top: 5,
    paddingHorizontal:14,
  },
});