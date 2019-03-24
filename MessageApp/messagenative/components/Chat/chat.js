import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import { Constants } from 'expo';
import MessageContainer from './MessageContainer/messageContainer';
import WithPlus from '../NavBars/withPlus';
import Logout from '../NavBars/onlyLogout';
import GoBack from '../NavBars/withOutPlus';

export default class Chat extends React.Component {
  constructor(props){
    super(props);
    this.state={
      list : this.props.list
    }
    
  }

newUser(){
  this.props.changeCase("newUser");
}

list(){
  this.props.changeCase("list")
}

componentDidMount() {
this.interval = setInterval(()=>{
    fetch(this.props.serverUrl+'/?id='+this.props.id,{
        mode:"cors",
      })
      .then(result => {return JSON.parse(result._bodyText)}) //returns the json so the next then gets it
        .then(json => {
          this.setState({list : json.mensages})
        })
        .catch(error=>console.error(error))
  },2000);
}

componentWillUnmount() {
    clearInterval(this.interval);
}

  render() {
    
    return (
      <View style={styles.containerChat}>
            <WithPlus func={this.newUser.bind(this)}/>
            <GoBack func={this.list.bind(this)}/>
            <Logout accessToken={this.props.accessToken} logout={this.props.logout}/>
            <MessageContainer loggedUser={this.props.loggedUser} sendMessage={this.props.sendMessage} list={this.state.list}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerChat:{
    flex: 1,
  }
});
