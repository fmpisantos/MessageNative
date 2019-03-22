import React, { Component } from 'react';
import '../Css/listChats.css';

class newChat extends Component {

	constructor(props){
		super(props);
		this.state={
			list: []		
		};
	}

componentDidMount(){
	document.getElementById("name").focus();
}

	deleteEmail(id){
	let l = this.state.list;
	l.splice(id,1);
		this.setState({
			list: l 
		});
	}

	addEmail(){
		for(let i in this.state.list){
			if(this.state.list[i].toUpperCase() == document.getElementById("user").value.toUpperCase() || document.getElementById("user").value.toUpperCase() == this.props.user.email.toUpperCase())
				alert("Email already in list");
			}	
		if(document.getElementById("user").value.length<1)
				alert("Please Enter a valid email");
		else{
		const i = document.getElementById("user").value;
		this.setState(prevState =>({
			list: [...prevState.list, i]
		}));
		document.getElementById("user").value = "";
		}
	}

	submitNewChat(){
	let l= this.state.list;
	let send = {
		"name" : document.getElementById("name").value,
		"userEmails": l,
		"mensages": []
	}
	if(document.getElementById("name").value.length==0)
		alert("Please Enter one valid chat name");
	else if(this.state.list.length<1)
		alert("Please add someone to the chat");
	else{
			l.push(this.props.user.email);
			fetch(this.props.serverUrl+"/newChat/",{
				method: "POST",
				mode: "cors",
				credentials: 'include',
				body: JSON.stringify(send)
			})	
				.then(result => {return result.json()})
					.then(json => {this.props.getConv(json.id)})
						.catch(error => {console.log(error)});
		}
	}

  render() {
   return (
	 		<div>
				<div className="logout">
					<button onClick={this.props.logout} >LOGOUT</button>
				</div>
      	<div className="chatContainer">
					<button className="closeButton" onClick={this.props.clearChatLogged}>&times;</button>
					<br/>
					<div className="form-group">
    				<label >Chat Name</label>
    				<input type="text" className="form-control" id="name" aria-describedby="Chat name" placeholder="Chat Name"/>
 					</div>
					<div className="form-group">
					<div className="row">
						<div className="col-1"/>
						<div className="col-10">
							{this.props.user.email}
						</div>
					</div>
						{this.state.list.map(function(item,key){
							return (
											<div className="row" key={key}>
											<div className="col-1"/>
											<div className="col-10">
												{item}	
											</div>
											<div className="col-1">
												<button className="closeButton pequeno" onClick={this.deleteEmail.bind(this,key)}>&times;</button>
											</div>
											</div>
							)
						},this)
						}
					</div>
					<form onSubmit={this.addEmail.bind(this)}>
  				<div className="form-group">
    				<label >Add Users</label>
    				<input type="email" className="form-control" id="user" placeholder="User Email"/>
						<button type="submit" className="pequeno" >Add</button>
  				</div>
					</form>
  				<button type="submit" onClick={this.submitNewChat.bind(this)} className="btn btn-primary">CREATE</button>
				</div>
      </div>
    );
  }
}

export default newChat;
