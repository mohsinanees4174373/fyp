/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {AsyncStorage, Navigator, BackHandler} from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  Alert,
  ImageBackground,
  YellowBox,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {Icon, Input, ListItem, Divider} from 'react-native-elements';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginActivity from './LoginActivity';

var url = require('../url');

class AdvSignupActivity extends Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
    this.state = {
      Name: '',
      email: '',
      phone: '',
      password: '',
      cnfrmPassword: '',
      Qualification: '',
      Designation: '',
    };
  }

  _storeAdvisorSignUpData = async () => {
    try {
      console.log('storing Data');
      await AsyncStorage.setItem('Name', this.state.Name);
      await AsyncStorage.setItem('email', this.state.email);
      await AsyncStorage.setItem('phone', this.state.phone);
      await AsyncStorage.setItem('password', this.state.password);
      await AsyncStorage.setItem('Qualification', this.state.Qualification);
      await AsyncStorage.setItem('Designation', this.state.Designation);
      //await AsyncStorage.setItem('user', 'student');
      //const value = await AsyncStorage.getItem('user');
      //console.log(value);
    } catch (error) {
      console.log('ethy v error bro');
    }
  };

  checkSignup() {
      //Alert.alert('k');
      this.state.Name = this.state.Name.trim();
      this.state.email = this.state.email.trim();
      this.state.password = this.state.password.trim();
      this.state.cnfrmPassword = this.state.cnfrmPassword.trim();
      this.state.Qualification = this.state.Qualification.trim();
      this.state.Designation = this.state.Designation.trim();
      
    if (this.state.Name== '') {
      Alert.alert('Name cannot be empty!');
    }
    else if (this.state.email== '') {
      Alert.alert('Email cannot be empty!');
    }
    else if (this.state.phone== '') {
      Alert.alert('Phone # cannot be empty!');
    }
    else if (this.state.password== '') {
      Alert.alert('Password cannot be empty!');
    }
    else if (this.state.cnfrmPassword== '') {
      Alert.alert('Confirm Password cannot be empty!');
    }
    else if (this.state.Qualification == '') {
      Alert.alert('Qualification cannot be empty!');
    }
    else if (this.state.Designation == '') {
      Alert.alert('Designation cannot be empty!');
    }
    else if (this.state.cnfrmPassword != this.state.password) {
      Alert.alert('Paswword and Confirm Password does not match!');
    }
    else if (!((/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/).test(this.state.Name)) && !((/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/).test(this.state.Name))){
        Alert.alert('Invalid Name!');
    }
    else if (this.state.phone.length != 5 || isNaN(parseInt(this.state.phone))){
      Alert.alert('Invalid Phone #!');
    }
    else if(this.state.email != ''){
      if(this.state.email.includes("@pucit.edu.pk")){
          var mail = this.state.email.split("@");
          if(mail.length == 2){
              if(mail[1] == "pucit.edu.pk"){
                  fetch(url.base_url + "/checkAdvAvailibility", {
                  //fetch(url + "/checkAdvAvailibility", {
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
                      if(!responseJson[0])
                      {
                          fetch(url.base_url + "/checkAdvAvailibilityInList", {
                          //fetch(url + "/checkAdvAvailibilityInList", {
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
                              if(responseJson[0]){
                                      fetch(url.base_url + "/insertAdvisor", {
                                      //fetch(url + "/insertAdvisor", {
                                      method: 'POST',
                                      headers: {
                                      'Accept': 'application/json',
                                      'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify({
                                      Name: this.state.Name,
                                      phone: this.state.phone,
                                      email: this.state.email,
                                      password: this.state.password,
                                      Qualification: this.state.Qualification,
                                      Designation: this.state.Designation,
                                  })
                              })
                              .then((response) => response.json())
                              .then((responseJson) => {
                              console.log(responseJson);
                              this._storeAdvisorSignUpData();
                              this.props.navigation.navigate('AdvisorHomeScreen');
                              })
                              }
                              else{
                                  Alert.alert('Not registered!');
                              }
                          })
                  }
                  else{
                       Alert.alert('Already Exist!');
                  }
                  })
              }
              else{
                  Alert.alert('Invalid Email!');
              }
          }
          else{
              Alert.alert('Invalid Email!');
          }
      }
      else{
          Alert.alert('Invalid Email!');
      }
    }
  };

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
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Create Account{'\n'}</Text>
            </TouchableHighlight>

            <View style={styles.inputContainer}>
              <Input
                label="Name"
                inputContainer={styles.inputs}
                placeholder="abc"
                leftIcon={
                  <Icon
                    iconStyle={styles.sideMenuIcon}
                    name="person"
                    size={24}
                    color="#2b60de"
                  />
                }
                onChangeText={(Name) => this.setState({Name})}
                returnKeyType="next"
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="Email"
                inputContainer={styles.inputs}
                placeholder="abc@pucit.edu.pk"
                leftIcon={
                  <Icon
                    iconStyle={styles.sideMenuIcon}
                    name="email"
                    size={24}
                    color="#2b60de"
                  />
                }
                onChangeText={(email) => this.setState({email})}
                returnKeyType="next"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="Password"
                inputContainer={styles.inputs}
                placeholder="*********"
                leftIcon={
                  <Icon
                    iconStyle={styles.sideMenuIcon}
                    name="lock"
                    size={24}
                    color="#2b60de"
                  />
                }
                onChangeText={(password) => this.setState({password})}
                returnKeyType="next"
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="Confirm Password"
                inputContainer={styles.inputs}
                placeholder="*********"
                leftIcon={
                  // eslint-disable-next-line prettier/prettier
                  <Icon
                    iconStyle={styles.sideMenuIcon}
                    name="lock"
                    size={24}
                    color="#2b60de"
                  />
                }
                onChangeText={(cnfrmPassword) => this.setState({cnfrmPassword})}
                returnKeyType="next"
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="Mobile No."
                inputContainer={styles.inputs}
                placeholder="0123456"
                leftIcon={
                  <Icon
                    iconStyle={styles.sideMenuIcon}
                    name="phone"
                    size={24}
                    color="#2b60de"
                  />
                }
                onChangeText={(phone) => this.setState({phone})}
                returnKeyType="next"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Qualifiaction"
                inputContainer={styles.inputs}
                placeholder="BSc ..."
                leftIcon={
                  <Icon
                    name="graduation-cap"
                    size={24}
                    type="font-awesome"
                    iconStyle={styles.sideMenuIcon}
                    color="#2b60de"
                  />
                }
                onChangeText={(Qualification) => this.setState({Qualification})}
                returnKeyType="next"
              />
            </View>

            <View style={styles.inputContainer}>
              <Input
                label="Designation"
                inputContainer={styles.inputs}
                placeholder="Professor,Lecturer.."
                leftIcon={
                  <Icon
                    name="tag"
                    size={24}
                    type="font-awesome"
                    iconStyle={styles.sideMenuIcon}
                    color="#2b60de"
                  />
                }
                onChangeText={(Designation) => this.setState({Designation})}
                returnKeyType="go"
              />
            </View>

            <TouchableOpacity
              style={[
                styles.buttonContainer,
                styles.signupButton,
                {marginTop: 20},
              ]}
              onPress={() => this.checkSignup()}>
              <Text style={styles.signupText}>CREATE ACCOUNT</Text>
            </TouchableOpacity>

            <View style={styles.line} />

            <TouchableHighlight>
              <Text>Already Have Account?{'\n'}</Text>
            </TouchableHighlight>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.signinButton]}
              onPress={() => this.props.navigation.navigate('Login')}>
              <Text>SIGN IN</Text>
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
    fontSize: 21,
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
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
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
  signupButton: {
    backgroundColor: '#2B60DE',
    marginBottom: 20,
  },
  signinButton: {
    flex: 0,
    borderWidth: 1,
    borderColor: '#2B60DE',
    marginBottom: 20,
  },
  signupText: {
    color: 'white',
  },
  line: {
    flex: 0,
    backgroundColor: 'black',
    height: 1,
    width: 175,
    marginBottom: 20,
  },
  sideMenuIcon: {
    resizeMode: 'center',
    width: 26,
    height: 26,
    marginRight: 12,
  },
});

export default AdvSignupActivity;
