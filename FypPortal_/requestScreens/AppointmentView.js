/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 *
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
import {styles} from '../styles/AppointmentViewStyles';

import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class AppointmentViewScreen extends React.Component {
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
      fullname: '',
      rollnumber: '',
      tech: '',
      description: '',
      projName: '',
      memberCount: '',
      member: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.scroll}
          centerContent={true}
          contentContainerStyle={styles.CustomScroll}>
          <View style={styles.sideBySideContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Name:</Text>
            </View>

            <View style={styles.side2}>
              <Text style={styles.body}>Aroob Kausar </Text>
            </View>
          </View>

          <View style={styles.sideBySideContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Total Members:</Text>
            </View>

            <View style={styles.side2}>
              <Text style={styles.body}>5</Text>
            </View>
          </View>

          <View style={styles.sideBySideContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Date/Time:</Text>
            </View>

            <View style={styles.side2}>
              <Text style={styles.body}>6-01-2020, 2:30pm</Text>
            </View>
          </View>

          <View style={styles.InputContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Meeting purpose:</Text>
            </View>

            <View style={styles.description}>
              <Text style={styles.purpose}>
                Our project provides a distinct platform, developed for
                interaction between students and teachers to allow them to
                interact with each other through a single platform.
              </Text>
            </View>
          </View>

          <View style={styles.sideBySideButtonContainer}>
            <View>
              <Button
                containerStyle={styles.acceptButton}
                style={styles.facebookText}
                onPress={() => this.props.navigation.goBack()}>
                Accept Request
              </Button>
            </View>
            <View>
              <Button
                containerStyle={styles.DeleteButton}
                style={styles.facebookText}
                onPress={() => this.props.navigation.goBack()}>
                Reject Request
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AppointmentViewScreen;*/

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
import {styles} from '../styles/AppointmentViewStyles';

import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
var url = require('../url');
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class AppointmentViewScreen extends React.Component {
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
      Name:'',
      reason:'',
      date:'',
      members:'',
      rollNumber:'',
      app_id:'',
    };
  }
  acceptRequest(){
    fetch( url.base_url + "/acceptAppointmentRequests", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: this.state.app_id,
        
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
    fetch( url.base_url + "/rejectAppointmentRequests", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: this.state.app_id,
        
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
    this.setState({app_id: JSON.stringify(params.app_id)});
    console.log(JSON.stringify(params.app_id));

    fetch( url.base_url + "/fetchSpecificAppointmentRequests", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: params.app_id,
        
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson)
      {
        this.setState({Name: JSON.stringify(responseJson[0].Name)});
        this.setState({reason: JSON.stringify(responseJson[0].purpose)});  
        this.setState({members: JSON.stringify(responseJson[0].total_members)});
        this.setState({date: JSON.stringify(responseJson[0].Date)});
        this.setState({rollNumber: JSON.stringify(responseJson[0].Roll_number)});
      }
      else
      {
        alert('war gye');
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
          <View style={styles.sideBySideContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Name:</Text>
            </View>

            <View style={styles.side2}>
              <Text style={styles.body}>{this.state.Name.slice(1,this.state.Name.length-1)} </Text>
            </View>
          </View>
          <View style={styles.sideBySideContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Roll Number:</Text>
            </View>

            <View style={styles.side2}>
              <Text style={styles.body}>{this.state.rollNumber.slice(1,this.state.rollNumber.length-1)} </Text>
            </View>
          </View>

          <View style={styles.sideBySideContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Total Members:</Text>
            </View>

            <View style={styles.side2}>
    <Text style={styles.body}>{this.state.members}</Text>
            </View>
          </View>

          <View style={styles.sideBySideContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Date:</Text>
            </View>

            <View style={styles.side2}>
    <Text style={styles.body}>{this.state.date.slice(1,10) + " ( during visiting hours)"}</Text>
            </View>
          </View>

          <View style={styles.InputContainer}>
            <View style={styles.side1}>
              <Text style={styles.title}>Meeting purpose:</Text>
            </View>

            <View style={styles.description}>
              <Text style={styles.purpose}>
                {this.state.reason.slice(1,this.state.reason.length-1)}
              </Text>
            </View>
          </View>

          <View style={styles.sideBySideButtonContainer}>
            <View>
              <Button
                containerStyle={styles.acceptButton}
                style={styles.facebookText}
                onPress={() => this.acceptRequest()}>
                Accept Request
              </Button>
            </View>
            <View>
              <Button
                containerStyle={styles.DeleteButton}
                style={styles.facebookText}
                onPress={() => this.rejectRequest()}>
                Reject Request
              </Button>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AppointmentViewScreen;

