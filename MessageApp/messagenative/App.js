import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import { Constants } from 'expo';
import Chat from './components/Chat/chat';
import ChatList from './components/ListChats/chatList';
import NewUser from './components/AddNew/newUser';
import NewChat from './components/AddNew/newChat';
import Unlogged from './components/Logs/unlogged';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import firebase from "firebase";

function initFirebase(){

firebase.initializeApp({
  apiKey: "AIzaSyDkuIsp07XLzpRhF4EQqUqKtXdV6Etk5bU",
  authDomain: "messages-4197e.firebaseapp.com"
});

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      c : "unlogged",
      list:[
            {
        email: "voldemort@gmail.com",
                name: "Voldemort",
                mensage: "Avada Kedabra"
            },
            {
        email: "harrypotter@gmail.com",
                name: "Harry Potter",
                mensage: "Expeliamus"
            }
        ],
      user:"harrypotter@gmail.com",
      chat: 0,
      chatLogged : false,
      loggedUser: false,
      serverUrl: "https://api.messagenative.com/"
    }
  }

  goToChat(id){
      fetch(this.state.serverUrl+'/?id='+id,{
        mode:"cors",
        credentials: 'include',
      })
      .then(result => {return result.json()}) //returns the json so the next then gets it
        .then(json => {
          this.setState({list : json.mensages,chat:json,chatLogged: true})
        })
        .catch(error=>console.error(error))
        return 0;
  }

  changeCase(cc){
    this.setState({
      c:cc
    });
  }

  changeUserState(userUpdated){
    this.setState({
      loggedUser : userUpdated,
      user : userUpdated.email
    });
  }

  logout(){
    this.setState({
      loggedUser : false,
      list : [],
      user: null,
      chat: 0
    });
  }

  sendMessage(message){
    this.setState({
      list: [...this.state.list, {
        email: this.state.user,
        mensage: msg,
        name: this.state.loggedUser.name
      }]
    });
    let l = {
      "uid": this.state.loggedUser.uid,
      "message":msg,
      "id": this.state.chat.id
    };
    fetch(this.state.serverUrl+'/newMsg/',{
      method:"POST",
      mode: "cors",
      credentials: 'include',
      body: JSON.stringify(l)
      })
        .then(result =>{return result.json()})
          .then(json=>{console.log(json);console.log(this.state.user)})
            .catch(error =>{console.log(error)});
  }

  updateCase(){
    switch(this.state.c){
      case "list": 
        return(<ChatList goToChat={this.goToChat.bind(this)} changeCase={this.changeCase.bind(this)} list={this.state.listChats}/>)
      case "chat":
        return (<Chat sendMessage={this.sendMessage.bind(this)} list={this.state.listChat} loggedUser="Filipe" changeCase={this.changeCase.bind(this)}/>)
      case "newUser":
        return (<NewUser name="Chat 1" changeCase={this.changeCase.bind(this)}/>)
      case "newChat":
        return (<NewChat changeCase={this.changeCase.bind(this)}/>)
      case "unlogged":
        return (<Unlogged serverUrl={this.state.serverUrl} changeUserState={this.changeUserState.bind(this)} firebase={firebase}/>)
    }
  }

  render() {
    let l = this.updateCase.bind(this)();
    return (
        <View style={styles.container}>
         {l}
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#483D3D",
    paddingTop: 17,
  },
});