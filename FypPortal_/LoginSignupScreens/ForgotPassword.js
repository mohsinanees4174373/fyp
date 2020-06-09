/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {AsyncStorage, Navigator, BackHandler} from 'react-native'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  YellowBox,
  Alert,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Icon, Input,ListItem, Divider} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import EmailSender from 'react-native-smtp';

var url = require('../url');

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
    
    this.state = {
      email : '',
      newPassword: '',
      user: '',
      RandomNumber: 0,
    };
  }

  _storeEmail = async () => {
    try {
      console.log('storing Data');
      await AsyncStorage.setItem('email', this.state.email);
    } catch (error) {
      console.log('ethy v error bro');
    }
  };
   
  sendEmail() {
      EmailSender.config({
      host: 'smtp.gmail.com',
      port: '587', // Optional. Default to 465
      username: 'mohsinanees62@gmail.com',
      password: 'fypaccount',
      isAuth: 'true', // Optional. Default to `true`
      tls: 'true' // Optional. Default to `true`
    });

    /*
     * Used react-native-fs module to get file path.
     * Keep this array empty if there is no attachment.
     */
    const attachments = [];

    // Now send the mail
    EmailSender.send(
      {
        from: 'mohsinanees62@gmail.com',
        to: this.state.email,
        subject: 'Reset Password',
        body: 'Your New Password : ' + this.state.RandomNumber.toString(),
      },
      attachments, // This second parameter is mandatory. You can send an empty array.
    );
  }

  resetPwd() {
      this.state.RandomNumber = Math.floor(Math.random() * 10000) + 99999 ;
      this.state.newPassword = this.state.RandomNumber.toString();
      if (this.state.user !== null) {
        if(this.state.user === 'student')
        {
            fetch( url.base_url + "/changeStudentPassword", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: this.state.email,
              newPassword: this.state.newPassword,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
                console.log(responseJson);
                this._storeEmail();
                this.sendEmail();
                Alert.alert('New password sent successfully.!');
                this.props.navigation.navigate('Login'); 
                
          })
        }
        else if(this.state.user ==='advisor')
        {
          fetch( url.base_url + "/changeAdvisorPassword", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: this.state.email,
              newPassword: this.state.newPassword,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
                console.log(responseJson);
                this._storeEmail();
                this.sendEmail();
                Alert.alert('New password sent successfully.!');
                this.props.navigation.navigate('Login'); 
          })
        }
      }
  }

  checkFields() {
    if (this.state.email== '') {
        Alert.alert('Email cannot be empty!');
    }
    else{
        fetch(url.base_url + "/checkStdAvailibility", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: this.state.email,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson[0])
        {
            console.log(responseJson);
            this.state.user = 'student';
            this._storeEmail();
            this.resetPwd();
        }
        else
        {
          fetch( url.base_url + "/checkAdvAvailibility", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: this.state.email,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson[0])
            {
                console.log(responseJson);
                this.state.user = 'advisor';
                this._storeEmail();
                this.resetPwd();
            }
            else
            {
              Alert.alert('Invalid Email!');
            }
          })
        }
      })  
  }
}

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={require('../assets/images/Pu.png')}
            />
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.header}>FYP PORTAL</Text>
            </TouchableHighlight>
            <View style={styles.line} />
            <Icon
                    name='lock-question'
                    size={40}
                    type='material-community'
                    color='#2b60de'
                  
                  />
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Recover your Password{'\n'}</Text>
            </TouchableHighlight>
            <View style={styles.line} />

            <View style={styles.inputContainer}>           
             <Input
                 label="Email"
                 inputContainer={styles.inputs}
                 placeholder='abc@pucit.edu.pk'
                 leftIcon={
                   <Icon
                   iconStyle={styles.sideMenuIcon}
                     name='email'
                     size={24}
                     color='#2b60de'
                   />  } 
                   onChangeText={email => this.setState({email})}
                 returnKeyType="next"
                 keyboardType="email-address"
               />    
             </View>


            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.checkFields()}>
              <Text style={styles.loginText}>Get Verification Code</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    height: 150,
    width: 150,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  fpasswordIcon: {
    flex: 1,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    height: 40,
    width: 40,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  headingContainer: {
    flex: 1,
    height: 50,
    //width: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //height: 150,
    //width: 150,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: 'black',
    //textDecorationLine: 'underline'
  },
  signin: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //height: 150,
    //width: 150,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#2B60DE',
    //textDecorationLine: 'underline'
  },
  inpIcons: {
    padding: 10,
    marginLeft: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  inputContainer: {
    //backgroundColor: '#FFFFFF',
    borderRadius: 50,   
    //width:300,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    height: 35,
    marginTop:20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    //marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom:10,
    //width:300,
    borderRadius: 50,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    marginTop:20
  },
  buttonContainerForgetPwd: {
    flex: 0,
    height: 45,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    //marginBottom:10,
    //width:300,
    borderRadius: 50,
    //alignSelf: 'stretch',
    marginLeft: 220,
    marginRight: 10,
  },
  forgetPwd: {
    flex: 1,
    textAlign: 'right',
    textDecorationLine: 'underline',
    alignSelf: 'stretch',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#2B60DE',
  },
  registerButton: {
    flex: 0,
    borderWidth: 1,
    borderColor: '#2B60DE',
    marginBottom: 13,
  },
  loginText: {
    color: 'white',
  },
  line: {
    flex: 0,
    backgroundColor: 'black',
    height: 1,
    width: 175,
    marginBottom: 20,
  },
});
export default ForgotPassword;
