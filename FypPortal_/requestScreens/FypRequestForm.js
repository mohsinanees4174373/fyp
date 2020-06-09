/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View ,Platform , Dimensions, Image, Picker, YellowBox, Alert,AsyncStorage} from "react-native";
import Button  from "react-native-button";
import { AppStyles } from "../styles/RequestFormStyle";
import {styles } from "../styles/FYPRequestStyles";
import { Icon } from 'react-native-elements'
var url = require('../url');


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class FYPRequestScreen extends React.Component {
  constructor(props) {
    super(props);
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Failed prop type',
      'Warning: componentWillReceiveProps has been renamed',
      'Warning: DatePickerAndroid has been merged with DatePickerIOS',
      'Warning: TimePickerAndroid has been merged with DatePickerIOS',
      'Failed prp type: Invalid prop `name` of value '
    ]);

    this.state = {
      loading: true,
      fullname: "",
      rollnumber:"",
      tech:"",
      description:"",
      projName:"",
      memberCount: 0,
      members:[ {rn:""}],
      email:"",
      advisorID:"",
      newSlots:"",
    };
  }
  handleAddMember = () => {
    this.setState({
      members: this.state.members.concat([{ rn: "" }])
      
    });
    
  }
  handleMembersChange = idx => text => {
    
    const newM = this.state.members.map((mem, sidx) => {
      if (idx !== sidx) return mem;
      return { ...mem,rn: text };
    });

    this.setState({ members: newM });
    console.log(text);
  };
  handleRemoveMember = idx  => {
    this.setState({
      members: this.state.members.filter((mem, sidx) => idx !== sidx)
    });
  };

  onSubmit= ()=>{
    if(this.state.projName == '')
    {
      alert("Please enter Project Name !")
      console.log(this.state.members[0].rn)
    }
    else if(this.state.memberCount == '')
    {
      alert("Please enter total members count ! ")
    }
    else if(this.state.tech == '' )
    {
      alert("Please enter the technology you want to used for this project ")
    }
    else if(this.state.description == '')
    {
      alert("Please breifly explains the project !")
    }
    else if(this.state.members.length != (this.state.memberCount)-1 )
    {
      alert("Please enter all group members rollnumbers !")
    }
    else {
      var flag = true;
      var i;
      for(i=0;i < this.state.members.length;i++)
      {
        if(this.state.members[i].rn == '')
        {
          flag = false;
          break;
        }
      }
      if(!flag)
      {
        alert("Please enter all group members rollnumbers !")
      }
      else{


                      const { params } = this.props.navigation.state;
                      this.setState({advisorID: JSON.stringify(params.id)});
                      console.log(JSON.stringify(params.id));


                      fetch( url.base_url + "/CheckIfStudentAlreadySendRequest", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                          
                          email:  this.state.email,
                          advID: JSON.stringify(params.id),
                                              

                      })
                    })
                    .then((response) => response.json())
                    .then((responseJson) => {
                        console.log(responseJson)
                          if(responseJson[0].req_ID)
                        {
                          
                          alert('You already have send fyp Request wait for the response!');
                          
                        }
                        
                        else
                        {
                                                    fetch( url.base_url + "/CheckIfSlotsAvailiable", {
                                                      method: 'POST',
                                                      headers: {
                                                          'Accept': 'application/json',
                                                          'Content-Type': 'application/json'
                                                    },
                                                    body: JSON.stringify({
                                                        
                                                        email:  this.state.email,
                                                        advID: JSON.stringify(params.id),
                                                                            
                              
                                                    })
                                                  })
                                                  .then((response) => response.json())
                                                  .then((responseJson) => {
                                                      if(responseJson[0].fyp_availiable_slots > 0)
                                                      {
                                                        this.setState({newSlots: responseJson[0].fyp_availiable_slots-1});
                                                        console.log(this.state.newSlots);
                                                                                              fetch( url.base_url + "/sendFYPRequest", {
                                                                                                method: 'POST',
                                                                                                headers: {
                                                                                                    'Accept': 'application/json',
                                                                                                    'Content-Type': 'application/json'
                                                                                              },
                                                                                              body: JSON.stringify({
                                                                                                  proj : this.state.projName,
                                                                                                  memCount: this.state.memberCount,
                                                                                                  tech : this.state.tech,
                                                                                                  description : this.state.description,
                                                                                                  members: this.state.members,
                                                                                                  email:  this.state.email,
                                                                                                  advID: JSON.stringify(params.id),
                                                                                                  slots: this.state.newSlots,                   
                                                                        
                                                                                              })
                                                                                            })
                                                                                            .then((response) => response.json())
                                                                                            .then((responseJson) => {
                                                                                                if(responseJson)
                                                                                                {
                                                                                                  
                                                                                                  alert('Request sent successfully !');
                                                                                                  this.props.navigation.goBack();
                                                                                                  
                                                                                                }
                                                                                                else
                                                                                                {
                                                                                                  alert('Something went wrong !');
                                                                                                }
                                                                                              })
                                                        
                                                      }
                                                      else
                                                      {
                                                        alert('No Slot is Availiable !');
                                                      }
                                                    })
                        }
                      })










            
                      

      }   
    }
    
  };
  _retriveData = async () => {
    try {
      console.log('retrivingData')
      //await AsyncStorage.removeItem("user");
      //await AsyncStorage.removeItem("email");
      const value = await AsyncStorage.getItem("email");
      console.log(value);
      this.setState({email:value});
  
      
  
  
      
    } catch (error) {
      console.log(error.message);
    }
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
        contentContainerStyle={styles.CustomScroll}
        > 


         
          <View style={styles.InputContainerMain}>
            <View style={styles.SectionStyle}>
            <Image source = {require('../assets/icons/project.jpg')} style={styles.Icon}/>
              <TextInput
                style={styles.body}
                placeholder="Project Name"
                onChangeText={text => this.setState({ projName: text })}
                value={this.state.projName}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          <View style={styles.InputContainer}>
          <View style={styles.SectionStyle}>
          <Image source = {require('../assets/icons/count.png')} style={styles.Icon}/>
            <TextInput
              style={styles.body}
              placeholder="Members count including you"
              onChangeText={text => this.setState({ memberCount: text })}
              value={this.state.memberCount}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
            <Icon
              //reverse
              name='plus'
              type='font-awesome'
              color='black'
              containerStyle = {{width:'8%',height:40}}
              iconStyle={{height:40}}
              onPress={() =>this.handleAddMember()}
             />
          </View>
        </View>

        {this.state.members.map((mem, idx) => (
          <View style={styles.InputContainer}>
          <View style={styles.SectionStyle}>
          <Image source = {require('../assets/icons/group.png')} style={styles.Icon}/>
            <TextInput
              style={styles.body}
              placeholder= {`Member ${idx + 1} rollNumber`}
              //onChangeText={text => this.setState({ memberCount: text })}
              onChangeText={this.handleMembersChange(idx)}
              value={mem.rn}
              placeholderTextColor={AppStyles.color.grey}
              underlineColorAndroid="transparent"
            />
            <Icon
              //raised
              name='remove'
              type='font-awesome'
              color='black'
              containerStyle = {{width:'8%',height:40}}
              iconStyle={{height:40}}
              onPress={()=>this.handleRemoveMember(idx)}
             />
            </View>
            </View>
        ))}

        
        
 
          <View style={styles.InputContainer}>
            <View style={styles.SectionStyle}>
            <Image source = {require('../assets/icons/tech.png')} style={styles.techIcon}/>
              <TextInput
                style={styles.body}
                placeholder="Technology"
                onChangeText={text => this.setState({ tech: text })}
                value={this.state.tech}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>



          <View style={styles.InputContainer} >
            <View style={styles.description}>
              <Image source = {require('../assets/icons/pen.png')} style={styles.Icon}/>
              <TextInput
                style={styles.purpose}
                placeholder="Project Description"
                securnpx eTextEntry={true}
                onChangeText={text => this.setState({ description: text })}
                value={this.state.description}
                placeholderTextColor={AppStyles.color.grey}
                multiline={true}
                
                underlineColorAndroid="transparent"
              />
              </View>
            </View>

          <Button
            containerStyle={[styles.facebookContainer, { marginTop: 40, marginBottom:20 }]}
            style={styles.facebookText}
            onPress={()=>this.onSubmit()}
          >
            Submit Request
          </Button>
        </ScrollView>
      </View>
      
    );
  }
}

export default FYPRequestScreen;


/*
 <View style={styles.InputContainer}>
            <View style={styles.SectionStyle}>
            <Image source = {require('../assets/icons/person.png')} style={styles.Icon}/>
              <TextInput
                style={styles.body}
                placeholder="Full Name"
                onChangeText={text => this.setState({ fullname: text })}
                value={this.state.fullname}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

          <View style={styles.InputContainer}>
            <View style={styles.SectionStyle}>
            <Image source = {require('../assets/icons/id.jpg')} style={styles.idIcon}/>
              <TextInput
                style={styles.body}
                placeholder="Section"
                onChangeText={text => this.setState({ rollnumber: text })}
                value={this.state.rollnumber}
                placeholderTextColor={AppStyles.color.grey}
                underlineColorAndroid="transparent"
              />
            </View>
          </View>

<View style={styles.InputContainer}>
          <View style={styles.SectionStyle}>
          <Image source = {require('../assets/icons/group.png')} style={styles.groupIcon}/>
            <Picker
            selectedValue={this.state.member}
            onValueChange={(itemValue, itemIndex) =>
            this.setState({member: itemValue})     
            }
            itemStyle={styles.menuItem}
            style={styles.picker}
            mode={"dropdown"}
            placeholder="Select a value"
            
            >
              <Picker.Item label="Select Member"   />
              <Picker.Item label="Aroob" value="Aroob" />
              <Picker.Item label="Fatima" value="Fatima" />
              <Picker.Item label="Mahroosh" value="Mahroosh" />
              <Picker.Item label="Mohsin" value="Mohsin" />
              <Picker.Item label="Taimoor" value="Taimoor" />
            </Picker>
          </View>
        </View>
*/
















