/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  ScrollView,
  FlatList,
  PermissionsAndroid,
  TouchableOpacity,
  View,
  Text,
  Alert,
  Image,
  Dimensions,
  AsyncStorage
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob from 'rn-fetch-blob';
import {Icon, Button, ListItem, Divider} from 'react-native-elements';
import {styles} from '../styles/ProfileStyles';
import {ProgressBar} from 'react-native-multicolor-progress-bar';
var url = require('../url');
const winWidth = Dimensions.get('window').width;
import * as mime from '../mime-type.json';

export default class Stu_AdvisorProfile extends Component {
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
    };
} 
   componentDidMount(){
    console.log('calling')
   this.getAdvisor();
  }

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
  getAdvisor = async () => {
    fetch(url.base_url + "/getAdvisor", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: this.props.navigation.getParam('email','abc'),
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
  fetchFileContent = async () =>
  {    
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
              console.log(this.state.data[index].uri);
              this.renderItem(this.state.data[index]); 

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

  renderItem = ({item}) => {
    var mime = item['type'].split('/');
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
      )
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

  navigateToAppointmentForm = item =>
    this.props.navigation.navigate('AppointmentForm',{id: this.state.id});

  navigateToFYPForm = item => this.props.navigation.navigate('FypForm');

  render() {
    console.log("1");
    return (
      <View>
        <ScrollView>
          <View style={styles.Container}>
            <View style={styles.top}>
              <Text style={styles.profileText}>Profile</Text>
              <TouchableOpacity
                style={styles.container}
                activeOpacity={0.5}
                onPress={() => console.log('Works!')}>
                 { this.state.uri? <Image source={{uri: `data:jpeg;base64,${ this.state.uri}`}}  style={styles.circleImageLayout} /> :<Image source={require('../assets/images/av2.png')} style={styles.circleImageLayout}/>}
              </TouchableOpacity>
              <Text style={styles.text}>
                {this.state.adv_name}
              </Text>
              <Text style={styles.descriptionText}>
                {this.state.adv_designation}
              </Text>
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
              <View
                pointerEvents="none"
                style={
                  this.state.adv_available
                    ? styles.stu_switch
                    : [styles.stu_switch, styles.onSwitch]
                }>
                <Text
                  // eslint-disable-next-line no-undef
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
              </View>
              <View style={styles.buttons}>
                <Button
                  icon={{name: 'send', size: 25, color: '#FFF'}}
                  buttonStyle={styles.buttonStyle}
                  title="Send Appointment"
                  onPress={() => this.props.navigation.navigate('AppointmentForm',{id: this.state.id})}
                />
                <Button
                  icon={{name: 'send', size: 25, color: '#FFF'}}
                  buttonStyle={styles.buttonStyle}
                  title="Send Request"
                  onPress={() => this.props.navigation.navigate('FypForm',{id: this.state.id})}
                />
              </View>
              <Divider
                style={{
                  elevation: 2,
                  backgroundColor: 'grey',
                  width: winWidth,
                  height: 1,
                }}
              />
              <View style={{width: winWidth, flex: 1}}>
                <ListItem
                  title="Technology"
                  subtitle={this.state.adv_description}
                  leftIcon={{name: 'laptop', color: '#2b60de'}}
                  bottomDivider
                />
              <ListItem
                title="Previous FYP"
                subtitle="Previous Fyps ka link dalna"
                leftIcon={{name: 'done', color: '#2b60de'}}
              />
            
              </View>
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
          <FlatList
           data={this.state.data }
            renderItem={this.renderItem}
            keyExtractor={(item,index) => index.toString()}
          />         
        </ScrollView>  
      </View>
    );
  }
}
