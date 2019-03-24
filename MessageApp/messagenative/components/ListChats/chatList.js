import * as React from 'react';
import { Text, View, StyleSheet, ScrollView} from 'react-native';
import { Constants } from 'expo';
import LogOut from '../NavBars/onlyLogout';
import ListElement from './listElement';
import Plus from '../NavBars/withPlus';

export default class ChatList extends React.Component {

  constructor(props){
    super(props);
     this.state = {
       list:[]
     }
  }

  newChat(){
    this.props.changeCase("newChat");
  }

  componentDidMount = () =>{
			fetch(this.props.serverUrl+"/getUserChats/?uid="+this.props.user.uid,{
			})
			.then(result => {return JSON.parse(result._bodyText)})
				.then(json => {this.setState({list : json});})
					.catch(error => console.log(error));
	}

  goToChat(i){
    this.props.goToChat(this.state.list[i].id);
  }

  render() {
    return (
      <View>
        <LogOut accessToken={this.props.accessToken} logout={this.props.logout}/>
        <Plus func={this.newChat.bind(this)}/>
        <View style={styles.containerList}>
          <ScrollView style={styles.containerList,{keyboardDismissMode:'on-drag'}}>
          {this.state.list.map((item,key)=>{
            return(
            <ListElement goToChat={this.goToChat.bind(this,key)} name={item.name} key={key} />
            )
          })}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerList: {
    backgroundColor: "#C4C4C4",
    marginTop:40,
    height: "90%",
    marginHorizontal:20,
  }
});