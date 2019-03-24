import * as React from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Dimensions } from 'react-native';
import { Constants } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import * as Expo from "expo";

export default class OnlyLogout extends React.Component {
  
    logout= async () => {
      this.props.logout();
      try{
        const result = await Expo.Google.logOutAsync({accessToken:this.props.accessToken, iosClientId: "916703486908-9ufavhtuk0topi25pmqcibeb0qjjhekf.apps.googleusercontent.com" })
       if (result.type === "success") {
         console.log("Logout");
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    } 
  }

  render() {
    return (
        <TouchableOpacity style={styles.containerLogout} onPress={this.logout}>
          <Text style={styles.logout}>LogOut</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerLogout: {
    position: 'absolute',
    top:Constants.statusBarHeight,
    left:"50%",
    justifyContent: 'center',
    alignItems: 'center'
  },
  logout:{
    position: "absolute",
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    color:"white",
    borderColor: '#fff',
    padding:5,
    paddingHorizontal: 50, 
  }
});