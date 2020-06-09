/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  ScrollView,
  FlatList,
  PermissionsAndroid,
  TouchableOpacity,
  View,
  Text,
  Image,
  Dimensions,
  AsyncStorage,
  TextInput,
  Alert
} from 'react-native';
import {Input,Icon, Button, ListItem, Divider} from 'react-native-elements';
import SwitchToggle from 'react-native-switch-toggle';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {styles} from '../styles/ProfileStyles';
import {ProgressBar} from 'react-native-multicolor-progress-bar';
var url = require('../url');
const winWidth = Dimensions.get('window').width;
import * as mime from '../mime-type.json';

export default class Adv_AdvisorProfile extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      id:'',
      totalSlots : '',
      availableSlots : '',
      adv_image: '',
      adv_name: '',
      adv_description: '',
      adv_designation: '',
      adv_available: '',
      data:[],
      progressReadings: [],
      uri:'',
      hours:'',
      file_name:'',
      file_description:'',
      file:'',
      refresh:false,
    };
} 
   componentDidMount(){
    console.log('calling')
    this.getUser();
    this.setState({refresh:true});
  }
  fetchFileContent = async () =>
  {
    console.log("2");
  console.log(this.state.data);     
    console.log("content");
    await fetch(url.base_url + "/getadvisorContent", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id:this.state.id,
    })
  })
  .then((response) => response.json())
  .then((responseJson)  => {
    var datalits=[];
     if(responseJson[0])
      {
        console.log("content2");

         var i =0;
         for (i; i < Object.keys(responseJson).length ; i++)
        {
          var mimetype = responseJson[i].file_type.split('/');
          var filepath = responseJson[i].file_path;
          if (mimetype[0] =='image' )
          {
            console.log("i:"+i);
            console.log(filepath);

            RNFetchBlob
            .fetch('GET', url.base_url + "/getfile?path=" + filepath, {})
            .then((res) => {
       
              this.setState({images:res.data});
              console.log("uri  " +res.respInfo['redirects']);
              var getpath =((res.respInfo['redirects'][0]).split('?path=')[1]).replace('%20',' ')
              console.log(getpath);
              var a = res.redirects;        
              var index=this.state.data.findIndex(obj => obj.path === getpath);
              console.log("index" +index);
              this.state.data[index].uri=res.data; 
              this.renderItem(this.state.data[index]); 

              console.log(this.state.data[index].uri);

             })
            .catch((e) => {
              console.log(e)
            });
              console.log("ie:"+i);
          }
          
          console.log("ii:"+i);
          datalits.push(
          {
            id:i,
            adv_name:this.state.adv_name,
            date: (new Date((responseJson[i].datetime)).toLocaleString(undefined, {
            dateStyle: "medium",
            timeStyle:	"full",hour12:	false})),
            description: responseJson[i].description,
            type: responseJson[i].file_type,
            file_name: responseJson[i].name,
            path: responseJson[i].file_path,
            uri:'',
          });
       }    
       this.setState({data:datalits});    
      };
    });     
  };
  getProfilePic = async () =>
  {
    console.log("profileeeeeeeeeeeeeeeee");
    RNFetchBlob
    .fetch('GET', url.base_url + "/getfile?path=" + this.state.adv_image, {})
    .then((res) => {    
      
    this.setState({uri:res.data});
    console.log(this.state.uri);
     })
    .catch((e) => {
    console.log(e)
    });
           
  };
  pickImage=async()=>{
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
    console.log( res.type,      );
      this.setState({file:res});
      this.uploadProfile(this.state.file);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  } 
  uploadProfile=(res)=>{RNFetchBlob.fetch('POST', url.base_url + "/api/upload?folder=adv_profile", {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
  }, [
    { name : 'file', filename : this.state.id+"_"+res.name, type:res.type, data: RNFetchBlob.wrap(res.uri)},
  ]).then((resp) => {
    console.log("resp");
    var path = resp.data;
    this.setState({adv_image:path}); 
    fetch(url.base_url + "/changeAdvProfilePic", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id: this.state.id,
        pic: path,
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {   
    this.setState({file:''}); 
    this.getProfilePic();

    })
    // ...
  }).catch((err) => {
    // ...
  })
  }
  uploadFile=(res)=>{RNFetchBlob.fetch('POST', url.base_url + "/api/upload?folder=upload", {
    Authorization : "Bearer access-token",
    otherHeader : "foo",
    'Content-Type' : 'multipart/form-data',
  }, [
    { name : 'file', filename : res.name, type:res.type, data: RNFetchBlob.wrap(res.uri)},
  ]).then((resp) => {
    console.log("resp");
    var path = resp.data;
    var moment = require('moment');
  
    fetch(url.base_url + "/insertAdvisorContent", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        adv_id: this.state.id,
        datetime:  moment().format('YYYY-MM-DD hh:mm:ss'),
        file_path:path,
        file_type: res.type,
        description: this.state.file_description,
        name:this.state.file_name,
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {    
    this.setState({file_name:'',file_description:'',file:''});
    this.fetchFileContent();

    })
    // ...
  }).catch((err) => {
    // ...
  })
  }

  checkFile=()=>
  {
    console.log("vfdgfhjmfgdksdjkdddddddddddddddddddddddddddddddddddddddddddddd");
    console.log(this.state.file_name +this.state.file_description );
    if((this.state.file_name != '') && (this.state.file_description != '')&& (this.state.file != '') )
    {
      this.uploadFile(this.state.file);     
    }
  else
    {
     Alert.alert("Add File Details");
    }
  }
  pickfile=async()=>{
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(res.type, );
      this.setState({file:res});
    
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  } 
  download = ({item}) => {  

    console.log(mime[item['type']]);
    console.log(item['type']);
    const { dirs } = RNFetchBlob.fs;
    RNFetchBlob.config({
      fileCache: true,
      appendExt : mime[item['type']],
      addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      mediaScannable: true,
      title: item['file_name'],
      path: `${dirs.DownloadDir}` +'/'+ item['file_name']+'.'+mime[item['type']] ,},
     
     })
    .fetch('GET', url.base_url + "/getfile?path=" + item['path'], {})
    .then((res) => {
     })
    .catch((e) => {
      console.log(e)
    });
  }

  downloadFile =async ({item}) => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.download({item});
      } else {
        Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
      }
    } catch (err) {
        console.warn(err);
    } 
  }
  renderItem = ({item}) => {
    console.log('this.state.data');
    console.log(item);

    var mime = item.type.split('/');
    console.log('this.state.data');
    console.log(item);
    if (mime[0] == 'image' )
    {
      return(
        <View > 
           <View style={styles.rowContainer}>
             <Text style={styles.file_adv_name}>{item.adv_name}</Text>
             <Text style={styles.file_date}>{item.date}</Text>
             <Text >{item.description}</Text>
             <View style={styles.imageContainer}>
               {item['uri']?console.log('true'):console.log('false')}
               { item['uri']? <Image source={{uri: `data:${item['type']};base64,${item['uri']}`}}  style={styles.ImageLayout} /> :<Image source={require('../assets/images/file.png')} style={{width:winWidth,height:300}} /> 
              }
             </View>
           </View> 
           <Divider style={{elevation: 2,backgroundColor: 'grey',width: winWidth,height: 1,}}/>
        </View> 
      );
    }
    return (     
      <View > 
        <View style={styles.rowContainer}>
          <Text style={styles.file_adv_name}>{item.adv_name}</Text>
          <Text style={styles.file_date}>{item.date}</Text>
          <Text >{item.description}</Text>
          <TouchableOpacity onPress ={this.downloadFile.bind(this,{item})}>
            <View style={styles.container_row_image}>
              <Image source={require('../assets/images/file.png')} style={{width:30,height:30}} />
              <Text style={styles.file_title}> {item.file_name}</Text>
           </View>
          </TouchableOpacity>
        </View> 
        <Divider style={{elevation: 2,backgroundColor: 'grey',width: winWidth,height: 1,}}/>
      </View> 
    )};
  percentage = ()=>{
    console.log(this.state.availableSlots);
    var value1 = this.state.availableSlots/this.state.totalSlots;
    var value2 = 1-value1;
   let readings = [
   {
     color: '#29cb29', //'#2b60de' //red
     value: value1,
     nameToDisplay: Number((value1*100).toFixed(0)) + "% Completed",
   },
   {
     color: '#cd0909',//#a2a2a2
     value: value2,
     nameToDisplay: Number((value2*100).toFixed(0)) + "%" ,
   },];
   return readings;  
 };

  navigateToEditProfile=()=>
  {
    this.setState({refresh:false});
    this.props.navigation.navigate('Adv_EditProfile');
  }
  navigateToAppointmentView = item =>
    this.props.navigation.navigate('AppointmentView');

  navigateToFYPForm = item => this.props.navigation.navigate('AppointmentForm');

  onPress1 = async() => {
    const retrievedItem =  await AsyncStorage.getItem('userdata'[2]);
    console.log('1234567809786543212345');
    console.log(retrievedItem);
    this.setState({adv_available: !this.state.adv_available});
    fetch(url.base_url + "/changeAvailability", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        value: this.state.adv_available,
        id: this.state.id,
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson[0])
      {
      }
  });
  }
  keyExtractor = (item, index) => index.toString();


  getUser = async () => {

    const email =  await AsyncStorage.getItem('email');
    console.log(email);
    fetch(url.base_url + "/getAdvisor", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
    })
  })
  .then((response) => response.json())
  .then((responseJson) => {
      if(responseJson[0])
      {      
          this.setData(responseJson[0]);
      }
  });
  }
   setData = async(response)=>{
      await this.setState({totalSlots:response.fyp_total_slots,
      availableSlots:response.fyp_availiable_slots,
      adv_name: response.Name,
      email:response.email,
      adv_description: response.description,
      adv_designation: response.designation,
      adv_available: response.availability,
      id:response.adv_ID,
      hours:response.visitng_hurs,
      adv_image:response.profile_Pic,
      });
      this.setState({progressReadings:this.percentage()});
      this.fetchFileContent();
      this.getProfilePic();

      console.log('this.state.visitng_hurs');
      console.log(this.state.hours);
  }
  
  render() {
    {console.log(this.state.refresh);
    this.state.refresh?null:this.componentDidMount();}
    return (
      <View>
        <ScrollView>
          <View style={styles.Container}>
            <View style={styles.top}>
              <View
                style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                }}>
                <View style={{flex: 1}} />
                <View style={{flex: 1}}>
                  <Text style={styles.profileText}>Profile</Text>
                </View>
                <View
                  style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  marginEnd: 5,
                  marginTop: 3,
                  }}>
                  <Icon
                    color="#FFF"
                    name="account-edit"
                    size={35}
                    type="material-community"
                    onPress={this.navigateToEditProfile}
                  />
                </View>
              </View>
              <TouchableOpacity
                style={styles.container}
                activeOpacity={0.5}
                onPress={() => Alert.alert(
                  'Profile Pic',
                  'Edit picture',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: this.pickImage},
                  ],
                  {cancelable: false},
                )}>
                
                { this.state.uri? <Image source={{uri: `data:jpeg;base64,${ this.state.uri}`}}  style={styles.circleImageLayout} /> :<Image source={require('../assets/images/av2.png')} style={styles.circleImageLayout}/>}
      
              </TouchableOpacity>
              <Text style={styles.text}>{this.state.adv_name}</Text>
              <Text style={styles.descriptionText}>{this.state.adv_designation}</Text>
            </View>
            <View style={styles.Container}>
              <View style={{alignItems: 'center', margin: 15}}>
                <ProgressBar
                  numberOfProgressBars={2}
                  backgroundBarStyle={{height: 30,width:winWidth-20,marginHorizontal:50,}}
                  textStyle= {[styles.slotText,{fontSize:12,marginHorizontal:2}]}
                  arrayOfProgressObjects={this.state.progressReadings}
                />
                <Text style={styles.slotText}>
                  {'Available Slots:  '}
                  {this.state.availableSlots}
                  {'/'}
                  {this.state.totalSlots}
                </Text>
              </View>
            </View>  
            <View
              style={this.state.adv_available? styles.switch: [styles.switch, styles.onSwitch]}>
              <View style={styles.switchText}>
                <Text
                  style={
                    this.state.adv_available
                    ? styles.AvailableText
                    : [styles.AvailableText, styles.NotAvailableText]
                  }>
                  {this.state.adv_available
                    ? 'Currently Available'
                    : 'Currently Unavailable'}
                </Text>
                <Text style={styles.TimeText}>
                  {'Visiting Hours: '}
                  {((this.state.hours.split(',')))[0] }{'PM - ' }
                  {((this.state.hours.split(',')))[1] }{'PM'}
                </Text>

                <SwitchToggle
                  containerStyle={{
                    marginVertical: 30,
                    marginHorizontal: 10,
                    width: 70,
                    height: 35,
                    borderRadius: 25,
                    backgroundColor: '#ccc',
                    padding: 5,
                  }}
                  backgroundColorOn="#FFF"
                  backgroundColorOff="#FFF"
                  circleColorOff="#c10909"
                  circleColorOn="#0f8790"
                  circleStyle={{
                    backgroundColor: 'white',
                    width: 25,
                    height: 25,
                    borderRadius: 15,
                  }}
                  switchOn={this.state.adv_available}
                  onPress={this.onPress1}
                />
              </View>
            </View>  
            
            <Divider
                style={{
                  elevation: 2,
                  backgroundColor: 'grey',
                  width: winWidth,
                  height: 1,
                  marginTop:15
                }}
              />
              <View style={{width: winWidth, flex: 1,}}>
                <ListItem
                  title="Technology"
                  subtitle={this.state.adv_description}
                  leftIcon={{name: 'laptop', color: '#2b60de'}}
                  color='#000'
                  bottomDivider
                />
                <ListItem
                  title="Previous FYP"
                  subtitle="Previous Fyps ka link dalna"
                  leftIcon={{name: 'done', color: '#2b60de'}}
                />
             
              <Divider
                style={{
                  elevation: 2,
                  backgroundColor: 'grey',
                  width: winWidth,
                  height: 1,
                }}
              />
            </View>
          </View>
          <View style ={styles.addFileContainer}>
            <View style={{flexDirection:'row',alignContent:'center',justifyContent:'space-between'}}>
              <Text style={{fontSize:15,textAlign:'center',margin:5}}>UPLOAD FILES</Text>
              <Button
                icon={{name: 'send', size: 20, color: '#FFF'}}
                buttonStyle={styles.buttonPost}
                title="Send"
                onPress={this.checkFile}
              />
            </View>        
              <Input
                placeholder='name...'
                leftIcon={
                  <Icon
                    name='pencil'
                    size={24}
                    type='material-community'
                    color='#2b60de'
                  />  }
                label ='File Name'  
                onChangeText={file_name=> {this.setState({file_name})}}
                value={this.state.file_name}
              />            
              <Input
                placeholder='description....'
                leftIcon={
                  <Icon
                    name='details'
                    size={24}
                    type='material-community'
                    color='#2b60de'
                  />}
                  onChangeText={file_description=> {this.setState({file_description})}}
                  label= 'File Description'
                  value={this.state.file_description}
                />              
              <ListItem
                  title={this.state.file?this.state.file.name:"Attach File..."}
                  leftIcon={{name: 'file-upload', color: '#2b60de' ,type:'material-community'}}
                  color='#000'
                  bottomDivider
                  onPress={this.pickfile}
                  style={{margin:5}}
                />           
          </View>
          <FlatList
            data={this.state.data }
            renderItem={this.renderItem}
            keyExtractor={(item,index) => index.toString()}
          />         
          <Divider
                style={{
                  elevation: 2,
                  backgroundColor: 'grey',
                  width: winWidth,
                  height: 1,
                }}
              />
        </ScrollView>  
      </View>

    );
  }
}
