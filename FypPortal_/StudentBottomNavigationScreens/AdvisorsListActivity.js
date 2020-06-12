import React, {Component} from 'react';
import {AsyncStorage, Navigator, Image} from 'react-native'
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  Alert,
  YellowBox,
} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import faker from 'faker';
import {SearchBar, ListItem} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';

var url = require('../url');

class AdvisorsListActivity extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: '',
      uri:'',
    };
    this.arrayholder = [];
    
    fetch(url.base_url + "/fetchAdvisors", {
                      method: 'POST',
                      headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                      body: JSON.stringify({
                  })
    })
    .then((response) => response.json())
     .then((responseJson) => {
            //console.log(responseJson);
            if(responseJson[0]){
               //Alert.alert(responseJson[1].Designation)
               RNFetchBlob
          .fetch('GET', url.base_url + "/getfile?path=" + responseJson[0].profile_Pic , {})
          .then((res) => {    
            
          this.setState({uri:res.data});
          console.log(this.state.uri);
           })
          .catch((e) => {
          console.log(e)
          });


               this.setState({data: [{
                id : responseJson[0].adv_ID,
                avatar_url: this.state.uri,
                name : responseJson[0].Name,
                email: responseJson[0].email,
                phone: responseJson[0].phone,  
                visiting_hour: responseJson[0].visitng_hurs,
                total_slots : responseJson[0].fyp_total_slots,
                available_slots: responseJson[0].fyp_availiable_slots,
                designation: responseJson[0].Designation,
                description: responseJson[0].description,
                availability: responseJson[0].availability, 

                 }]})
    

               var i =0;
               for (i=1; i < Object.keys(responseJson).length ; i++)
                {
                  RNFetchBlob
                  .fetch('GET', url.base_url + "/getfile?path=" + responseJson[i].profile_Pic , {})
                  .then((res) => {    
                    
                  this.setState({uri:res.data});
                  //console.log(this.state.uri);
                   })
                  .catch((e) => {
                  console.log(e)
                  });
                      this.state.data.push(
                        {
                          id : responseJson[i].adv_ID,
                         avatar_url: this.state.uri,
                          name : responseJson[i].Name,
                          email: responseJson[i].email,
                          phone: responseJson[i].phone,  
                          visiting_hour: responseJson[i].visitng_hurs,
                          total_slots : responseJson[i].fyp_total_slots,
                          available_slots: responseJson[i].fyp_availiable_slots,
                          designation: responseJson[i].Designation,
                          description: responseJson[i].description,
                          availability: responseJson[i].availability, 

                        })
                    
                    
                }
            }
            this.arrayholder = this.state.data;
            //console.log(this.state.data);
          })

      

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }
  navigateToProfile = item =>
    this.props.navigation.navigate('Stu_AdvisorProfile', {
      id:item.id,
      image: item.avatar_url,
      email:item.email
    });

  searchFilterFunction = text => {
    console.log("arraySearch");

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({data: newData, search: text});
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      titleStyle={styles.title}
      subtitle={item.designation +'\n'+ item.description}
      
      //leftAvatar={{source: {uri: item.avatar_url}, size: 70}}
      leftAvatar ={ item.avatar_url ? <Image source={{uri: `data:jpeg;base64,${item.avatar_url}`}}  style={styles.circleImageLayout} /> :<Image source={require('../assets/images/av2.png')} style={styles.circleImageLayout}/>}
      
      bottomDivider
      
      onPress ={this.navigateToProfile.bind(this, item)}
    />
  );
  render() {
    const {search} = this.state.search;
    console.log("array"+this.arrayholder);
    console.log("data"+this.state.data);

    return (
      <View style={{flex: 1}}>
         <SearchBar
          placeholder="Search Advisor..."
          onChangeText={text =>this.searchFilterFunction(text)}
          value={this.state.search}
          round={true}
          inputContainerStyle={{
            borderRadius: 20,
            backgroundColor: '#FFF',
            height: 45,
          }}
          containerStyle={styles.container}
          inputStyle={{color: '#2b60de'}}
          searchIcon={{color: '#2b60de', size: 28}}
          clearIcon={{color: '#2b60de', size: 28}}
        />
        <FlatList
          keyExtractor={this.keyExtractor}
          data={this.state.data}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleImageLayout: {
    width: 55,
    height: 55,
    borderRadius: 200 / 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor:'#FFF',
    borderWidth:2,
    marginVertical:10
    
  },
  sideMenuContainer: {
    width: '100%',
    height: '100%',

    alignItems: 'center',
    paddingTop: 20,
  },

  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },

  sideMenuIcon: {
    resizeMode: 'center',
    width: 28,
    height: 28,
    marginRight: 10,
    marginLeft: 20,
  },

  menuText: {
    fontSize: 15,
    color: '#222222',
  },
  title: {
    color: '#2b60de',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#2b60de',
  },
});

export default AdvisorsListActivity;
/*
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

class AdvisorsListActivity extends Component {
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
      ForgotPassword:'',
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
export default AdvisorsListActivity;
*/