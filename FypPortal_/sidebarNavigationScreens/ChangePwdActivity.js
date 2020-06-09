/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
var url = require('../url');
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
import {Icon, Input, ListItem, Divider} from 'react-native-elements';

class ChangePwdActivity extends Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: AsyncStorage has been extracted',
    ]);
    this.state = {
      oldPass: '',
      newPass: '',
      email: '',
      user: '',
      OldPassword: '',
    };
  }
  _retriveData = async () => {
    try {
      console.log('retrivingData');
      this.state.email = await AsyncStorage.getItem('email');
      const value = await AsyncStorage.getItem('password');
      this.setState({OldPassword: value});
      this.state.user = await AsyncStorage.getItem('user');
    } catch (error) {
      console.log(error.message);
    }
  };
  _storeData = async () => {
    try {
      console.log('storing Data');

      await AsyncStorage.removeItem('password');
      await AsyncStorage.setItem('password', this.state.newPass);
      this.state.OldPassword = await AsyncStorage.getItem('password');
    } catch (error) {
      console.log(error.message);
    }
  };
  updatePassword() {
    if (this.state.newPass == '') {
      Alert.alert('Please fill the new password filed.');
    } else if (this.state.oldPass == '') {
      Alert.alert('Please fill the old password filed.');
    } else {
      console.log(this.state.oldPass);
      console.log(this.state.email);
      console.log(this.state.OldPassword);
      if (this.state.oldPass !== this.state.OldPassword) {
        Alert.alert('Old password dosnt match!');
      } else {
        console.log(this.state.user);
        var callUrl;
        if (this.state.user === 'student') {
          callUrl = '/changeStudentPassword';
        } else {
          callUrl = '/changeAdvisorPassword';
        }
        fetch(url.base_url + callUrl, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            newPassword: this.state.newPass,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            console.log(responseJson);
            if (responseJson) {
              this.OldPassword = this.state.newPass;
              console.log(this.state.newPass);
              console.log(this.state.OldPassword);
              this._storeData();
              Alert.alert('Password Changed Successfully !');
              this.newPass = '';
              this.oldPass = '';
            }
          });
      }
    }
  }
  componentDidMount() {
    console.log('calling');
    this._retriveData();
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

            <View style={styles.line} />
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.heading}>Change Password{'\n'}</Text>
            </TouchableHighlight>

            <View style={styles.inputContainer}>
              <Input
                label="Old Password"
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
                onChangeText={(text) => this.setState({oldPass: text})}
                returnKeyType="next"
                secureTextEntry={true}
              />
            </View>
            <View style={styles.inputContainer}>
              <Input
                label="New Password"
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
                onChangeText={(txt) => this.setState({newPass: txt})}
                returnKeyType="go"
                secureTextEntry={true}
              />
            </View>
            <TouchableOpacity
              style={[styles.buttonContainer, styles.chngPwdButton]}
              onPress={() => this.updatePassword()}>
              <Text style={styles.btnText}>Change Password</Text>
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
  heading: {
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
  chngPwdButton: {
    marginTop: 20,
    backgroundColor: '#2B60DE',
  },
  btnText: {
    color: 'white',
  },
  line: {
    flex: 0,
    backgroundColor: 'black',
    height: 1,
    width: 175,
    marginBottom: 20,
    marginTop: 20,
  },
  sideMenuIcon: {
    resizeMode: 'center',
    width: 26,
    height: 26,
    marginRight: 12,
  },
});
export default ChangePwdActivity;
