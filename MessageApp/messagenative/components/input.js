import * as React from 'react';
import {TouchableOpacity ,Text, View, StyleSheet, Image, TextInput ,Button ,Dimensions,KeyboardAvoidingView} from 'react-native';
import { Constants } from 'expo';

export default class Input extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      message: ""
    }
  }
  
  sendMessage(){
    this.props.func(this.state.message);
    this.setState({
      message:""
    });
  }

  updateMessage(msg){
      this.setState({
        message:msg
      });
  }

  focus(flag){
    this.props.focus(flag);
  }


  render() {
    let {height,width} = Dimensions.get("screen");
    return (
      <View style={styles.containerInput,{flexDirection: 'row'}}>
            <TextInput
        style={{ width: (width-99),borderColor: 'black', borderWidth: 1,backgroundColor:"#857676"}}
        onChangeText={(message) => this.updateMessage.bind(this)(message)}
        value={this.state.message}
        onFocus={this.focus.bind(this,true)}
        onBlur={this.focus.bind(this,false)}
      />
      <TouchableOpacity style={styles.button} onPress={this.sendMessage.bind(this)}>
        <Text style={styles.buttonText}>{this.props.name}</Text>
      </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerInput: {
    flex: 1,
    
  },
  button: {
    marginLeft:1.2,
    paddingTop:10,
    paddingBottom:10,
    paddingHorizontal:10,
    backgroundColor:'#603434',
    //borderRadius:10,
    borderWidth: 1,
    borderColor: '#603434'
  },
  buttonText: {
    color:'#fff',
      textAlign:'center',
      paddingLeft : 10,
      paddingRight : 10
  }
});