/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  Dimensions,
  Image,
  Picker,
  YellowBox,
} from 'react-native';
import Button from 'react-native-button';
import {AppStyles} from '../styles/RequestFormStyle';
import {styles} from '../styles/FYPViewStyles';
var url = require('../url');
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class FypResponseViewScreen extends React.Component {
  static navigationOptions = {
    headerRight: () => (
      <Button
        containerStyle={styles.ConverseButton}
        style={styles.facebookText}
        onPress={() => alert('This is a button!')}
        title="Converse Request"
        color="#2B60DE"
      />
    ),
  };
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Failed prop type',
      'Warning: componentWillReceiveProps has been renamed',
      'Warning: DatePickerAndroid has been merged with DatePickerIOS',
      'Warning: TimePickerAndroid has been merged with DatePickerIOS',
    ]);

    this.state = {
      loading: true,
      projName:'',
      count: '',
      tech:'',
      description: '',
      rollNumbers:  [],
      total_members: '',
      req_id: '',
      proj_id:'',
      adv_id:'',
      
    };
  }
  acceptRequest(){
    fetch( url.base_url + "/acceptFypRequest", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        req_id: this.state.req_id,
        proj_id: this.state.proj_id,
        adv_id: this.state.adv_id,
        members: this.state.rollNumbers

        
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson)
      {
       alert("Request Accepted !")
       this.props.navigation.goBack();
      }
      else
      {
        alert('war gye');
      }
      
    })
  }
  rejectRequest()
  {
    fetch( url.base_url + "/rejectFypRequest", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      req_id: this.state.req_id,
      members: this.state.rollNumbers,
        
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson)
      {
       alert("Request Rejected !")
       this.props.navigation.goBack();
      }
      else
      {
        alert('war gye');
      }
      
    })
  }

  _retriveData(){

    const { params } = this.props.navigation.state;
    //this.setState({app_id: JSON.stringify(params.req_id)});
    console.log(JSON.stringify(params.req_id));
    alert(JSON.stringify(params.req_id));
    fetch( url.base_url + "/fetchSpecificFypResponse", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: JSON.stringify(params.req_id),
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson)
      {
        this.setState({projName: responseJson[0].projName});
        this.setState({tech: responseJson[0].technology});
        this.setState({description: responseJson[0].description});
        this.setState({total_members: responseJson[0].members});

        

      }
      else
      {
        alert('Something went wrong!');
      }
      
    })



  }
 
  componentDidMount(){
    console.log('calling')
    
   this._retriveData();
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          centerContent={true}
          contentContainerStyle={styles.CustomScroll}>
          

          

          <View style={styles.sideBySideContainer1}>
            <View style={styles.side1}>
              <Text style={styles.title}>Project Title:</Text>
            </View>

            <View style={styles.side2}>
              <Text style={styles.body}>{this.state.projName}</Text>
            </View>
          </View>

          <View style={styles.sideBySideContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Total Members:</Text>
            </View>

            <View style={styles.side2}>
              <Text style={styles.body}>{this.state.total_members}</Text>
            </View>
          </View>

         

          <View style={styles.sideBySideContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Technology:</Text>
            </View>

            <View style={styles.side2}>
              <Text style={styles.body}>{this.state.tech}</Text>
            </View>
          </View>

          <View style={styles.InputContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Description:</Text>
            </View>

            <View style={styles.description}>
              <Text style={styles.purpose}>
              {this.state.description}
              </Text>
            </View>
          </View>

          
         
        </ScrollView>
      </View>
    );
  }
}

export default FypResponseViewScreen;
