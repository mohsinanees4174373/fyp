/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
import React, {Component} from 'react';

import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
  YellowBox,
  Dimensions,
  Button,
  AsyncStorage
} from 'react-native';
import {Icon} from 'react-native-elements';

class AdvisorCustom_Side_Menu extends Component {

  logout =async()=>{
    await AsyncStorage.setItem('user', '');
    console.log('user');
    this.props.navigation.navigate('Login');
    console.log('logout');
    await AsyncStorage.clear();

  };

  render() 
  {
    return (
      <View style={styles.sideMenuContainer}>
        <Icon
                iconStyle={styles.sideMenuProfileIcon}
                color="#2b60de"
                name="user-circle-o"
                size={150}
                type="font-awesome"
              />

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 20,}}
        />

        <View style={{width: '100%'}}>
          <TouchableOpacity onPress ={() => {this.props.navigation.navigate('AdvisorHome');}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}} >
              <Icon
                iconStyle={styles.sideMenuIcon}
                color="#2b60de"
                name="home"
                size={26}
                type="material-community"
              />
              <Text style={styles.menuText}> Home</Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress ={() => {this.props.navigation.navigate('AdvisorEditProfile');}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}}>
              <Icon
                iconStyle={styles.sideMenuIcon}
                color="#2b60de"
                name="person"
                size={26}
              />
              <Text style={styles.menuText}> View Profile{' '} </Text>
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity onPress ={() => {this.props.navigation.navigate('AboutUs');}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}}>
              <Icon
                iconStyle={styles.sideMenuIcon}
                color="#2b60de"
                name="group"
                size={26}
              />
              <Text style={styles.menuText}>About Us</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity  onPress={() => {this.props.navigation.navigate('ContactUs');}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 20}}>
              <Icon
                iconStyle={styles.sideMenuIcon}
                color="#2b60de"
                name="contacts"
                size={26}
              />
              <Text style={styles.menuText}>Contact Us</Text>
            </View>           
          </TouchableOpacity>  
          
          <TouchableOpacity  onPress={() => {this.props.navigation.navigate('UpdatePswd');}}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}}>
              <Icon
                iconStyle={styles.sideMenuIcon}
                color="#2b60de"
                name="settings"
                size={26}
              />
              <Text style={styles.menuText}>Update Password</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity  onPress={this.logout}>
            <View style={{flexDirection: 'row', alignItems: 'center', marginTop:20}}>
              <Icon
                iconStyle={styles.sideMenuIcon}
                color="#2b60de"
                name="logout"
                size={26}
                type='material-community'
              />
              <Text style={styles.menuText}>Log out</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#e2e2e2',
            marginTop: 15,
          }}
        />
      </View>
    );
  }
}

  class MainActivity extends Component {
    constructor(props) {
      super(props);

      YellowBox.ignoreWarnings([
        'Warning: componentWillMount is deprecated',
        'Warning: componentWillReceiveProps is deprecated',
      ]);
    }

    render() {
      return (
        <View style={styles.MainContainer}>
          <Text style={{fontSize: 23}}> Home Activity </Text>

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
    inpIcons: {
      padding: 10,
      marginLeft: 10,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
      alignItems: 'center',
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
      width: 26,
      height: 26,
      marginLeft: 15,
      marginRight: 20,
      marginBottom:8,

    },

    menuText: {
      fontSize: 15,
      color: '#222222',
      marginBottom:8,

    },
  });
  export default AdvisorCustom_Side_Menu;
