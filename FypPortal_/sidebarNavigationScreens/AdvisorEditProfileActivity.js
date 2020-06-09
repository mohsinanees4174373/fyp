/* eslint-disable prettier/prettier */
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
  AsyncStorage
} from 'react-native';
import {Icon, Input,ListItem, Divider} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
var url = require('../url');
class AdvisorEditProfileActivity extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      id:'',
      adv_image: '',
      adv_name: '',
      adv_description: '',
      adv_designation: '',
      adv_qualification: '',
      totalSlots : '',
      adv_phone:'',
      adv_email:'',
      uri:'',
      hours:'',
      file:'',
     
    };
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }
  componentDidMount(){
    console.log('calling')
    this.getUser();
    
  }
  getProfilePic = async () =>
  {
    RNFetchBlob
    .fetch('GET', url.base_url + "/getfile?path=" + this.state.adv_image, {})
    .then((res) => {    
      
    this.setState({uri:res.data});
    console.log(this.state.uri);
     })
    .catch((e) => {
    console.log(e)
    });
           
  };
  getUser = async () => {

    const email =  await AsyncStorage.getItem('email');
    console.log(email);
    fetch(url.base_url + "/getAdvisor", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson[0])
      {      
          this.setData(responseJson[0]);
      }
  });
  }
   setData = async(response)=>{
     console.log(response);
      await this.setState({totalSlots:response.fyp_total_slots,
      availableSlots:response.fyp_availiable_slots,
      adv_name: response.Name,
      adv_email:response.email,
      adv_phone:response.phone,
      adv_description: response.description,
      adv_designation: response.Designation,
      adv_qualification: response.Qualification,
      id:response.adv_ID,
      hours:response.visitng_hurs,
      adv_image:response.profile_Pic,
      });
      this.getProfilePic();
      console.log(this.state);
  }
  
  update = async() => {
    alert('aya');
    
    this.setState({adv_available: !this.state.adv_available});
    fetch(url.base_url + "/updateAdvisor", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
     name:this.state.adv_name,
     email:this.state.adv_email,
     phone:this.state.adv_phone,
     qualification:this.state.adv_qualification,
     designation:this.state.adv_designation,
     description:this.state.adv_description,
     id:this.state.id,
     totalSlots:this.state.totalSlots,
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson)
      {
        alert('Profile is Updated !')
        this.props.navigation.goBack();
      }
  });
  //this.props.navigation.navigate('AdvisorEditProfile');
  
  }
  render() {

    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
          { this.state.uri? <Image source={{uri: `data:jpeg;base64,${ this.state.uri}`}}  style={styles.image} /> :<Image source={require('../assets/images/av2.png')} style={styles.image}/>}
          <View style={styles.inputContainer}>           
             <Input
                 label="Name"
                 inputContainer={styles.inputs}
                 placeholder='abc'
                 leftIcon={
                   <Icon
                   iconStyle={styles.sideMenuIcon}
                     name='person'
                     size={24}
                     color='#2b60de'
                   />  } 
                   onChangeText={adv_name => this.setState({adv_name})}
                 returnKeyType="next"
                 value={this.state.adv_name}
               />    
             </View>
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
                   onChangeText={adv_email => this.setState({adv_email})}
                 returnKeyType="next"
                 keyboardType="email-address"
                 value={this.state.adv_email}

               />    
             </View>
             <View style={styles.inputContainer}>           
             <Input
                 label="Total FYP Slots"
                 inputContainer={styles.inputs}
                 placeholder='No. of Slots'
                 leftIcon={
                   <Icon
                   iconStyle={styles.sideMenuIcon}
                     name='numeric'
                     size={24}
                     color='#2b60de'
                     type='material-community'
                   />  } 
                   onChangeText={totalSlots => this.setState({totalSlots})}
                 returnKeyType="next"
                 value={(this.state.totalSlots).toString()}
                 keyboardType="phone-pad"
                 

               />    
             </View>
            
             <View style={styles.inputContainer}>           
             <Input
                 label="Mobile No."
                 inputContainer={styles.inputs}
                 placeholder='0123456'
                 leftIcon={
                   <Icon
                   iconStyle={styles.sideMenuIcon}
                     name='phone'
                     size={24}
                     color='#2b60de'
                   />  } 
                   onChangeText={adv_phone => this.setState({adv_phone})}
                   returnKeyType="next"
                   keyboardType="phone-pad"
                   value={(this.state.adv_phone).toString()}

                />    
             </View>
             <View style={styles.inputContainer}>           
             <Input
                 label="Description"
                 inputContainer={styles.inputs}
                 placeholder='Details for profile... '
                 leftIcon={
                   <Icon
                   iconStyle={styles.sideMenuIcon}
                     name='subject'
                     size={24}
                     color='#2b60de'

                   />  } 
                   onChangeText={adv_description => this.setState({adv_description})}
                   returnKeyType="next"
                   value={this.state.adv_description}

                />    
             </View>
             <View style={styles.inputContainer}>           
             <Input
                 label="Qualifiaction"
                 inputContainer={styles.inputs}
                 placeholder='BSc ...'
                 leftIcon={
                   <Icon
                   name='graduation-cap'
                    size={24}
                    type='font-awesome'
                   iconStyle={styles.sideMenuIcon}
                    
                     color='#2b60de'
                   />  } 
                   onChangeText={adv_qualification => this.setState({adv_qualification})}
                 returnKeyType="next"
                 value={this.state.adv_qualification}

               />    
             </View>
             
             <View style={styles.inputContainer}>           
             <Input
                 label="Designation"
                 inputContainer={styles.inputs}
                 placeholder='Professor,Lecturer..'
                 leftIcon={
                   <Icon
                   name='tag'
                    size={24}
                    type='font-awesome'
                   iconStyle={styles.sideMenuIcon}
                    
                     color='#2b60de'
                   />  } 
                   onChangeText={adv_designation => this.setState({adv_designation})}
                 returnKeyType="go"
                 value={this.state.adv_designation}

               />    
             </View>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={this.update}>
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
    margin:25,
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
  sideMenuIcon: {
    resizeMode: 'center',
    width: 26,
    height: 26,
    marginRight:12,
  },
});
export default AdvisorEditProfileActivity;
