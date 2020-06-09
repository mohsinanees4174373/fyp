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
} from 'react-native';
import {Icon} from 'react-native-elements';

class HamburgerIcon extends Component {
    toggleDrawer = () => {
      console.log(this.props.navigationProps);
  
      this.props.navigationProps.toggleDrawer();
    };
    render() {
      return (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
           <Icon
            iconStyle={styles.sideMenuIcon}
            color="#fff"
            name="menu"
            size={28}
            type="material-community"
          />
          </TouchableOpacity>
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
      width: 25,
      height: 25,
      marginLeft: 15,
      marginRight: 20,
      marginBottom:8,
      
    },
  
    menuText: {
      fontSize: 15,
      color: '#222222',
      marginBottom:8,
  
    },
   /*
    sideMenuIcon: {
      resizeMode: 'center',
      width: 26,
      height: 26,
     margin:15,
    },
    */
  });
  export default HamburgerIcon;
