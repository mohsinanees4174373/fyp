import {StyleSheet, Dimensions} from 'react-native';

const winWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    Container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 0,
      width:winWidth,
      //ckgroundColor: 'white',
    },
    top: {
      width:winWidth,
      //height: 500,
      //alignItems: 'center',
      justifyContent: 'center',
      //backgroundColor: '#2b60de',
      },
    circleImageLayout: {
      width: winWidth/2,
      height: 55,
      alignItems: 'center',
      //borderRadius: 200 / 2,
      //flexDirection: 'row',
      //flexWrap: 'wrap',
      //borderColor:'#FFF',
      //borderWidth:0,
      marginVertical:10,
      marginLeft:winWidth/4,
      marginTop:20,
    },
    switch: {
      width: winWidth-30,
      height: 100,
      backgroundColor:'#16a3b1',
      borderRadius:10,
      marginVertical:-10,
      flexDirection:'row',
      justifyContent:'space-between',
      alignContent:'flex-start'
    },
    stu_switch: {
        width: winWidth-30,
        height: 100,
        backgroundColor:'#16a3b1',
        borderRadius:10,
        marginVertical:-10,
        flexDirection:'column',
        alignItems: 'center',
        flex: 1,
    },
    onSwitch:{
      backgroundColor:'#000'
    },
    black:{
      color:'#000',
      marginVertical:-3,
      marginRight:8
    },
    switchText: {
      flexDirection:'column',
      flexWrap:'wrap'
    },
    text: {
      fontSize: 23,
      textAlign: 'center',
      fontFamily:'Georgia',
      marginHorizontal:20,
      marginBottom:5,
      color:'white',
    },
    profileText: {
      fontSize: 28,
      textAlign: 'center',
      color:'white',
      marginHorizontal:20,
      marginTop: 2,
      fontWeight:'bold'
    },
    descriptionText: {
      fontSize: 15,
      textAlign: 'center',
      marginHorizontal:20,
      color:'blue',
      //marginTop: 5,
      marginBottom:10,
    },
    slotText: {
      fontSize: 15,
      textAlign: 'center',
      marginHorizontal:20,
      color:'black',
      marginTop: 5,
      fontWeight:'bold',
    },
    AvailableText: {
      fontSize: 20,
      textAlign: 'center',
      marginHorizontal:20,
      color:'#FFF',
      fontWeight:'bold',
      marginTop:20
      
    },
    NotAvailableText:{
      color:'red',
    },
    TimeText: {
      fontSize: 15,
      marginHorizontal:10,
      color:'#FFF',
      marginTop:10  
    },
    buttons:{
      flex:1,
      flexDirection:'row',
      marginVertical:20,
      marginHorizontal:20,
      backgroundColor:'transparent',
      //justifyContent:'space-between',
      },
      buttonStyle:{
        borderRadius:20,
        width:(winWidth- (winWidth*0.52)-5),
        backgroundColor:'#2b60de' ,
        padding:12,
        margin:5
      },
      edit_text:{
       flex:1,
      alignItems:'flex-end'
      
      },
      Button1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft:10,
    //width:300,
    borderRadius: 50,
    alignSelf: 'stretch',
    height:45,
    width:"45%",
  },
  Button2: {
    justifyContent: 'center',
    alignItems: 'center',
    width:"45%",
    borderRadius: 50,
    alignSelf: 'stretch',
    marginRight: 10,
    marginLeft:10,
    height:45
  },
  sideBySideButtonContainer:
  {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"row",
    width:"100%",
  },
  registerButton: {
    flex: 0,
    borderWidth: 1,
    borderColor: '#2B60DE',
    marginBottom: 10,
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
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  loginText: {
    color: '#2B60DE',
  },
   loginButton: {
       borderWidth: 1,
       borderColor: '#2B60DE',
    //backgroundColor: '#2B60DE',
  },
  line: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black',
    height: 1,
    width: 175,
    marginBottom: 15,
  },
  line2: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'black',
    height: 1,
    width: 175,
    marginTop: 5,
  },
  buttonContainerForgetPwd: {
    flex: 1,
    height: 45,
    //flexDirection: 'row',
    //justifyContent: 'center',
    //alignItems: 'right',
    //marginBottom:10,
    //width:300,
    //borderRadius: 50,
    alignSelf: 'stretch',
    //marginLeft: 220,
    marginRight: 10,
  },

  forgetPwd: {
    flex: 1,
    textAlign: 'right',
    color: '#2b60de',
    textDecorationLine: 'underline',
    alignSelf: 'stretch',
    marginTop: 10,
  },
  });