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
  AsyncStorage,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
var url = require('../url');
class StudentEditProfileActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uri:'',
      stu_image:'',
      name:'',
      email:'',
      phone:0,
      address:'',
      file:'',
      stu_id:'',
    };
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }
  getProfilePic = async () =>
  {
    console.log("profileeeeeeeeeeeeeeeee");
    RNFetchBlob
    .fetch('GET', url.base_url + "/getfile?path=" + this.state.uri, {})
    .then((res) => {    
      
    this.setState({stu_image:res.data});
    //console.log(this.state.uri);
     })
    .catch((e) => {
    console.log(e)
    });
           
  };
  pickImage=async()=>{
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      console.log(
        res.type,
      );
      this.setState({file:res});
      console.log(this.state.file);
      this.uploadProfile(this.state.file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        console.log('oops');
      } else {
        throw err;
      }
    }
  } 
  uploadProfile=(res)=>{RNFetchBlob.fetch('POST', url.base_url + "/api/upload?folder=adv_profile", {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
  }, [
    { name : 'file', filename : this.state.stu_id + "_"+ res.name, type:res.type, data: RNFetchBlob.wrap(res.uri)},
  ]).then((resp) => {
    console.log("resp");
    var path = resp.data;
    console.log(path);
    this.setState({uri:path}); 
    fetch(url.base_url + "/changeStuProfilePic", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: this.state.stu_id,
        pic: this.state.uri,
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {   
    this.setState({file:''}); 
    this.getProfilePic();

    })
    // ...
  }).catch((err) => {
    console.log('rOLA');
  })
  }
  saveChanges(){
    if(this.state.name == '')
    {
      alert("Please enter Name !")
    }
    else if(this.state.email == '')
    {
      alert("Please enter email! ")
    }
    else if(this.state.phone == '')
    {
      alert("Please enter Phone number !")
      
    }
    else if(this.state.phone.length !=  11)
    {
      alert("Please enter correct phone number !")
    }
    else if(this.state.address == '')
    {
      alert("Please enter address! ")
    }
    else
    {
              fetch( url.base_url + "/UpdateStudentInfo", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: this.state.stu_id,
              email:this.state.email,
              addr: this.state.address,
              phone: this.state.phone,
              name: this.state.name,
              
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson)
            {
              
              alert('Chnages Saved!');
              this.props.navigation.goBack();
            }
            else
            {
              alert('something went wrong!');
            }
            
          })  

  }

  }

  _retriveData = async () => {
    try {
      console.log('retrivingData')
      //await AsyncStorage.setItem('email', 'fatima@pucit.edu.pk');
      const value = await AsyncStorage.getItem("email");
  
  
      fetch( url.base_url + "/getStudentDetails", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: value,
          
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson[0])
        {
          this.setState({uri:responseJson[0].profile_pic});
          this.getProfilePic();
          this.setState({name:responseJson[0].Name});
          this.setState({email:responseJson[0].email});
          this.setState({phone:JSON.stringify(responseJson[0].phone)});
          this.setState({stu_id:responseJson[0].stu_id});
          this.setState({address:responseJson[0].address});

          
        }
        else
        {
          alert('something went wrong!');
        }
        
      })
  
  
    
    } catch (error) {
      console.log(error.message);
    }
    
  }
  onChanged(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            alert("please enter numbers only");
        }
    }
    this.setState({ phone: newText });
}
  componentDidMount(){
    console.log('calling');
    this._retriveData();
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">

          <View style={styles.container}>
          { this.state.stu_image ? <Image source={{uri: `data:jpeg;base64,${this.state.stu_image}`}}  style={styles.image} /> :<Image source={require('../assets/images/av2.png')} style={styles.image}/>}
      
              
            <TouchableOpacity
              style={[styles.uploadbuttonContainer, styles.loginButton]}
              onPress={() => this.pickImage()}>
              <Text style={styles.loginText}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Name{'\n'}</Text>
            </TouchableHighlight>
            <View style={styles.inputContainer}>
              <Image
                style={styles.inpIcons}
                source={{ uri: 'https://www.flaticon.com/premium-icon/icons/svg/2217/2217312.svg',   }}
              />
                
              <TextInput
                style={styles.inputs}
                placeholder="Mohsin Anees"
                placeholderTextColor="#000000"
                value={this.state.name}
                keyboardType="email-address"
                //underlineColorAndroid='transparent'
                onChangeText={txt => this.setState({name:txt})}
              />
            </View>
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Email{'\n'}</Text>
            </TouchableHighlight>

            <View style={styles.inputContainer}>
              <Image
                style={styles.inpIcons}
                source={{
                  uri:
                    'https://www.flaticon.com/premium-icon/icons/svg/2217/2217312.svg',
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="mochinanees@gmail.com"
                placeholderTextColor="#000000"
                
                value={this.state.email}
                //underlineColorAndroid='transparent'
                onChangeText={txt => this.setState({email:txt})}
              />
            </View>

            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Address{'\n'}</Text>
            </TouchableHighlight>
            <View style={styles.inputContainer}>
              <Image
                style={styles.inpIcons}
                source={{
                  uri:
                    'https://www.flaticon.com/premium-icon/icons/svg/2217/2217312.svg',
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="Lahore"
                placeholderTextColor="#000000"

                value={this.state.address}
                //underlineColorAndroid='transparent'
                onChangeText={txt => this.setState({address:txt})}
              />
            </View>

            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Phone Number{'\n'}</Text>
            </TouchableHighlight>
            <View style={styles.inputContainer}>
              <Image
                style={styles.inpIcons}
                source={{
                  uri:
                    'https://www.flaticon.com/premium-icon/icons/svg/2217/2217312.svg',
                }}
              />
              <TextInput
                style={styles.inputs}
                placeholder="+923204174373"
                placeholderTextColor="#000000"
                onChangeText={text => this.onChanged(text)}
                value={this.state.phone}
              />
            </View>
              <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.saveChanges()}>
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
  circleImageLayout: {
    width: 70,
    height: 70,
    borderRadius: 200 / 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor:'#FFF',
    borderWidth:2,
    marginVertical:10
    
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
    marginBottom:10,
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
});
export default StudentEditProfileActivity;
/**
 <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Phone Number{'\n'}</Text>
            </TouchableHighlight>
            <View style={styles.inputContainer}>
              <Image
                style={styles.inpIcons}
                source={{
                  uri:
                    'https://www.flaticon.com/premium-icon/icons/svg/2217/2217312.svg',
                }}
              />
              <TextInput
                style={styles.inputs}
                //placeholder="+923204174373"
                placeholderTextColor="#000000"
                value={this.state.phone}
                //underlineColorAndroid='transparent'
                onChangeText={txt => this.setState({phone:txt})}
              />
            </View>

 */