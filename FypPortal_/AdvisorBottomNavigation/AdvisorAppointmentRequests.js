/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import faker from 'faker';
import {View, FlatList,StyleSheet, AsyncStorage,YellowBox,Image} from 'react-native';
import {SearchBar,ListItem} from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob';
var url = require('../url');



export default class  AdvisorAppointmentsActivity extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      data: [],      
      search:'',
      uri:'',
    };
    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: Failed prop type',
      'Warning: componentWillReceiveProps has been renamed',
      'Warning: DatePickerAndroid has been merged with DatePickerIOS',
      'Warning: TimePickerAndroid has been merged with DatePickerIOS',
      `can't perform a React state update on an unmounted component`,
    ]);
    
    
  }
  _retriveData = async () => {
    try {
      console.log('retrivingData')
      //await AsyncStorage.setItem('email', 'fareed@pucit.edu.pk');
      const value = await AsyncStorage.getItem("email");
  
  
      fetch( url.base_url + "/fetchAppointmentRequests", {
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
          console.log("profile");
          RNFetchBlob
          .fetch('GET', url.base_url + "/getfile?path=" + responseJson[0].profile_pic , {})
          .then((res) => {    
            
          this.setState({uri:res.data});
          //console.log(this.state.uri);
           })
          .catch((e) => {
          console.log(e)
          });
           this.setState({data: [{id : responseJson[0].app_ID,
            avatar_url: this.state.uri,
            name :responseJson[0].Name,
            description: 'You have received appointment Request from '+ responseJson[0].Name +' of date ' + responseJson[0].Date.slice(0,10) + ' during visiting hours',  }]})

          var i =0;
               for (i=1; i < Object.keys(responseJson).length ; i++)
                {
                      console.log("profile");
                      RNFetchBlob
                      .fetch('GET', url.base_url + "/getfile?path=" + responseJson[0].profile_pic , {})
                      .then((res) => {    
                        
                      this.setState({uri:res.data});
                      //console.log(this.state.uri);
                      })
                      .catch((e) => {
                      console.log(e)
                      });
                      this.state.data.push(
                        {
                      id : responseJson[i].app_ID,
                      avatar_url: this.state.uri,
                      name : responseJson[i].Name,
                      description: 'You have received appointment request from '+ responseJson[i].Name +' of date ' + responseJson[i].Date.slice(0,10) + ' during visiting hours',
                      })
                }
               
        }
        else
        {
          alert('war gye');
        }
        
      })
  
  
    
    } catch (error) {
      console.log(error.message);
    }
    
  }
 
  componentDidMount(){
    console.log('calling')
    setInterval(this._retriveData,60000);
    this.focusListener = this.props.navigation.addListener('didFocus', () => {this._retriveData()});
    this._retriveData();
  }
  componentWillUnmount() {
    
    clearInterval();
    this.focusListener.remove();
  }
  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
      title={item.name}
      titleStyle={styles.title}
      subtitle={item.description}
      //leftAvatar={{ source: { uri: item.avatar_url } ,size:70}}
      leftAvatar ={ item.avatar_url ? <Image source={{uri: `data:jpeg;base64,${item.avatar_url}`}}  style={styles.circleImageLayout} /> :<Image source={require('../assets/images/av2.png')} style={styles.circleImageLayout}/>}
      
      onPress={ () => this.props.navigation.navigate('AppointmentView',{
        app_id: item.id,
      })}
      bottomDivider
    />
    
  )
  render() {
    const { search } = this.state.search;
  
      return (
        <View>  
          
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.data}
            renderItem={this.renderItem}
          />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  title: {
    color:'#2b60de',fontWeight:'bold'
  },
  container: {
    backgroundColor:'#2b60de'
  },
  circleImageLayout: {
    width: 70,
    height: 70,
    borderRadius: 200 / 2,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderColor:'#FFF',
    borderWidth:2,
    marginVertical:10
    
  },
});