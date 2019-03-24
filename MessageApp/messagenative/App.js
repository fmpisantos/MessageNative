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

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      id: 0,
      accessToken: null,
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
      serverUrl: "https://api.messagenative.com"
    }
  }

  goToChat(id){
      fetch(this.state.serverUrl+'/?id='+id,{
        mode:"cors",
      })
      .then(result => {return JSON.parse(result._bodyText)}) //returns the json so the next then gets it
        .then(json => {
          this.setState({id: id,list : json.mensages,chat:json,chatLogged: true,c:"chat"})
        })
        .catch(error=>console.error(error))
        return 0;
  }

  changeCase(cc){
    this.setState({
      c:cc
    });
  }

  changeUserState(userUpdated,accessToken){
    this.setState({
      accessToken : accessToken,
      c: "list",
      loggedUser : userUpdated,
      user : userUpdated.email
    });
  }

  logout(){
    this.setState({
      c : "unlogged",
      loggedUser : false,
      list : [],
      user: null,
      chat: 0
    });
  }

  sendMessage(msg){
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
      }).catch(error =>{console.log(error)});
  }

  updateCase(){
    switch(this.state.c){
      case "list": 
        return(<ChatList serverUrl={this.state.serverUrl} accessToken={this.state.accessToken} logout={this.logout.bind(this)} user={this.state.loggedUser} goToChat={this.goToChat.bind(this)} changeCase={this.changeCase.bind(this)} list={this.state.loggedUser.chats}/>)
      case "chat":
        return (<Chat id={this.state.id} serverUrl={this.state.serverUrl} accessToken={this.state.accessToken} logout={this.logout.bind(this)} sendMessage={this.sendMessage.bind(this)} list={this.state.list} loggedUser={this.state.loggedUser} changeCase={this.changeCase.bind(this)}/>)
      case "newUser":
        return (<NewUser goToChat={this.goToChat.bind(this)} serverUrl={this.state.serverUrl} accessToken={this.state.accessToken} logout={this.logout.bind(this)} name="Chat 1" changeCase={this.changeCase.bind(this)}/>)
      case "newChat":
        return (<NewChat goToChat={this.goToChat.bind(this)} serverUrl={this.state.serverUrl} accessToken={this.state.accessToken} logout={this.logout.bind(this)} changeCase={this.changeCase.bind(this)} loggedUser={this.state.loggedUser}/>)
      case "unlogged":
        return (<Unlogged serverUrl={this.state.serverUrl} changeUserState={this.changeUserState.bind(this)}/>)
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