import React, {Component} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  ImageBackground,
  Alert,
  AsyncStorage,
} from 'react-native';
import Stars from 'react-native-stars';
import {Icon, Button, ListItem, Divider} from 'react-native-elements';
import SwitchToggle from 'react-native-switch-toggle';
import {styles} from '../styles/AdminPanel';
const winWidth = Dimensions.get('window').width;
export default class admin_profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email : this.props.navigation.state.params.admin_email,
      name : this.props.navigation.state.params.admin_name,
      pwd : this.props.navigation.state.params.admin_pwd,
    };
  }
  navigateToEditProfile = item =>
    this.props.navigation.navigate('AppointmentView');
  navigateToAppointmentView = item =>
    this.props.navigation.navigate('AppointmentView');

  navigateToFYPForm = item => this.props.navigation.navigate('AppointmentForm');

  onPress1 = () => {
    this.setState({availableSwitch: !this.state.availableSwitch});
  };

  editFunc = () => {
      //Alert.alert(this.state.name);
      this.props.navigation.navigate('AdminEditProfile' , {
              admin_email: this.state.email,
              admin_name: this.state.name,
              admin_pwd: this.state.pwd,
            }); 
  }

  signout = () => {
      AsyncStorage.clear();
      this.props.navigation.navigate('Login');
  }
  
  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <ListItem
      title={item.name}
      titleStyle={styles.subtitle}
      // eslint-disable-next-line no-undef
      leftIcon={(name = 'laptop')}
      bottomDivider
    />
  );
  render() {
    const { navigation } = this.props; 
    return (
      <ScrollView>
        <View style={styles.Container}>
          <View style={styles.top}>
           
            <TouchableOpacity
              style={styles.container}
              activeOpacity={0.5}
              onPress={() => console.log('Works!')}>
              <ImageBackground
                  source={require('../assets/images/pucit.jpg')}
                  style={{
              height: 200,
              width: winWidth,
              opacity: 0.8,
              position: 'absolute',

            }}
              />
<View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginEnd: 5,
                  marginTop: 3,
                }}>
                <Icon
                  color="black"
                  name="account-edit"
                  size={35}
                  type="material-community"
                  onPress={() => this.editFunc()}
                />
              </View>
              <Image
                source={require('../assets/images/fulllogo.png')}
                style={styles.circleImageLayout}
                showEditButton
                onPress={() => console.log('Works!')}
                editButton={{name: 'edit', size: 50}}
              />

            </TouchableOpacity>

            
          </View>

        

        <Text style={styles.descriptionText}>
                {'\n'}{'\n'}{'\n'}{'\n'}
              {this.props.navigation.state.params.admin_email}
            </Text>

        <View style={styles.line} />

              <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.props.navigation.navigate('Del_Adv')}>
                <Text style={styles.loginText}>Remove Advisor</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonContainer, styles.loginButton]}
                onPress={() => this.props.navigation.navigate('Del_Std')}>
                <Text style={styles.loginText}>Remove Student</Text>
              </TouchableOpacity>

        <TouchableOpacity
              style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this.props.navigation.navigate('Add_Adv')}>
              <Text style={styles.loginText}>Add Advisor</Text>
            </TouchableOpacity>

        
            <View style={styles.line2} />
             <TouchableOpacity
              style={styles.buttonContainerForgetPwd}
              onPress={() =>
                this.signout()
              }>
              <Text style={styles.forgetPwd}>Logout</Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}