import React, { Component } from 'react';
import '../Css/listChats.css';

class chatsList extends Component {

	constructor(props){
		super(props);
		this.state = {
			list: [],

		}
	}

	componentDidMount = () =>{
			fetch(this.props.serverUrl+"/getUserChats/?uid="+this.props.user.uid,{
				
				credentials: 'include',
			})
			.then(result => {return result.json()})
				.then(json => {this.setState({list : json});})
					.catch(error => console.log(error));

	}

	openConv(item){
		this.props.getConv(item.id);
	}

	newConv(){
		this.props.newChatLog();
	}

  render() {
   return (
      <div >
				<div className="logout">
					<button onClick={()=>{console.log("log me out");this.props.logout()}}>LOGOUT</button>
				</div>
				{
				<div className="listContainer">
					{this.state.list.map(function(item,key){
						return (<div className="row justify-content-center" key={key}>
											<a href="#" className="col-8 elementList" onClick={this.openConv.bind(this,item)}>	
													{item.name}
											</a>
										</div>)
					},this)}		
					<div className="row justify-content-center">
						<a href="#" className="col-8 elementList" onClick={this.newConv.bind(this)}>
							Create new chat 
						</a>
					</div>
				</div>
				}
      </div>
    );
  }
}

export default chatsList;
