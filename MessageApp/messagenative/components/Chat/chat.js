import * as React from 'react';
import { Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import { Constants } from 'expo';
import MessageContainer from './MessageContainer/messageContainer';
import WithPlus from '../NavBars/withPlus';
import Logout from '../NavBars/onlyLogout';
import GoBack from '../NavBars/withOutPlus';

export default class Chat extends React.Component {

newUser(){
  this.props.changeCase("newUser");
}

list(){
  this.props.changeCase("list")
}

  render() {
    return (
      <View style={styles.containerChat}>
            <WithPlus func={this.newUser.bind(this)}/>
            <GoBack func={this.list.bind(this)}/>
            <Logout/>
            <MessageContainer sendMessage={this.props.sendMessage} list={this.props.list}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerChat:{
    flex: 1,
  }
});
