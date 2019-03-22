import React, { Component } from 'react';
import '../Css/listChats.css';

class newChat extends Component {

constructor(props){
	super(props);

	this.state = {
		list: []
	};
}

componentDidMount(){
document.getElementById("email").focus();
	this.setState({
		list: this.props.list
	});
}

deleteEmail(id){
	let i = this.state.list;
	i.splice(id,1);
	this.setState({
		list: i
	});
}

addEmail(){
		for(let i in this.state.list){
			if(this.state.list[i].toUpperCase() == document.getElementById("email").value.toUpperCase() || document.getElementById("email").value.toUpperCase() == this.props.user.toUpperCase()){
				alert("Email already in list");
				return 0;
			}
		}
		const i = document.getElementById("email").value;
		this.setState(prevState =>({
			list: [...prevState.list, i]
		}));
		document.getElementById("email").value = "";
	}

	submit(){
		let l = this.state.list;
		let send = {
			emailList: l,
			id: this.props.chat.id,
			name: this.props.chat.name
		};
		if(this.state.list.length<1)
			alert("Add at least one valid email to the list!")

			//This need to be update userEmails instead of add userEmails
			fetch(this.props.serverUrl+"/addToChat/",{
				method: "POST",
				mode: "cors",
				credentials: 'include',
				body: JSON.stringify(send)
			})
				.then(response=>{return response.json()})
					.then(json =>{this.props.toggleAddUser()})
						.catch(error=>{console.log(error)});
	}

  render() {
   return (
	 <div>
			<div className="listContainer">
				{this.state.list.map(function(item,key){
					return(
									<div className="row" key={key}>
										<div className="col-1"/>
										<div className="col-10">
											{item}
										</div>
										<div className="col-1">
											<button onClick={this.deleteEmail.bind(this,key)}>&times;</button>
										</div>
									</div>
					)
				},this)
			
				}
			</div>
			<form onSubmit={this.addEmail.bind(this)}>
				<div className="form-group">
    			<label >Email address</label>
					<div className="row">
						<div className="col-11">
    					<input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"/>

  			</div>
				<div className="col-1">
  			<button type="submit" className="btn btn-primary">ADD</button>
				</div>
				</div>
				</div>
			</form>
			<br/>
			<button type="button" className="btn btn-primary" onClick={this.submit.bind(this)} >Submit</button>
		</div>
    );
  }
}

export default newChat;
