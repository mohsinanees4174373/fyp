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
  AsyncStorage,
  YellowBox,
  
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import DocumentPicker from 'react-native-document-picker';

import {Input,Icon, SearchBar,Button, ListItem, Divider} from 'react-native-elements';
var url = require('../url');
const winWidth = Dimensions.get('window').width;
import * as mime from '../mime-type.json';
import {styles} from '../styles/PreviousFypStyles';

class PreviousFYPs extends Component {
  

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      search: '',
      uri:'',
      file_name:'',
      file_description:'',
      file:'',
      status:false
 
    };
    this.arrayholder = [];

      

    YellowBox.ignoreWarnings([
      'Warning: componentWillMount is deprecated',
      'Warning: componentWillReceiveProps is deprecated',
    ]);
  }
  componentDidMount(){
    console.log('calling')
   this.fetchFileContent();
  }
  fetchFileContent = async () =>
  {    
    console.log("content");
    await fetch(url.base_url + "/getadvisorPreviousFyps", {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        id:this.props.navigation.getParam('id','0'),
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
       this.arrayholder = this.state.data;

      };
    });     
  };

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
        adv_id: this.props.navigation.getParam('id','0'),
        datetime:  moment().format('YYYY-MM-DD hh:mm:ss'),
        file_path:path,
        file_type: res.type,
        description: this.state.file_description,
        name:this.state.file_name,
        fyp:"1",
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
        type: [DocumentPicker.types.pdf],
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

  searchFilterFunction = text => {
    console.log("arraySearch");

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.file_name.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({data: newData, search: text});
  };

  keyExtractor = (item, index) => index.toString();

  renderItem = ({item}) => (
    <View > 
        <View style={styles.rowContainer}>
            <TouchableOpacity onPress ={this.downloadFile.bind(this,{item})}>
                <Text style={styles.file_date}>{item.date}</Text>
                <View style ={{flexDirection:'row'}} >
                    <Image source={require('../assets/images/pdf.png')} style={styles.circleImageLayout} />
                    <View style ={{flex:1,flexDirection:'column',margin:10}} >
                        <Text style={styles.file_title}> {item.file_name}</Text>
                        <Text >{item.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View> 
        <Divider style={{elevation: 2,backgroundColor: 'grey',width: winWidth,height: 1,}}/>
    </View> 
  );

  addFYP = () => {
    console.log('this.state.data');
    
    if ( this.state.status )
    {
      return(
          
        <View style ={styles.addFileContainer}>
             <ListItem
               title={"Close..."}
               leftIcon={{name: 'minus', color: '#2b60de' ,type:'material-community'}}
               color='#000'
               onPress={this.ShowHideTextComponentView}
               style={{margin:-5}}
           /> 
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
      );
    }
    return (     
        <View > 
        <ListItem
               title={"Add FYP File..."}
               leftIcon={{name: 'plus', color: '#2b60de' ,type:'material-community'}}
               color='#000'
               bottomDivider
               onPress={this.ShowHideTextComponentView}
               style={{margin:5}}
           />   
    </View>
    )};
 

  
ShowHideTextComponentView = () =>{

    if(this.state.status == true)
    {
      this.setState({status: false})
    }
    else
    {
      this.setState({status: true})
    }
  }

  render() {
    const {search} = this.state.search;
    console.log("array"+this.arrayholder);
    console.log("data"+this.state.data);

    return (
    <View>
        <ScrollView>
          <View style={styles.Container}>
           <SearchBar
          placeholder="Search FYP..."
          onChangeText={text =>this.searchFilterFunction(text)}
          value={this.state.search}
          round={true}
          inputContainerStyle={{
            borderRadius: 20,
            backgroundColor: '#FFF',
            height: 45,
          }}
          containerStyle={styles.containerSearch}
          inputStyle={{color: '#2b60de'}}
          searchIcon={{color: '#2b60de', size: 28}}
          clearIcon={{color: '#2b60de', size: 28}}
        />
        {(this.props.navigation.getParam('user','')== 'advisor')?
           this.addFYP():null}

        
        <FlatList
           data={this.state.data }
            renderItem={this.renderItem}
            keyExtractor={(item,index) => index.toString()}
          />  
          </View>
          </ScrollView>
      </View>

    );
  }
}


export default PreviousFYPs;