import React, { Component } from 'react';
import Message from './message';
import '../Css/message.css';

class messageContainer extends Component {
  render() {
    return (
				<div className="messageContainer">
        	{this.props.list.map(function(el,key){
            return <Message key={key} mine={this.props.user===el.email} name={el.name} message={el.mensage}/>
        	},this)}
        </div>
    );
  }
}

export default messageContainer;
