import {Platform, StyleSheet, Dimensions} from 'react-native';
const winWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
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
        flex:1,
      //width:300,
      alignSelf: 'stretch',
      marginLeft: 20,
      marginRight: 20,
      height:50,
      marginTop:10,
      marginBottom: 20,
      flexDirection: 'row',
      alignItems: 'center',
    
    },
    inputs: {
      borderBottomColor: '#FFFFFF',
      flex: 1,
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
    labelStyle:{
      marginBottom:-10
    },
    picker: {
        width: '90%',
        paddingLeft: 40,
        paddingRight: 20,
        height:40,
        color: '#696969',
      },
      menuItem:{
        color:'#696969'
      },
      dayPickerStyle:
      {
        flex: 1,
         padding: 30,
         backgroundColor: 'pink',
         width:300,
         alignSelf: 'stretch',
         marginLeft: 20,
         marginRight: 20,
         height:50,
         marginTop:10,
         marginBottom: 20,
         flexDirection: 'row',
         alignItems: 'center',
      }


  });