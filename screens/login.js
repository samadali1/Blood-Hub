import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert,
  ScrollView
} from 'react-native';

import { update_user } from '../src/store/action';
import { connect } from 'react-redux';



import { Ionicons,MaterialCommunityIcons} from '@expo/vector-icons';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email   : '',
      password: '',
      status:'',
    }
  }

  onClickListener = (viewId) => {
    if(this.state.email!==''&&this.state.password!==''){
      fetch('http://192.168.0.106:3002/users/login', {
        method: 'POST', 
        body: JSON.stringify({
        email:this.state.email,
        password:this.state.password,
      }), 
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((res)=>{
        return res.json();
      }).then((user)=>{
        if(user.message==="We didn't found this user!"){
          this.setState({status:"We didn't found this user!"})
        }
        else if(user.message==="Invalid Password!"){
          this.setState({status:"Invalid email or password!"})
        }
        else{
          this.props.store_user(user);
          this.props.navigation.navigate('dashboard')

        }
      })
    }
   

  }
  static navigationOptions = {header:null}
  
  render() {

    return (
      <View style={styles.container}>
        <MaterialCommunityIcons name="medical-bag" size={60} color="#17a2b8" />
        <View><Text style={styles.header}>BloodHub</Text></View>
        
        <View><Text style={styles.header3}>Log in to continue</Text></View>
        <View><Text style={styles.header2}>{this.state.status}</Text></View>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{uri: 'https://img.icons8.com/metro/2x/filled-message.png'}}/>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View>
        
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={require('../assets/pass.png')} />
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({password})}/>
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => this.onClickListener('login')} >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={()=>{this.props.navigation.navigate("signup")}}>
            <Text>Don't have account? Register here
            </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccd5db',
  },
  header:{
    fontSize:35,
    color:'#e74c3c',
    margin: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    paddingBottom: 5,
    marginBottom: 12,
  },
  header2:{
    padding: 4,
    fontSize: 14,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  header3:{
    fontSize:'20px',
    marginBottom: '8px',
    padding: 10,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 10,
    backgroundColor: '#e74c3c',
    color:'white'
  },
  inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
  inputIcon:{
    width:30,
    height:30,
    marginLeft:15,
    justifyContent: 'center',
  },
  buttonContainer: {
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:20,
    width:250,
    borderRadius:30,
  },
  loginButton: {
    backgroundColor: "#17a2b8",
  },
  loginText: {
    color: 'white',
  }
});
const mapDispatchToProps = dispatch => {
  return {
      store_user: (user) => dispatch(update_user(user))
  }
}
export default connect(null, mapDispatchToProps)(Login);
