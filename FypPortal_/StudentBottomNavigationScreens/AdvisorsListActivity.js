/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
import React, {Component} from 'react';
import {AsyncStorage, Navigator, BackHandler} from 'react-native'
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Button,
  Alert,
  YellowBox,
} from 'react-native';
import {BottomNavigation} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import faker from 'faker';
import {SearchBar, ListItem} from 'react-native-elements';

var url = require('../url');

class AdvisorsListActivity extends Component {
  /*
  

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: '',
    };
    this.arrayholder = [];
    
    fetch(url.base_url + "/fetchAdvisors", {
                      method: 'POST',
                      headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                  },
                      body: JSON.stringify({
                  })
    })
    .then((response) => response.json())
     .then((responseJson) => {
            console.log(responseJson);
            if(responseJson[0]){
               //Alert.alert(responseJson[1].Designation)
               var i =0;
               for (i; i < Object.keys(responseJson).length ; i++)
                {
                    if(responseJson[i].profile_Pic == null) {
                      this.state.data.push(
                        {
                          id : responseJson[i].adv_ID,
                          avatar_url: responseJson[i].profile_Pic,
                          name : responseJson[i].Name,
                          email: responseJson[i].Email,
                          phone: responseJson[i].Phone,  
                          visiting_hour: responseJson[i].visitng_hurs,
                          total_slots : responseJson[i].fyp_total_slots,
                          available_slots: responseJson[i].fyp_availiable_slots,
                          designation: responseJson[i].designation,
                          description: responseJson[i].description,
                          availability: responseJson[i].availability, 

                        })
                    }
                    else {
                      this.state.data.push(
                        {
                          id : responseJson[i].adv_ID,
                        //  avatar_url: responseJson[i].profile_Pic,
                          name : responseJson[i].Name,
                          email: responseJson[i].email,
                          phone: responseJson[i].Phone,  
                          visiting_hour: responseJson[i].visitng_hurs,
                          total_slots : responseJson[i].fyp_total_slots,
                          available_slots: responseJson[i].fyp_availiable_slots,
                          designation: responseJson[i].designation,
                          description: responseJson[i].description, 
                          availability: responseJson[i].availability,    
                    })
                }
                }
            }
          })

      this.arrayholder = this.state.data;

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }
  navigateToProfile = item =>
    this.props.navigation.navigate('Stu_AdvisorProfile', {
      id:item.id,
      image: item.avatar_url,
      email:item.email
    });

  searchFilterFunction = text => {
    console.log("arraySearch"+this.arrayholder);

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name[0].toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({data: newData, search: text});
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      titleStyle={styles.title}
      subtitle={item.designation}
      leftAvatar={{source: {uri: item.avatar_url}, size: 70}}
      bottomDivider
      chevron={{
        color: '#2b60de',
        raised: true,
        name: 'visibility',
        size: 20,
        onPress: this.navigateToProfile.bind(this, item),
      }}
      onPress ={this.navigateToProfile.bind(this, item)}
    />
  );
  */
  render() {
    
    return (
      <View style={{flex: 1}}>
        
       
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
    color: '#2b60de',
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#2b60de',
  },
});

export default AdvisorsListActivity;