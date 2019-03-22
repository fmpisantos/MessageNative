import * as React from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity,ScrollView} from 'react-native';
import { Constants } from 'expo';
import LogOut from '../NavBars/onlyLogout';
import Plus from '../NavBars/withPlus';
import GoBack from '../NavBars/withOutPlus';
import Input from '../input';

export default class NewUser extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name : this.props.name,
      email : "",
      list:[
        {
            email: "filipesantos.sporting@gmail.com"
        },
        {
            email: "pipas.sporting@gmail.com"
        }
      ]
    }
  }

  updateName(name){
      this.setState({
        name : name
      });
  }

  removeEmail(key){
    let l = this.state.list;
    l.splice(key,1);
    this.setState({
      list: l
    });
  }

  addEmail(){
    let l = this.state.list;
    l.push(this.state.email);
    this.setState({
      list:l
    });
  }

  updateEmail(email){
    this.setState({
      email:email
    });
  }

  submit(){
    console.log("Submit");
    this.props.changeCase("chat")
  }

  goToChat(){
    this.props.changeCase("chat")
  }

  render() {
    return (
      <View >
            <GoBack func={this.goToChat.bind(this)}/>
            <LogOut/>
            <View style={styles.containerNewUser}>
                <Text style={{alignSelf:"center",paddingTop:10,fontSize:15}}>Chat Name</Text>
                <TextInput
                    style={{textAlign:"center",margin:20,borderColor: 'black', borderWidth: 1, backgroundColor:"#857676"}}
                    onChangeText={(name) => this.updateName.bind(this)(name)}
                    value={this.state.name}
                />
              <ScrollView style={{flexGrow: 0,borderWidth: 1, borderColor: '#603434',marginHorizontal:10,maxHeight:350}} 
                ref={ref => this.scrollView = ref}
                onContentSizeChange={(contentWidth, contentHeight)=>{        
                this.scrollView.scrollToEnd({animated: true});
              }}>
                  <Text style={{textAlign: 'center'}}>User Emails</Text>
                  {this.state.list.map((item,key)=>{
                    return(
                      <View style={{flexDirection: 'row',right:40,padding:2}}>
                        <Text style={styles.emailsList}>{item.email}</Text>
                        <TouchableOpacity style={styles.buttonX} onPress={this.removeEmail.bind(this,key)}>
                          <Text style={styles.buttonText}>&times;</Text>
                        </TouchableOpacity>
                      </View>
                    )
                  })}
              </ScrollView>
              <TextInput
                    style={{textAlign:"center",margin:20,borderColor: 'black', borderWidth: 1, backgroundColor:"#857676"}}
                    onChangeText={(email) => this.updateEmail.bind(this)(email)}
                    value={this.state.email}
                    onSubmitEditing={this.addEmail.bind(this)}
                />
                <TouchableOpacity style={styles.button} onPress={this.submit.bind(this)}>
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerNewUser:{
    backgroundColor: "#C4C4C4",
    marginTop:40,
    height: "90%",
    marginHorizontal:20,
    alignSelf:"center",
    width:"90%"
  },
  emailsList:{ 
    textAlign:"right",
    width: "93%"
  },
  buttonX: {
    marginLeft:10,
    width:"7%",
    backgroundColor:'#603434',
    //borderRadius:10,
    borderWidth: 1,
    borderColor: '#603434'
  },
  buttonText: {
    color:'#fff',
      textAlign:'center',
  },
  button: {
    marginTop: 10,
    marginHorizontal: 50,
    backgroundColor:'#603434',
    //borderRadius:10,
    borderWidth: 1,
    borderColor: '#603434'
  },
});