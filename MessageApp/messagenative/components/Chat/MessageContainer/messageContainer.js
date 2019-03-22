import * as React from 'react';
import {KeyboardAvoidingView,View ,Text, ScrollView, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';
import Message from './message';
import Input from '../../input';

export default class MessageContainer extends React.Component {

  constructor(props){
    super(props);
    this.state={
      inputFocus: false
    }
  }

  inputFocus(flag){
      this.setState({
        inputFocus:flag
      });
  }

  render() {
    return (
      <View style={this.state.inputFocus?({maxHeight:"50%"}):({maxHeight:"100%"}),styles.containerMessage }>
        <ScrollView style={{keyboardDismissMode:'on-drag'}} 
        ref={ref => this.scrollView = ref}
        onContentSizeChange={(contentWidth, contentHeight)=>{        
        this.scrollView.scrollToEnd({animated: true});
    }}>
        <View style={{margin:10}}>
        {this.props.list.map((item,key)=>{

            console.log(item.user);
          return(
            <Message key={key} name={item.user} message={item.message} mine={item.user=="Filipe"?true:false}/>
          )
        })}
        </View>
      </ScrollView>
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={54} enabled>
        <Input focus={this.inputFocus.bind(this)} func={this.props.sendMessage} name="SEND"/>
      </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerMessage: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: 10,
    backgroundColor: "#C4C4C4",
  },
});