/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-no-duplicate-props */
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
  Alert,
  View,
  Platform,
  Dimensions,
  Image,
  YellowBox,
} from 'react-native';
import Button from 'react-native-button';
import {AppStyles} from '../styles/RequestFormStyle';
import {styles} from '../styles/AppointmentRequestStyles';
import DatePicker from 'react-native-datepicker';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class AppointmentRequestScreen extends React.Component {
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
      date: '',
      time: '',
      reason: '',
      members: '',
    };
  }

  render() {
    return (
      <ScrollView>

        <View style={styles.container}>
          <View style={styles.InputContainer}>
            <View style={styles.SectionStyle}>
              <Image
                source={require('../assets/icons/person.png')}
                style={styles.Icon}
              />
              <TextInput
                style={styles.body}
                placeholder="Full Name"
                onChangeText={text => this.setState({fullname: text})}
                value={this.state.fullname}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            </View>           
         

          <View style={styles.InputContainer}>
            <View style={styles.SectionStyle}>
              <Image
                source={require('../assets/icons/count.png')}
                style={styles.Icon}
              />
              <TextInput
                style={styles.body}
                placeholder="Members Count"
                onChangeText={text => this.setState({members: text})}
                value={this.state.members}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            </View>

          <View style={styles.DateTimeContainer}>
            <View style={styles.DateSectionStyle}>
              <Image
                source={require('../assets/icons/date.png')}
                style={styles.Icon}
              />
              <DatePicker
                style={styles.date}
                value={this.state.date}
                date={this.state.date}
                format="DD-MM-YYYY"
                minDate="01-01-2020"
                onDateChange={date => {
                  this.setState({date: date});
                }}
                placeholder="Date"
                placeholderTextColor={AppStyles.color.grey}
                iconSource=""
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    height: 42,
                    paddingRight: 20,
                  },
                  placeholder: {
                    color: AppStyles.color.grey,
                  },
                }}
              />
            </View>

            <View style={styles.TimeSectionStyle}>
              <Image
                source={require('../assets/icons/time.png')}
                style={styles.Icon}
              />
              <DatePicker
                style={styles.date}
                placeholder="Time"
                placeholderTextColor={AppStyles.color.grey}
                mode="time"
                iconSource=""
                value={this.state.time}
                date={this.state.time}
                onDateChange={time => {
                  this.setState({time: time});
                }}
                iconSource=""
                customStyles={{
                  dateInput: {
                    height: 42,
                    paddingRight: 20,
                    borderWidth: 0,
                  },
                }}
              />
            </View>
            </View>

          <View style={styles.InputContainer}>
            <View style={styles.description}>
              <Image
                source={require('../assets/icons/pen.png')}
                style={styles.Icon}
              />
              <TextInput
                style={styles.purpose}
                placeholder="Meeting Purpose"
                securnpx
                eTextEntry={true}
                onChangeText={text => this.setState({reason: text})}
                value={this.state.reason}
                placeholderTextColor={AppStyles.color.grey}
                multiline={true}
                underlineColorAndroid="transparent"
              />
            </View>
            </View>

          <Button
            containerStyle={[
              styles.facebookContainer,
              {marginTop: 50, marginBottom: 20},
            ]}
            style={styles.facebookText}
            onPress={() => this.props.navigation.goBack()}>
            Submit Request
          </Button>
        </View>
      </ScrollView>
    );
  }
}
export default AppointmentRequestScreen;
*/

/* eslint-disable react/jsx-no-duplicate-props */
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
  Alert,
  Platform,
  Dimensions,
  Image,
  YellowBox,
  AsyncStorage,
} from 'react-native';
import Button from 'react-native-button';
import {AppStyles} from '../styles/RequestFormStyle';
import {styles} from '../styles/AppointmentRequestStyles';
import DatePicker from 'react-native-datepicker';

var url = require('../url');

//import TimePicker from 'react-native-simple-time-picker';

import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';

import {SafeAreaView, ScrollView, StatusBar} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class AppointmentRequestScreen extends React.Component {

  constructor(props) {
    
    super(props);

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Failed prop type',
      'Warning: componentWillReceiveProps has been renamed',
      'Warning: DatePickerAndroid has been merged with DatePickerIOS',
      'Warning: TimePickerAndroid has been merged with DatePickerIOS',
      'Warning: Failed prop type: Invalid prop `source` supplied in `image`',
      'DatePickerAndroid has been merged with DatePickerIOS and will be removed in a future release.',
      'Possible Unhandled Promise Rejection'
    ]);
    

    this.state = {
      loading: true,
      advisorID:0,
      userID:0,
      fullname: '',
      date: '',
      rollNumber: '',
      reason: '',
      members: 0,
      selectedHours: 0,
    selectedMinutes: 0,
    };
    
  }
  onChanged(text){
    let newText = '';
    let numbers = '0123456789';

    for (var i=0; i < text.length; i++) {
        if(numbers.indexOf(text[i]) > -1 ) {
            newText = newText + text[i];
        }
        else {
            // your call back function
            alert("please enter numbers only");
        }
    }
    this.setState({ members: newText });
}
sendRequest(){
  if(this.state.date == '')
  {
    alert("Select Date !")
  } else if (this.state.members == 0)
  {
    alert("Enter total members including yourself !")
  }
  else if(this.state.reason == '')
  {
    alert("Enter purpose of meeting !")
  }
  else{
            fetch( url.base_url + "/sendAppointment", {
              method: 'POST',
              headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                date: this.state.date,
                reason : this.state.reason,
                members: this.state.members,
                advisorID: this.state.advisorID,
                userID: this.state.userID,
                
                
            })
          })
          .then((response) => response.json())
          .then((responseJson) => {
              if(responseJson)
              {
                this.setState({reason: '' });
                this.setState({members: 0 });
                this.setState({date: '' });
                alert('Request sent successfully !');
                
              }
              else
              {
                alert('war gye');
              }
            })

   }         

}
_retriveData = async () => {
  try {
    console.log('retrivingData')
    //await AsyncStorage.removeItem("password");
    //await AsyncStorage.removeItem("user");
    //await AsyncStorage.removeItem("email");
    const value = await AsyncStorage.getItem("email");

    const { params } = this.props.navigation.state;
    this.setState({advisorID: JSON.stringify(params.id)});
    console.log(JSON.stringify(params.id));


    fetch( url.base_url + "/getStudentDetails", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: value,
        
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson)
      {
         
        this.setState({fullname: JSON.stringify(responseJson[0].Name) });
        this.setState({rollNumber: JSON.stringify(responseJson[0].Roll_number) });
        this.setState({userID: JSON.stringify(responseJson[0].stu_id) });
        console.log(this.state.userID);
      }
      else
      {
        Alert.alert('war gye');
      }
    })


  
  } catch (error) {
    console.log(error.message);
  }
}
componentDidMount(){
  console.log('calling')
  
  this._retriveData();
}
  render() {
    const selectedHours = this.state.selectedMinutes;
    const selectedMinutes =this.state.selectedHours;
    return (
      <ScrollView>

        <View style={styles.container}>
          <View style={styles.InputContainer}>
            <View style={styles.SectionStyle}>
              <Image
                source={require('../assets/icons/person.png')}
                style={styles.Icon}
              />
              <Text style={styles.text} >{this.state.fullname.slice(1,this.state.fullname.length-1)}</Text>
              
            </View>
            </View>           
         

          <View style={styles.InputContainer}>
            <View style={styles.SectionStyle}>
              <Image
                source={require('../assets/icons/id.jpg')}
                style={styles.Icon2}
              />
              <Text style={styles.text2}>{this.state.rollNumber.slice(1,this.state.rollNumber.length-1)}</Text>
            </View>
            </View>
        
          <View style={styles.DateTimeContainer}>
            <View style={styles.DateSectionStyle}>
              <Image
                source={require('../assets/icons/date.png')}
                style={styles.Icon}
              />
              <DatePicker
                style={styles.date}
                value={this.state.date}
                date={this.state.date}
                format="YYYY-MM-DD"
                minDate= {new Date().getDate()} 
                onDateChange={date => {
                  this.setState({date: date});
                }}
                placeholder= "Date"
                placeholderTextColor={AppStyles.color.grey}
                iconSource=""
                customStyles={{
                  dateInput: {
                    borderWidth: 0,
                    height: 42,
                    paddingRight: 20,
                  },
                  placeholder: {
                    color: AppStyles.color.grey,
                  },
                }}
              />
            </View>

            <View style={styles.TimeSectionStyle}>
              <Image
                source={require('../assets/icons/count.png')}
                style={styles.Icon}
              />
               <TextInput
                style={styles.count}
                placeholder="Total Members"
                keyboardType={'numeric'}
                onChangeText={text => this.onChanged(text)}
                value={this.state.members}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
            </View>

            
  

          <View style={styles.InputContainer}>
            <View style={styles.description}>
              <Image
                source={require('../assets/icons/pen.png')}
                style={styles.Icon}
              />
              <TextInput
                style={styles.purpose}
                placeholder="Meeting Purpose"
                securnpx
                eTextEntry={true}
                onChangeText={text => this.setState({reason: text})}
                value={this.state.reason}
                placeholderTextColor={AppStyles.color.grey}
                multiline={true}
                underlineColorAndroid="transparent"
              />
            </View>
            </View>

          <Button
            containerStyle={[
              styles.facebookContainer,
              {marginTop: 50, marginBottom: 20},
            ]}
            style={styles.facebookText}
            //onPress={() => this.props.navigation.goBack()}
            onPress = {() => this.sendRequest()}
            >
            Submit Request
          </Button>
        </View>
      </ScrollView>
    );
  }
}
export default AppointmentRequestScreen;

