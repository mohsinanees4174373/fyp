/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
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
  Dimensions,
  Alert,
  ImageBackground,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import SignupActivity from './LoginSignupScreens/SignupActivity';
import LoginActivity from './LoginSignupScreens/LoginActivity';
import AppointmentsActivity from './StudentBottomNavigationScreens/AppointmentsActivity';
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AboutUsActivity from './sidebarNavigationScreens/AboutUsActivity';
import AdvisorsListActivity from './StudentBottomNavigationScreens/AdvisorsListActivity';
import FypRequestActivity from './StudentBottomNavigationScreens/FypRequestActivity';
import FYPRequestScreen from './requestScreens/FypRequestForm';
import AppointmentRequestScreen from './requestScreens/AppointmentRquestForm';
import Chats from './StudentBottomNavigationScreens/Chats';
import {createDrawerNavigator} from 'react-navigation-drawer';
import HamburgerIcon from './StudentHomeAfterLogin/HamburgerIcon';
import Custom_Side_Menu from './StudentHomeAfterLogin/StudentCustom_Side_ Menu';
import FypRequestViewScreen from './requestScreens/FypRequestView';
import AppointmentViewScreen from './requestScreens/AppointmentView';
import AdvisorAppointmentsActivity from './AdvisorBottomNavigation/AdvisorAppointmentRequests';
import AdvisorFypRequestActivity from './AdvisorBottomNavigation/AdvisorFYPRequests';
import AdvisorChat from './AdvisorBottomNavigation/AdvisorChat';
import ForgotPassword from './LoginSignupScreens/ForgotPassword';
import SettingsActivity from './sidebarNavigationScreens/SettingsActivity';
import ContactUsActivity from './sidebarNavigationScreens/ContactUsActivity';
import Stu_AdvisorProfile from './ProfileScreens/Stu_AdvisorProfile';
import Adv_AdvisorProfile from './ProfileScreens/Adv_AdvisorProfile';
import SingleChatActivity from './StudentBottomNavigationScreens/SingleChat';

import AdvisorEditProfileActivity from './sidebarNavigationScreens/AdvisorEditProfileActivity';
import StudentEditProfileActivity from './sidebarNavigationScreens/EditProfileActivity';
import AdvisorCustom_Side_Menu from './StudentHomeAfterLogin/AdvisorCustom_Side_Menu';
import AdvSignupActivity from './LoginSignupScreens/AdvSignupActivity';
import ChangePwdActivity from './sidebarNavigationScreens/ChangePwdActivity';

import admin_profile from './AdminPanel/admin_profile';
import del_student from './AdminPanel/del_student';
import del_advisor from './AdminPanel/del_advisor';
import add_advisor from './AdminPanel/add_advisor';
import AdminEditProfileActivity from './AdminPanel/AdminEditProfileActivity';

console.disableYellowBox=true;
const StudentTabNavigator = createMaterialBottomTabNavigator(
  {
    // Second: {
    //   screen: SecondActivity,
    // },
    // Third: {
    //   screen: ThirdActivity,
    // },
    AdvisorsList: {
      screen: AdvisorsListActivity,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Image
              source={{
                uri:
                  'https://www.iconsdb.com/icons/preview/color/2B60DE/conference-call-xxl.png',
              }}
              style={styles.sideMenuIcon}
            />
          </View>
        ),
      },
    },
    Appointments: {
      screen: AppointmentsActivity,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Image
              source={{
                uri:
                  'https://www.iconsdb.com/icons/preview/color/2B60DE/appointment-reminders-xxl.png',
              }}
              style={styles.sideMenuIcon}
            />
          </View>
        ),
      },
    },
    FYPRequest: {
      screen: FypRequestActivity,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            {/* <Icon style={[{color: tintColor}]} size={25} name=

{'facebook'}/> */}

            <View>
              <Image
                source={{
                  uri:
                    'https://www.iconsdb.com/icons/preview/color/2B60DE/decision-xxl.png',
                }}
                style={styles.sideMenuIcon}
              />
            </View>
          </View>
        ),
      },
    },
    Chats: {
      screen: Chats,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Image
              source={{
                uri:
                  'https://www.iconsdb.com/icons/preview/color/2B60DE/chat-4-xxl.png',
              }}
              style={styles.sideMenuIcon}
            />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'AdvisorsList',
    activeColor: '#000',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#fff'},
  },
);

const AdvisorTabNavigator = createMaterialBottomTabNavigator(
  {
    AppointmentRequests: {
      screen: AdvisorAppointmentsActivity,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Image
              source={{
                uri:
                  'https://www.iconsdb.com/icons/preview/color/2B60DE/appointment-reminders-xxl.png',
              }}
              style={styles.sideMenuIcon}
            />
          </View>
        ),
      },
    },
    FYPRequests: {
      screen: AdvisorFypRequestActivity,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            {/* <Icon style={[{color: tintColor}]} size={25} name=

{'facebook'}/> */}

            <View>
              <Image
                source={{
                  uri:
                    'https://www.iconsdb.com/icons/preview/color/2B60DE/decision-xxl.png',
                }}
                style={styles.sideMenuIcon}
              />
            </View>
          </View>
        ),
      },
    },
    Chats: {
      screen: AdvisorChat,
      navigationOptions: {
        tabBarIcon: ({tintColor}) => (
          <View>
            <Image
              source={{
                uri:
                  'https://www.iconsdb.com/icons/preview/color/2B60DE/chat-4-xxl.png',
              }}
              style={styles.sideMenuIcon}
            />
          </View>
        ),
      },
    },
  },
  {
    initialRouteName: 'AppointmentRequests',
    activeColor: '#000',
    inactiveColor: '#3e2465',
    barStyle: {backgroundColor: '#fff'},
  },
);
const StudentHome_StackNavigator = createStackNavigator({
  StudentHome: {
    screen: StudentTabNavigator,
    navigationOptions: ({navigation}) => ({
      title: 'Home',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
});
const AdvisorHome_StackNavigator = createStackNavigator({
  AdvisorHome: {
    screen: AdvisorTabNavigator,
    navigationOptions: ({navigation}) => ({
      title: 'Home',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
});
const StudentEditProfileActivity_StackNavigator = createStackNavigator({
  StudentEditProfile: {
    screen: StudentEditProfileActivity,
    navigationOptions: ({navigation}) => ({
      title: 'Edit Profile',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
});
const AdvisorEditProfileActivity_StackNavigator = createStackNavigator({
  AdvisorEditProfile: {
    screen: Adv_AdvisorProfile,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
});

const AboutUsActivity_StackNavigator = createStackNavigator({
  AboutUs: {
    screen: AboutUsActivity,
    navigationOptions: ({navigation}) => ({
      title: 'About Us',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
});
const ContactUsActivity_StackNavigator = createStackNavigator({
  ContactUs: {
    screen: ContactUsActivity,
    navigationOptions: ({navigation}) => ({
      title: 'Contact Us',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
});
const UpdatePswdActivity_StackNavigator = createStackNavigator({
  UpdatePswd: {
    screen: ChangePwdActivity,
    navigationOptions: ({navigation}) => ({
      title: 'Update Password',
      headerLeft: <HamburgerIcon navigationProps={navigation} />,

      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
});

const StudentDrawerNavigator = createDrawerNavigator(
  {
    MainStack: {
      screen: StudentHome_StackNavigator,
    },
    SecondStack: {
      screen: StudentEditProfileActivity_StackNavigator,
    },

    ThirdStack: {
      screen: AboutUsActivity_StackNavigator,
    },
    FourthStack: {
      screen: ContactUsActivity_StackNavigator,
    },
    FifthStack: {
      screen: UpdatePswdActivity_StackNavigator,
    },
  },
  {
    contentComponent: Custom_Side_Menu,
    drawerWidth: Dimensions.get('window').width - 130,
  },
);
const AdvisorDrawerNavigator = createDrawerNavigator(
  {
    MainStack: {
      screen: AdvisorHome_StackNavigator,
    },
    SecondStack: {
      screen: AdvisorEditProfileActivity_StackNavigator,
    },

    ThirdStack: {
      screen: AboutUsActivity_StackNavigator,
    },
    FourthStack: {
      screen: ContactUsActivity_StackNavigator,
    },
    FifthStack: {
      screen: UpdatePswdActivity_StackNavigator,
    },
  },
  {
    contentComponent: AdvisorCustom_Side_Menu,
    drawerWidth: Dimensions.get('window').width - 130,
  },
);

const MainNavigator = createStackNavigator({
  Login: {
    screen: LoginActivity,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  Signup: {
    screen: SignupActivity,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  AdvisorSignup: {
    screen: AdvSignupActivity,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  StudentHomeScreen: {
    screen: StudentDrawerNavigator,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  AdvisorHomeScreen: {
    screen: AdvisorDrawerNavigator,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  ForgotPasswordScreen: {
    screen: ForgotPassword,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  FypForm: {
    screen: FYPRequestScreen,
    navigationOptions: ({navigation}) => ({
      title: 'FYP Request Form',
      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
  AppointmentForm: {
    screen: AppointmentRequestScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Appointment Request Form',
      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
  FypRequestView: {
    screen: FypRequestViewScreen,
    navigationOptions: ({navigation}) => ({
      title: 'FYP Request',
      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
  AppointmentView: {
    screen: AppointmentViewScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Appointment Request',
      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
  Adv_EditProfile: {
    screen: AdvisorEditProfileActivity,
    navigationOptions: ({navigation}) => ({
      //headerShown: false,
      title: 'Edit Profile',
      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
  Stu_AdvisorProfile: {
    screen: Stu_AdvisorProfile,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
  },
  SingleChat: {
    screen: SingleChatActivity,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#2B60DE',
      },
      headerTintColor: '#fff',
    }),
  },
   
  AdminProfile: {
    screen: admin_profile,
    navigationOptions: ({navigation}) => ({
      header: null,
    }),
  },
  Del_Std: {
    screen: del_student,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
  },
  Del_Adv: {
    screen: del_advisor,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
  },
  Add_Adv: {
    screen: add_advisor,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
  },
  AdminEditProfile: {
    screen: AdminEditProfileActivity,
    navigationOptions: ({navigation}) => ({
      headerShown: false,
    }),
  },
    
},

);

const App = createAppContainer(MainNavigator);
export default App;

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
    marginBottom: 150,
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
    width: 25,
    height: 25,
    marginLeft: 15,
    marginRight: 20,
    marginBottom: 8,
  },

  menuText: {
    fontSize: 15,
    color: '#222222',
    marginBottom: 8,
  },
});
