import React, {Component} from 'react';

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

var url = require('../url');

class AdminEditProfileActivity extends Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
    this.state = {
      email: this.props.navigation.state.params.admin_email,
      Name : this.props.navigation.state.params.admin_name,
      password : this.props.navigation.state.params.admin_pwd,
    };
    
  }

    checkFields() {
    this.state.Name= this.state.Name.trim();
    this.state.password=this.state.password.trim();
    this.state.email=this.state.email.trim();
    //this.state.phone=parseInt(this.state.phone);
    //this.state.Degree=this.state.Degree.trim();
    if (this.state.Name== '') {
      Alert.alert('Name cannot be empty!');
    }
    else if (this.state.email== '') {
      Alert.alert('Email cannot be empty!');
    }
    else if (this.state.password == '') {
      Alert.alert('Password cannot be empty!');
    }
    else if (!((/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/).test(this.state.Name)) && !((/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/).test(this.state.Name))){
        Alert.alert('Invalid Name!');
    }
   else if (this.state.password.includes(" ")) {
      Alert.alert('Invalid Password!');
    }
    else if(this.state.email != ''){
      if(this.state.email.includes("@pucit.edu.pk")){
          var mail = this.state.email.split("@");
          if(mail.length == 2){
              if(mail[1] == "pucit.edu.pk"){
                  fetch(url.base_url + "/checkAdminAvailability", {
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
                          fetch(url.base_url + "/updateAdminInfo", {
                          method: 'POST',
                          headers: {
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          Name: this.state.Name,
                          email: this.state.email,
                          password: this.state.password,
                      })
                  })
                  .then((response) => response.json())
                  .then((responseJson) => {
                          //Alert.alert(this.state.qual);    
                          Alert.alert('Successfully Updated!');
                          this.props.navigation.navigate('AdminProfile');
                  })
                  }
                  else{
                       Alert.alert('Does Not Exist!');
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
    const { navigation } = this.props; 
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
            <TouchableHighlight style={styles.headingContainer1}>
              <Text style={styles.header}>FYP PORTAL</Text>
            </TouchableHighlight>
            <View style={styles.line} />
            <Image
              style={styles.fpasswordIcon}
              source={{
                uri:
                  'https://image.flaticon.com/icons/png/512/30/30663.png',
              }}
            />
            <TouchableHighlight style={styles.headingContainer1}>
              <Text style={styles.signin1}>Edit Profile{'\n'}</Text>
            </TouchableHighlight>
            <View style={styles.line} />
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Name{'\n'}</Text>
            </TouchableHighlight>
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
                //placeholderTextColor="#000000"
                defaultValue = {this.props.navigation.state.params.admin_name}
                returnKeyType="next"
                //keyboardType="email-address"
                //underlineColorAndroid='transparent'
                onChangeText={email => this.setState({Name})}
              />
            </View>
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Email Address{'\n'}</Text>
            </TouchableHighlight>

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
                //placeholderTextColor="#000000"
defaultValue = {this.props.navigation.state.params.admin_email}
                //secureTextEntry={true}
                returnKeyType="go"
                //underlineColorAndroid='transparent'
                onChangeText={password => this.setState({email})}
              />
            </View>
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Password{'\n'}</Text>
            </TouchableHighlight>
            <View style={styles.inputContainer}>
              <Image
                style={styles.inpIcons}
                source={{
                  uri:
                    'https://i.pinimg.com/originals/4d/eb/3c/4deb3c920b25c70288af20d66c559b72.png',
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Password"
                //placeholderTextColor="#000000"
                //secureTextEntry={true}
                returnKeyType="go"
defaultValue = {this.props.navigation.state.params.admin_pwd}
                //underlineColorAndroid='transparent'
                onChangeText={password => this.setState({password})}
              />
            </View>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.checkFields()}>
              <Text style={styles.loginText}>Save Changes</Text>
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
    borderRadius: 50,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    resizeMode: 'contain',
    alignItems: 'center',
  },
  headingContainer: {
    flex: 1,
    height: 22,
    //width: 200,
    flexDirection: 'row',
  },

  signin: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //height: 150,
    //width: 150,
    fontSize: 14,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#2B60DE',
    marginLeft: 20,

    //textDecorationLine: 'underline'
  },
  image: {
    marginTop: 20,
    height: 128,
    width: 128,
    borderRadius: 64,
  },
  inpIcons: {
    padding: 10,
    marginLeft: 7,
    height: 23,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  inputContainer: {
    borderColor: '#2B60DE',
    //backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    //width:300,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    height: 32,
    marginBottom: 15,
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
    borderRadius: 10,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
  },
  uploadbuttonContainer: {
    height: 37,
    //marginBottom:10,
    //width:300,
    borderRadius: 10,
    width: 100,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 15,
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
  logo: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    height: 150,
    width: 150,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  headingContainer1: {
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
  signin1: {
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
  fpasswordIcon: {
    flex: 1,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    height: 40,
    width: 40,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  line: {
    flex: 0,
    backgroundColor: 'black',
    height: 1,
    width: 175,
    marginBottom: 10,
  },
});
export default AdminEditProfileActivity;
