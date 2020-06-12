import {StyleSheet, Dimensions} from 'react-native';

const winWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
    
    Container: {
       
        flex: 1,
        margin: 0,
        width:winWidth,
        backgroundColor: 'white',
      },
    circleImageLayout: {
        width: 40,
        height: 40,
        borderRadius: 15,
       // flexWrap: 'wrap',
        marginVertical:10,
        resizeMode:'contain'
    },
   
   
    text: {
      fontSize: 23,
      textAlign: 'center',
      fontFamily:'Georgia',
      marginHorizontal:20,
      marginBottom:5,
      color:'white',
    },
    buttonPost:{
        borderRadius:20,
        width:100,
        height:30,
        backgroundColor:'#2b60de' ,
        margin:5
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
containerSearch: {
    backgroundColor: '#2b60de',
  },
});