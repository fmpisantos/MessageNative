import React, { Component } from 'react';
import './App.css';
import Input from './Components/Conversation/input';
import MessageContainner from './Components/Messaging/messageContainer';
import UnLoged from './Components/Logs/unLoged';
import firebase from "firebase";
import Loged from './Components/Logs/loged';

firebase.initializeApp({
	apiKey: "AIzaSyDkuIsp07XLzpRhF4EQqUqKtXdV6Etk5bU",
	authDomain: "messages-4197e.firebaseapp.com"
});

class App extends Component {

  constructor(props){
    super(props);
    this.state ={
				loggedUser : false,
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
		//serverUrl: "http://ec2-35-180-111-20.eu-west-3.compute.amazonaws.com:9999",
		//serverUrl: "http://localhost:8080"
		//serverUrl: "https://whatsapp-234719.appspot.com/"
		serverUrl: "https://api.messagenative.com"
    }
}

  addItem(msg){
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
			credentials: 'include',
			body: JSON.stringify(l)
			})
				.then(result =>{return result.json()})
					.then(json=>{console.log(json);console.log(this.state.user)})
						.catch(error =>{console.log(error)});
  }

	changeUserState(userUpdated){
		this.setState({
			loggedUser : userUpdated,
			user : userUpdated.email
		});
	}

	getConv(id){
		fetch(this.state.serverUrl+'/?id='+id,{
				credentials: 'include',
			})
			.then(result => {return result.json()}) //returns the json so the next then gets it
				.then(json => {
					this.setState({list : json.mensages,chat:json,chatLogged: true})
				})
				.catch(error=>console.error(error))
				return 0;
	}

	clearChatLogged(){
	this.setState({
		chatLogged : false
	});
}

newChatLog(){
	this.setState({
		chatLogged : "new"
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

  render() {
	let l ;
	if(!!this.state.loggedUser){	
		l = <Loged serverUrl={this.state.serverUrl} newChatLog={this.newChatLog.bind(this)} chatLogged={this.state.chatLogged}  clearChatLogged={this.clearChatLogged.bind(this)}  getConv={this.getConv.bind(this)} chat={this.state.chat}  firebase={firebase} logout={this.logout.bind(this)} loggedUser={this.state.loggedUser}  user={this.state.user} list={this.state.list} addItem={this.addItem.bind(this)}/>;
		}else{
		l = <UnLoged serverUrl={this.state.serverUrl} changeUserState={this.changeUserState.bind(this)} firebase={firebase}/>; 
		}
    return (
      <div className="App">
				{l}
      </div>
    );
  }
}

export default App;
