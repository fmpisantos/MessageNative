import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import { Constants } from 'expo';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

export default class unLogged extends React.Component {

constructor(props){
  super(props);
}

uiConfig = {
  signInFlow: "redirect",
  signInOptions: [
    this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccess : ()=>false
  }
}

componentDidMount = () =>{
  this.props.firebase.auth().onAuthStateChanged(user =>{
    fetch(this.props.serverUrl+"/login/",{
      method: "POST",
      credentials: "include",
        rejectUnauthorized: false,
      body: JSON.stringify(user.providerData[0])
    })
      .then(result =>{return result.json()})
        .then(json => {this.props.changeUserState(json)})
          .catch(error => {console.log(error)});
  });
}
  render() {
    return (
      <View style={styles.containerChat}>
          <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={this.props.firebase.auth()}
                  />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerChat:{
    flex: 1,
  }
});
