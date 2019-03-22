import React, { Component } from 'react';
import '../Css/log.css';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


class unLoged extends Component {

constructor(props){
	super(props);
}

uiConfig = {
	signInFlow: "redirect",
	signInOptions: [
		this.props.firebase.auth.GoogleAuthProvider.PROVIDER_ID
	],
	callbacks: {
		signInSuccess : ()=>false
	}
}

componentDidMount = () =>{
	this.props.firebase.auth().onAuthStateChanged(user =>{
		fetch(this.props.serverUrl+"/login/",{
			method: "POST",
			credentials: "include",
  			rejectUnauthorized: false,
			body: JSON.stringify(user.providerData[0])
		})
			.then(result =>{return result.json()})
				.then(json => {this.props.changeUserState(json)})
					.catch(error => {console.log(error)});
	});
}

  render() {
    return (
       <div className="container">
           <div className="row justify-content-md-center">         
			 				<div className="signContainer col-3">
									<StyledFirebaseAuth
										uiConfig={this.uiConfig}
										firebaseAuth={this.props.firebase.auth()}
									/>	
							</div>
					 </div>
			 </div>
				);
  }
}

export default unLoged;
