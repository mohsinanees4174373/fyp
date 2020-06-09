import {StyleSheet, Dimensions} from 'react-native';

const winWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    Container: {
      alignItems: 'center',
      flex: 1,
      margin: 0,
      width:winWidth,
      backgroundColor: 'white',
    },
    top: {
      width:winWidth,
      alignItems: 'center',
      backgroundColor: '#2b60de',
      },
    circleImageLayout: {
      width: 200,
      height: 200,
      borderRadius: 200 / 2,
      flexDirection: 'row',
      flexWrap: 'wrap',
      borderColor:'#FFF',
      borderWidth:2,
      marginVertical:10
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
      color:'white',
      marginTop: 5,
      marginBottom:13
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
      buttonPost:{
        borderRadius:20,
        width:100,
        height:30,
        backgroundColor:'#2b60de' ,
        margin:5
      },
      edit_text:{
       flex:1,
      alignItems:'flex-end'
      
      },
      rowContainer: {
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        marginHorizontal:8,
        marginTop: 8,
        marginBottom: 8,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
    },
    container_row_image: {
      padding: 10,
      marginLeft:16,
      marginRight:16,
      marginTop: 8,
      marginBottom: 8,
      borderRadius: 5,
      backgroundColor: '#eaeaea',
      elevation: 2,
      flex: 1,
      flexDirection: 'row',
  },

  file_adv_name: {
    fontSize: 17,
    fontWeight:'bold',
    color: '#000',
  },
  file_title: {
    fontSize: 16,
    color: '#000',
    justifyContent:'center'
  },

  file_date: {
    fontSize: 11,
  },
  ImageLayout: {
     width: winWidth-50,
     height: 300,
   // borderRadius: 200 / 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor:'#FFF',
    borderWidth:2,
    resizeMode:'contain',
    alignSelf:'auto',
    padding:100,
    marginVertical:10
  },
  imageContainer:{
    flex: 1,
    padding: 10,
    marginHorizontal:8,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    alignItems:'center',
    backgroundColor: '#FFF',
    elevation: 2,
  },
  addFileContainer: {
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    marginHorizontal:8,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#0000',
    elevation: 2,
},
addFile: {
  flex: 1,
  padding: 5,
  marginHorizontal:8,
  marginTop: 8,
  marginBottom: 8,
  borderRadius: 5,
  backgroundColor: '#eaeaea',
  elevation: 2,
},

});