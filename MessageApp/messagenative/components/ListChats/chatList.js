import * as React from 'react';
import { Text, View, StyleSheet, ScrollView} from 'react-native';
import { Constants } from 'expo';
import LogOut from '../NavBars/onlyLogout';
import ListElement from './listElement';
import Plus from '../NavBars/withPlus';

export default class ChatList extends React.Component {

  newChat(){
    console.log("newChat");
    this.props.changeCase("newChat");
  }

  render() {
    return (
      <View>
        <LogOut/>
        <Plus func={this.newChat.bind(this)}/>
        <View style={styles.containerList}>
          <ScrollView style={styles.containerList,{keyboardDismissMode:'on-drag'}}>
          {this.props.list.map((item,key)=>{
            return(
            <ListElement goToChat={this.props.goToChat} name={item.name} key={key} />
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