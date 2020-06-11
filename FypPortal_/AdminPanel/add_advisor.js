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
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import EmailSender from 'react-native-smtp';

var url = require('../url');

class add_advisor extends Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
    
    this.state = {
      name: '',
      email : '',
  }
  };

  checkFields() {
    if (this.state.name.trim()== '') {
        Alert.alert('Name cannot be empty!');
    }
    else if (this.state.email== '') {
        Alert.alert('Email cannot be empty!');
    }
    else if (!((/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/).test(this.state.name.trim())) && !((/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/).test(this.state.name.trim()))){
        Alert.alert('Invalid Name!');
    }
    else if(this.state.email != ''){
        if(this.state.email.includes("@pucit.edu.pk")){
          var mail = this.state.email.split("@");
          if(mail.length == 2){
              if(mail[1] == "pucit.edu.pk"){
                  this.state.name = this.state.name.trim();
        fetch(url.base_url + "/checkAdvAvailibilityInList", {
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
            Alert.alert('Advisor already exit!');
        }
        else
        {
          fetch( url.base_url + "/addAdvisor", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              Name: this.state.name,
              email: this.state.email,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            Alert.alert('Advisor added successfully!');
          })
        }
      })
              }else {Alert.alert('Invalid Email!');}
          }else {Alert.alert('Invalid Email!');}
        }else {Alert.alert('Invalid Email!');}
  }
}

  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={{
                uri:
                  'https://paperpks.com/wp-content/uploads/2018/12/pucit.png',
              }}
            />
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.header}>FYP PORTAL</Text>
            </TouchableHighlight>
            <View style={styles.line} />
            <Image
              style={styles.fpasswordIcon}
              source={{
                uri:
                  'https://static.thenounproject.com/png/162962-200.png',
              }}
            />
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Add Advisor{'\n'}</Text>
            </TouchableHighlight>
            <View style={styles.line} />

          <View style={styles.inputContainer}>
              <Image
                style={styles.inpIcons}
                source={{
                  uri:
                    'https://image.flaticon.com/icons/png/128/44/44948.png',
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Person Name"
                returnKeyType="next"
                //keyboardType="text"
                //underlineColorAndroid='transparent'
                onChangeText={name => this.setState({name})}
              />
            </View>  
          <View style={styles.inputContainer}>
              <Image
                style={styles.inpIcons}
                source={{
                  uri:
                    'https://i.dlpng.com/static/png/287100_thumb.png',
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Email Address"
                returnKeyType="next"
                keyboardType="email-address"
                //underlineColorAndroid='transparent'
                onChangeText={email => this.setState({email})}
              />
            </View>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.checkFields()}>
              <Text style={styles.loginText}>Add Advisor</Text>
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
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'blue',
  },
  inputs: {
    height: 45,
    //marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    margin: 10,
    textAlign: 'center',
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
export default add_advisor;
