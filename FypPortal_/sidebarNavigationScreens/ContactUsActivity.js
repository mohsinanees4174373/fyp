/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import email from 'react-native-email';
import {Icon, Input,ListItem, Divider} from 'react-native-elements';

export default class ContactUsActivity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      subject: '',
      message: '',
    };
  }

  render() {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../assets/images/Pu.png')}
          />

          <View style={styles.line} />

          <Text style={styles.heading}> Get in Touch </Text>

         
          <View style={styles.inputContainer}>
             
             <Input
                 label="Subject"
                 inputContainer={styles.inputs}
                 placeholder='Write subject here...'
                 returnKeyType="next"
                 leftIcon={
                   <Icon
                   iconStyle={styles.sideMenuIcon}
                     name='subject'
                     size={24}
                     type='material-icons'
                     color='#2b60de'
                   />  } 
                   onChangeText={subject => this.setState({subject})}
               />    
             </View>
            <View style={styles.inputMsgContainer}>
             
                        
            <Input
                 label="Message"
                 inputContainer={styles.inputs}
                 placeholder='Write Message here...'
                 leftIcon={
                   <Icon
                   iconStyle={styles.sideMenuIcon}
                     name='edit'
                     size={24}
                     type='font-awesome'
                     color='#2b60de'
                   />  } 
                   returnKeyType="go"
              multiline={true}
              onChangeText={message => this.setState({message})}
               />    
            </View>
          <TouchableOpacity
            style={[styles.buttonContainer, styles.loginButton]}
            onPress={this.handleEmail.bind(this)}>
            <Text style={styles.buttonText}>Send Email</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  handleEmail = () => {
    const to = ['bsef16m010@pucit.edu.pk', 'mahroosh16hashmi@gmail.com']; // string or array of email addresses
    email(to, {
      subject: this.state.subject,
      body: this.state.message,
    }).catch(console.error);
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  line: {
    flex: 1,
    backgroundColor: 'black',
    height: 1,
    width: 175,
    marginTop: 20,
    marginBottom:20
  },
  contactContainer: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  contact: {
    flex: 1,
  },
  heading: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#2B60DE',
    fontSize: 22,
    marginBottom:15

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
    margin:10,
    textAlign: 'center',
  },
  inputMsgContainer: {

    //width:300,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    height: 120,
    marginBottom: 15,
    flexDirection: 'row',
    //alignItems: 'center',
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
  loginButton: {
    backgroundColor: '#2B60DE',
  },
  buttonText: {
    color: 'white',
  },
  sideMenuIcon: {
    resizeMode: 'center',
    width: 26,
    height: 26,
    marginRight:12,
  },
});
