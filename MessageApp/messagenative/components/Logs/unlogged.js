import * as React from 'react';
import {Button,Text, View, StyleSheet} from 'react-native';
import * as Expo from "expo";

export default class unLogged extends React.Component {

constructor(props){
  super(props);
  this.state = {
      logged : false,
      name: "",
      email: ""
  }
}

signIn = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        iosClientId: "916703486908-9ufavhtuk0topi25pmqcibeb0qjjhekf.apps.googleusercontent.com"
      })
      if (result.type === "success") {
        result.user.uid = result.user.id;
        result.user.displayName = result.user.name;
        fetch(this.props.serverUrl+"/login/",{
          method: "POST",
          mode: 'cors',
        body: JSON.stringify(result.user)
      })
      .then(result =>{return JSON.parse(result._bodyText)})
        .then(json => {this.props.changeUserState(json,result.accessToken)})
          .catch(error => {console.log(error)});
      } else {
        console.log("cancelled")
      }
    } catch (e) {
      console.log("error", e)
    }
}

  render() {
    return (
      <View style={styles.containerChat}>
        {this.state.logged?(
          <View>
          <Text>{this.state.name}</Text>
          <Text>{this.state.email}</Text>
          </View>
        ):(
          <Button title="Sign in with Google" onPress={() => this.signIn()} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerChat:{
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
