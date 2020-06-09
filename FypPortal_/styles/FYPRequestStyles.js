import {Platform, StyleSheet, Dimensions} from 'react-native';
import {AppStyles} from './RequestFormStyle';
//import { Configuration } from "./Configuration";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  Icon: {
    padding: 10,
    width: "5%",
    height: 10,
  },
  idIcon: {
    padding: 10,
    width: 10,
    height: 30,
  },
  techIcon: {
    padding: 10,
    width: 10,
    height: 30,
  },
  groupIcon: {
    padding: 10,
    width: 10,
    height: 25,
    marginRight: 10,
  },
  menuItem: {
    color: AppStyles.color.text,
  },
  picker: {
    width: '90%',
    paddingLeft: 40,
    paddingRight: 20,
    height:40,
    color: AppStyles.color.text,
  },
  SectionStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    flex: 1,
  },

  description: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    height: 130,
    top: -40,
  },
  upperBar: {
    backgroundColor: '#2B60DE',
    paddingLeft: 90,
    paddingRight: 90,
    flexDirection: 'row',
    height: 65,
  },
  scroll: {
    width: '100%',
  },
  CustomScroll: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    width: 300,
    color: AppStyles.color.white,
    marginTop: 10,
    marginBottom: 20,
    textAlign: 'center',
  },
  content: {
    paddingLeft: 50,
    paddingRight: 50,
    textAlign: 'center',
    fontSize: AppStyles.fontSize.content,
    color: AppStyles.color.text,
  },
  placeholder: {
    fontFamily: AppStyles.fontName.text,
    color: 'red',
  },
  InputContainer: {
    width: '87%',
    marginTop: 15,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },
  InputContainerMain: {
    width: '87%',
    marginTop: "10%",
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: AppStyles.color.grey,
    borderRadius: AppStyles.borderRadius.main,
  },

  body: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    width:'76%',
    color: AppStyles.color.text,
  },
  facebookContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: '#2B60DE',
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
  purpose: {
    height: 130,
    justifyContent: 'flex-start',
    paddingLeft: 10,
    width: 230,
    top: 45,
    color: AppStyles.color.text,
    textAlignVertical: 'top',
    flexDirection: 'row-reverse',
    borderColor: '#2B60DE',
  },
});
