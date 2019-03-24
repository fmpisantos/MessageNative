import React, { Component } from 'react';

class messageContainner extends Component {
  constructor(props){
    super(props);
    this.state = {
      message : "",
    }
  }

addMessage(){
  this.props.addItem(this.myTextInput.value);
  this.myTextInput.value = "";
}

componentDidMount(){
	document.getElementById("inputMessage").focus();
}

componentDidUpdate(){
	document.getElementById("inputMessage").focus();
}

  render() {
    return (
		<form onSubmit={this.addMessage.bind(this)}>
      <div className="container">
        <div className="row">
          <div className="col-11 col-sm-10 col-xs-10">
            <input className="messageInput" type="text" ref={ref => this.myTextInput = ref} autocomplete="off" autofocus="true" id="inputMessage" />
            </div>
            <div className="col-1 col-sm-2 col-xs-2">
            <button type="submit" className="sendButton">SEND</button>
          </div>
        </div>
      </div>
			</form>
    );
  }
}

export default messageContainner;
