import React, { Component } from 'react';
import '../Css/log.css';
import ChatsList from '../Chats/chatsList';
import Chat from '../Chats/chat';
import New from '../Chats/new';

class loged extends Component {

constructor(props){
	super(props);
	}

logout(){
	this.props.firebase.auth().signOut();
	this.props.logout();
}

getConv(id){
this.props.getConv(id);
}

  render() {
    return (
       <div className="container">
			 {!!!this.props.chatLogged?(
			 		<ChatsList serverUrl={this.props.serverUrl} newChatLog={this.props.newChatLog}  getConv={this.getConv.bind(this)}  user={this.props.loggedUser}  logout={this.logout.bind(this)} list={this.props.loggedUser.chats}/>
					):(
									<div>
									{this.props.chatLogged==="new"?
											<New serverUrl={this.props.serverUrl} clearChatLogged={this.props.clearChatLogged} getConv={this.getConv.bind(this)} logout={this.logout.bind(this)} user={this.props.loggedUser}/>
									:
											<Chat serverUrl={this.props.serverUrl} getConv={this.getConv.bind(this)}  chat={this.props.chat}  clearChatLogged = {this.props.clearChatLogged}  logout = {this.logout.bind(this)} user = {this.props.user} list = {this.props.list} addItem = {this.props.addItem}/>
									}
									</div>
					)}
			 </div>
				);
  }
}

export default loged;
