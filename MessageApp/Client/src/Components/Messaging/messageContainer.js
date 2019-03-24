import React, { Component } from 'react';
import Message from './message';
import '../Css/message.css';

class messageContainer extends Component {

  componentDidMount() {
    this.interval = setInterval(() => {this.scrollToEnd()}, 500);
    this.scrollToEnd();
	}
	componentWillUnmount() {
  	clearInterval(this.interval);
	}

  scrollToEnd(){
		var objDiv = document.getElementById("msgContainer");
		objDiv.scrollTop = objDiv.scrollHeight;
	  }

  render() {
    return (
				<div id="msgContainer" className="messageContainer mensageScroll">
        	{this.props.list.map(function(el,key){
            return <Message key={key} mine={this.props.user===el.email} name={el.name} message={el.mensage}/>
        	},this)}
        </div>
    );
  }
}

export default messageContainer;
