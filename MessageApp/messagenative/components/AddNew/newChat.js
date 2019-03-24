import * as React from 'react';
import { Text, View, StyleSheet, TextInput,TouchableOpacity,ScrollView} from 'react-native';
import { Constants } from 'expo';
import LogOut from '../NavBars/onlyLogout';
import Plus from '../NavBars/withPlus';
import GoBack from '../NavBars/withOutPlus';
import Input from '../input';

export default class NewChat extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      name : "",
      email : "",
      list:[
        {
          email : this.props.loggedUser.email
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

  emailAlreadyIn(){
    for(let i = 0; i < this.state.list;i++){
      if(this.state.list[i].email == this.state.email)
        return false;
    }
    return true;
  }

  addEmail(){
    let l = this.state.list;
    if(!this.emailAlreadyIn()){
    let newEmail = {email : this.state.email};
    l.push(newEmail);
    this.setState({
      list:l
    });
    }
    this.setState({
      email : ""
    });
  }

  updateEmail(email){
    this.setState({
      email:email
    });
  }

  submit(){
    this.props.changeCase("list");
    let ll = [];
    for(let i = 0;i<this.state.list.length;i++)
      ll.push(this.state.list[i].email);
    let send = {
		"name" : this.state.name,
		"userEmails": ll,
		"mensages": []
	}
  console.log(ll);
	if(this.state.name.length==0)
		alert("Please Enter one valid chat name");
	else if(this.state.list.length<1)
		alert("Please add someone to the chat");
	else{
			fetch(this.props.serverUrl+"/newChat/",{
				method: "POST",
				mode: "cors",
				credentials: 'include',
				body: JSON.stringify(send)
			})	
				.then(result => {return JSON.parse(result._bodyText)})
					.then(json => {this.props.goToChat(json.id)})
						.catch(error => {console.log(error)});
		}
  }

  goToList(){
    this.props.changeCase("list");
  }

  cruzOuNao(key){
    if(key!=0){
      return(<TouchableOpacity style={styles.buttonX} onPress={this.removeEmail.bind(this,key)}>
                <Text style={styles.buttonText}>&times;</Text>
              </TouchableOpacity>)
    }
  }

  render() {
    return (
      <View >
            <GoBack func={this.goToList.bind(this)}/>
            <LogOut accessToken={this.props.accessToken} logout={this.props.logout}/>
            <View style={styles.containerNewUser}>
                <Text style={{alignSelf:"center",paddingTop:10,fontSize:15}}>Chat Name</Text>
                <TextInput
                    style={{margin:20,borderColor: 'black', borderWidth: 1, backgroundColor:"#857676"}}
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
                        {this.cruzOuNao(key)}
                      </View>
                    )
                  })}
              </ScrollView>
              <TextInput
                    style={{margin:20,borderColor: 'black', borderWidth: 1, backgroundColor:"#857676"}}
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