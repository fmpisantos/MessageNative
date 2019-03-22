import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import { Constants } from 'expo';

export default class Message extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      max : 40
    }
    let m = 40;
    m= this.props.name.length>this.props.message.length?m:this.props.name.length;
    m= m<50?m:50;
    this.setState({
      max:m
    });
  }
  render() {
    return (
      <View style={this.props.mine?styles.mineContainner:styles.otherContainner}>
        {/*<Text style={{fontWeight: 'bold'},this.props.mine?(styles.mine,{paddingStart:this.state.max}):(styles.other,{paddingEnd:this.state.max})}>*/}
        <View  style={{borderBottomColor: 'white',borderBottomWidth: 0.5,marginBottom:7}}>
          <Text style={this.props.mine?styles.mineText:styles.otherText}>
            {this.props.name}
          </Text>
        </View>
        <Text style={this.props.mine?styles.mineText:styles.otherText}>
          {this.props.message}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mineContainner:{
    backgroundColor: '#7F5E5E',
    marginLeft: 'auto',
    paddingHorizontal: 5,
    maxWidth: 230,
    minWidth: 75,
    padding: 2,
    margin: 3
  },
  otherContainner:{
    backgroundColor: '#483D3D',
    marginRight: 'auto',
    paddingHorizontal: 5,
    maxWidth: 230,
    minWidth: 75,
    padding: 2,
    margin: 3
  },
  mineText:{
    textAlign: 'right',
    color: '#C4C4C4',
  },
  otherText: {
    textAlign: 'left',
    color: "#C4C4C4",
  }
});