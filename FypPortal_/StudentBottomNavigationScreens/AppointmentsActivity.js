/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {StyleSheet,FlatList, Text, View, Button, YellowBox} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import faker from 'faker';
import {SearchBar,ListItem} from 'react-native-elements';
class AppointmentsActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],      
      search:'',
    };
    this.arrayholder = [];
    
      this.state.data.push({
      id : 1,
      avatar_url: faker.image.avatar(),
      //name : faker.name.firstName(),
      description: "Shahzad Sadfar has accepted your appointment request.",    
    },
    {
      id : 1,
      avatar_url: faker.image.avatar(),
      //name : faker.name.firstName(),
      description: "Zia Afzal has accepted your appointment request.",
    },
    {
      id : 1,
      avatar_url: faker.image.avatar(),
      //name : faker.name.firstName(),
      description: "Murtaza Yousaf has accepted your appointment request.",
    },
    {
      id : 1,
      avatar_url: faker.image.avatar(),
      //name : faker.name.firstName(),
      description: "Shahzad Sadfar has accepted your appointment request.",
    },
    {
      id : 1,
      avatar_url: faker.image.avatar(),
      //name : faker.name.firstName(),
      description: "Sadia Shahzad has rejected your appointment request.",
    },
    {
      id : 1,
      avatar_url: faker.image.avatar(),
      //name : faker.name.firstName(),
      description: "Khadija Mariyam has rejected your appointment request.",
    },
    {
      id : 1,
      avatar_url: faker.image.avatar(),
      //name : faker.name.firstName(),
      description: "Anzar Ahmad has accepted your appointment request.",
    },
    
    )
    this.arrayholder = this.state.data;

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }
  navigateToProfile=(item)=>(
    this.props.navigation.navigate('',
    {
      image : faker.image.avatar(),
      name: item.name,
      description : item.description,
      slots: 2,
      available:true
    }) )

  keyExtractor = (item, index) => index.toString()

  renderItem = ({ item }) => (
    <ListItem
     // title={item.name}
      titleStyle={styles.title}
      subtitle={item.description}
      leftAvatar={{ source: { uri: item.avatar_url } ,size:70}}
      bottomDivider
      chevron={{color:'#2b60de',raised:true,name:'visibility',size:20, onPress:this.navigateToProfile.bind(this,item) }}
    />
    )
    render() {
      //const { search } = this.state.search;
      const {search} = this.state.search;
    console.log("array"+this.arrayholder);
    console.log("data"+this.state.data);

    
        return (
          <View style={{flex:1}}>  
            
        
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
  MainContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    alignItems: 'center',
    justifyContent: 'center',
  },

  sideMenuContainer: {
    width: '100%',
    height: '100%',

    alignItems: 'center',
    paddingTop: 20,
  },

  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },

  sideMenuIcon: {
    resizeMode: 'center',
    width: 28,
    height: 28,
    marginRight: 10,
    marginLeft: 20,
  },

  menuText: {
    fontSize: 15,
    color: '#222222',
  },
  title: {
    color:'#2b60de',fontWeight:'bold'
  },
  container: {
    backgroundColor:'#2b60de'
  },
});

export default AppointmentsActivity;
