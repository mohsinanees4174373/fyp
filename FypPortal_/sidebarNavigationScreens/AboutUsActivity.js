/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
} from 'react-native';

export default class AboutUsActivity extends Component {
  render() {
    return (
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../assets/images/Pu.png')}
          />
          <View style={styles.line} />
          <Text style={styles.missionHeading}>Our Mission</Text>
          <Text style={styles.mission}>
            To reduce manual work and moves toward Smart Campus
          </Text>
          <View style={styles.aboutContainer}>
            <Image source={require('./mahroosh.jpg')} style={styles.myPic} />
            <View style={styles.descriptionText}>
            <Text style={{fontWeight:'bold'}}>Mahroosh Hashmi
            </Text>
              <Text>Mahroosh Hashmi Student of PUCIT. Developing this app as FYP and to provide a digitized solution of FYP interaction problems.
            </Text>
            </View>
          </View>

          <View style={styles.aboutContainer}>
            <Image source={require('./mypic.jpg')} style={styles.myPic} />
            <View style={styles.descriptionText}>
            <Text style={{fontWeight:'bold'}}>Mohsin Anees</Text>
              <Text>Student of PUCIT. Developing this app as FYP and to provide a digitized solution of FYP interaction problems.
            </Text>
            </View>
          </View>

          <View style={styles.aboutContainer}>
            <Image source={require('./mypic.jpg')} style={styles.myPic} />
            <View style={styles.descriptionText}>
            <Text style={{fontWeight:'bold'}}>Aroob Kausar</Text>
              <Text>Student of PUCIT. Developing this app as FYP and to provide a digitized solution of FYPinteraction problems.
            </Text>
            </View>
          </View>

          <View style={styles.aboutContainer}>
            <Image source={require('./mypic.jpg')} style={styles.myPic} />
            <View style={styles.descriptionText}>
            <Text style={{fontWeight:'bold'}}>Taimoor Hassan</Text>
              <Text>Student of PUCIT. Developing this app as FYP and to provide a digitized solution of FYP interaction problems.
            </Text>
            </View>
          </View>

          
          <View style={styles.aboutContainer}>
            <Image source={require('./mypic.jpg')} style={styles.myPic} />
            <View style={styles.descriptionText}>
            <Text style={{fontWeight:'bold'}}>Fatima Batool</Text>
              <Text>Student of PUCIT. Developing this app as FYP and to provide a digitized solution of FYP interaction problems.
            </Text>
            </View>
          </View>

         

          <View style={styles.line} />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
  missionHeading: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'serif',
    color: 'black',
    marginTop:5
  },
  mission: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: 'serif',
    color: 'grey',
    marginVertical:6
  },
  line: {
    flex: 1,
    backgroundColor: 'black',
    height: 1,
    width: 175,
    marginVertical: 15,
  },
  developerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  myPic: {
    flex: 1,
    height: 150,
    width: 110,
    marginLeft: 10,
    marginVertical:10,
    alignItems:'center',
    justifyContent:'center'
  },
  aboutContainer: {
    flex: 1,
    flexDirection:'row',
    padding: 5,
    margin:5,
    borderRadius: 5,
    elevation: 2,
  },
  descriptionText:{
    flex: 1,
    flexDirection: 'column',
    padding: 10,
    marginHorizontal:8,
    marginTop: 8,
    marginBottom: 8,
    borderRadius: 5,
    backgroundColor: '#FFF',
  }
});
