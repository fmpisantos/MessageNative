import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { Constants } from 'expo';

export default class ListElement extends React.Component {

  render() {
    return (
      <TouchableOpacity style={styles.containerListElement} onPress={this.props.goToChat}>
          <Text style={styles.button}>{this.props.name}</Text>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  containerListElement: {
    marginTop:10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button:{
    borderWidth: 1.5,
    color:"white",
    borderColor: '#fff',
    padding:30,
    paddingHorizontal: 120, 
    fontSize: 20,
    fontWeight: 'bold',
  }
});