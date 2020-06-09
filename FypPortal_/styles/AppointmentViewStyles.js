import { Platform, StyleSheet, Dimensions } from "react-native";
import { AppStyles } from "./RequestFormStyle";
//import { Configuration } from "./Configuration";



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  
  
  SectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft:20,
    flex:1
  },
  
  description: {
    flexDirection: 'row',
    alignItems:"center",
    paddingLeft:20,
    height: 130,
    top:-40
  },
  scroll:
  {
    width: '100%'
  },
  CustomScroll:
  {
    width: '100%',
    alignItems:"center"
  },
   
  
 
  facebookText: {
    color: AppStyles.color.white
  },
  
  sideBySideContainer: {
    width: AppStyles.textInputWidth.main,
    flexDirection:"row",
    marginTop:25,
    borderBottomWidth:1,
  },
  side1:{
    height: 42,
    paddingRight: 10,
    paddingTop:10,
    marginLeft:10,
    width:"45%",
  },
  
 side2:{
    paddingRight: 20,
    marginLeft:10,
    paddingTop:10,
    width:"50%",
  },
  
  purpose:{
    fontSize:18,
    color: AppStyles.color.text,
    textAlign:"center",
  },
  description:{
    marginLeft:20,
    marginBottom:10,
    width: "85%",
    
  },
  InputContainer: {
    width: AppStyles.textInputWidth.main,
    marginTop: 15,
    borderWidth: 0,
    borderBottomWidth:1,
    /*borderStyle: "solid",
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,*/ 
    
  },
  title: {
    color :  AppStyles.color.title,
    fontSize: 18,
    fontWeight: "bold",
  },
  
  body: {
    fontSize:16,
    color: AppStyles.color.text,
    
  },
  sideBySideButtonContainer:
  {
    flexDirection:"row",
    marginTop:20,
    width:"80%",
  },
  acceptButton: {
    width: "100%",
    backgroundColor: "#1A801A",
    borderRadius: AppStyles.borderRadius.main,
    marginRight:20,
    padding: 10,
    marginTop:20,
    marginBottom:15
  },
  DeleteButton: {
    width: "100%",
    backgroundColor: "#D43E3E",
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginLeft:20,
    marginTop:20,
    marginBottom:15
  },
  picker:{
    width:'100%',
    color: AppStyles.color.grey,
    alignItems:"center",
  },
  pickerSide:{
    height: 42,
    width:"50%",
  }
});
