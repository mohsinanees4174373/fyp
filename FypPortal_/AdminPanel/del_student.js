import React, {Component} from 'react';
//import {AsyncStorage, Navigator, BackHandler} from 'react-native'

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableOpacity,
  Image,
  YellowBox,
  Alert,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
//import EmailSender from 'react-native-smtp';

var url = require('../url');

import Autocomplete from 'react-native-autocomplete-input';
import {Dimensions } from "react-native";
console.disableYellowBox = true;

class del_student extends Component {
  constructor(props) {
    super(props);

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
      'Warning: VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.',
    ]);
    
    this.state = {
      email : '',
      stds: [],
      query: '',
  }
  };
  
  componentDidMount() {
    //First method to be called after components mount
    //fetch the data from the server for the suggestion
    fetch( url.base_url + "/getStudents", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          /*body: JSON.stringify({
              //email: this.state.email,
          })*/
        })
        .then((response) => response.json())
        .then((responseJson) => {
            const { results: stds } = responseJson;
            this.setState({ stds: responseJson });
            //this.state.stds = responseJson;
        
          })
  }
  findStd(query) {
    //method called everytime when we change the value of the input
    //Alert.alert(query);
    //query = this.state.email;
    if (query === '') {
      //if the query is null then return blank
      return [];
    }
   //Alert.alert(query);
  const { stds } = this.state;
    //making a case insensitive regular expression to get similar value from the film json
    const regex = new RegExp(`${query.trim()}`, 'i');
    //return the filtered film array according the query from the input
    return stds.filter(std => std.email.search(regex) >= 0);
  }

  checkFields() {
    //Alert.alert(this.state.query);
    this.state.email = this.state.query;
    if (this.state.email== '') {
        Alert.alert('Email cannot be empty!');
    }
    else{
        //Alert.alert('1');
        fetch(url.base_url + "/checkStdAvailibility", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          email: this.state.email,
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
        if(responseJson[0])
        {
            //Alert.alert('2');
            fetch( url.base_url + "/delStudent", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              email: this.state.email,
          })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            Alert.alert('Student deleted successfully!');
          })
        }
        else
        {
          Alert.alert('Student does not exit!');
        }
      })  
  }
}

  render() {
    const { query } = this.state;
    const stds = this.findStd(query);
    const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim();
      
    return (
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <Image
              style={styles.logo}
              source={{
                uri:
                  'https://paperpks.com/wp-content/uploads/2018/12/pucit.png',
              }}
            />
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.header}>FYP PORTAL</Text>
            </TouchableHighlight>
            <View style={styles.line} />
            <Image
              style={styles.fpasswordIcon}
              source={{
                uri:
                  'https://icons.iconarchive.com/icons/icons8/windows-8/128/Users-Remove-User-icon.png',
              }}
            />
            <TouchableHighlight style={styles.headingContainer}>
              <Text style={styles.signin}>Remove Student{'\n'}</Text>
            </TouchableHighlight>
            <View style={styles.line} />

            
        
        
        <View style={styles.containerA}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.autocompleteContainerA}
          data={stds.length === 1 && comp(query, stds[0].email) ? [] : stds}
          defaultValue={query}
          onChangeText={text => this.setState({ query: text })}
          placeholder="Enter Student Email"
          //onChangeText={email => this.setState({email})}
          onChangeText={query => this.setState({query})}
          
          renderItem={({ item }) => (
            //this.state.email = item.email,
            <TouchableOpacity onPress={() => this.setState({ query: item.email })}>
              <Text style={styles.itemTextA}>
                {item.email}
              </Text>
            </TouchableOpacity>
          )}
        />
        
      </View>
        
        
        
            </View>

            <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.checkFields()}>
              <Text style={styles.loginText}>Remove Student</Text>
            </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
const screenWidth = Math.round(Dimensions.get('window').width);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    height: 150,
    width: 150,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  fpasswordIcon: {
    flex: 1,
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    height: 40,
    width: 40,
    resizeMode: 'contain',
    alignItems: 'center',
  },
  headingContainer: {
    flex: 1,
    height: 50,
    //width: 200,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //height: 150,
    //width: 150,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: 'black',
    //textDecorationLine: 'underline'
  },
  signin: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    //height: 150,
    //width: 150,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'serif',
    color: '#2B60DE',
    //textDecorationLine: 'underline'
  },
  inpIcons: {
    padding: 10,
    marginLeft: 10,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  inputContainer: {
    borderColor: '#2B60DE',
    //backgroundColor: '#FFFFFF',
    borderRadius: 50,
    borderWidth: 1,
    //width:300,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
    height: 35,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputs: {
    height: 45,
    //marginLeft:16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    //marginBottom:10,
    //width:300,
    borderRadius: 50,
    alignSelf: 'stretch',
    marginLeft: 20,
    marginRight: 20,
  },
  buttonContainerForgetPwd: {
    flex: 0,
    height: 45,
    flexDirection: 'row',
    //justifyContent: 'center',
    alignItems: 'center',
    //marginBottom:10,
    //width:300,
    borderRadius: 50,
    //alignSelf: 'stretch',
    marginLeft: 220,
    marginRight: 10,
  },
  forgetPwd: {
    flex: 1,
    textAlign: 'right',
    textDecorationLine: 'underline',
    alignSelf: 'stretch',
    marginTop: 10,
  },
  loginButton: {
    backgroundColor: '#2B60DE',
  },
  registerButton: {
    flex: 0,
    borderWidth: 1,
    borderColor: '#2B60DE',
    marginBottom: 13,
  },
  loginText: {
    color: 'white',
  },
  line: {
    flex: 0,
    backgroundColor: 'black',
    height: 1,
    width: 175,
    marginBottom: 20,
  },
  
  containerA: {
    //backgroundColor: '#F5FCFF',
    //backgroundColor: 'blue',
    flex: 1,
    //padding: 16,
   // marginTop: 40,
    //borderColor: 'blue',
    
  },
  autocompleteContainerA: {
    //backgroundColor: 'blue',
    borderWidth: 0,
    //borderRadius: 50,
    alignSelf: 'stretch',
    width : screenWidth/4 * 3 + 40,
    marginBottom: 10,
  },
  descriptionContainerA: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    width : 300,
  },
  itemTextA: {
    alignSelf: 'stretch',
    width : 300,
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoTextA: {
    textAlign: 'center',
    fontSize: 16,
    alignSelf: 'stretch',
    width : 300,
  },
    
});
export default del_student;
