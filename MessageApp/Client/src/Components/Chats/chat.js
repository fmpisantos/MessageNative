import React, { Component } from 'react';
import '../Css/listChats.css';
import MessageContainner from '../Messaging/messageContainer';
import Input from '../Conversation/input';
import NewChat from './newUser.js';

class chat extends Component {

	constructor(props){
		super(props);
		this.state = {
			addUsers : false
		};
	}

	toggleAddUser(){
		let l = !this.state.addUsers;
		this.setState({
			addUsers : l
		});
	}

	componentDidMount() {
  	this.interval = setInterval(() => {this.props.getConv(this.props.chat.id)}, 2000);
	}
	componentWillUnmount() {
  	clearInterval(this.interval);
	}

  render() {
   return (
	 		<div>
				<div className="logout">
					<button onClick={this.props.logout} >LOGOUT</button>
				</div>
      	<div className="chatContainer">
					{!!!this.state.addUsers?(
					<div>
						<button className="closeButton" onClick={this.props.clearChatLogged}>&times;</button>
						<button className="addButton" onClick={this.toggleAddUser.bind(this)}  >+</button>
						<br/>
						<MessageContainner serverUrl={this.props.serverUrl} user={this.props.user} list={this.props.list}/>
    				<Input serverUrl={this.props.serverUrl} addItem={this.props.addItem}/>
					</div>
					):(
						<div>
							<button className="closeButton" onClick={this.toggleAddUser.bind(this)}>&times;</button>
							<br/>
							<NewChat serverUrl={this.props.serverUrl} user={this.props.user} chat={this.props.chat} list={this.props.chat.userEmails} toggleAddUser={this.toggleAddUser.bind(this)}/>
						</div>
					)
					}
				</div>
      </div>
    );
  }
}

export default chat;
