/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

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

import {GiftedChat} from 'react-native-gifted-chat';
import { HeaderTitle } from 'react-navigation-stack';

export default class SingleChatActivity extends Component {
  
  static navigationOptions = ({ navigation }) => ({
      
    title: navigation.getParam('name'),
    
    
  })
  state = {
    messages: [],
  };
  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello :)',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
          image: 'https://reactjs.org/logo-og.png',
          // You can also add a video prop:
          //video: 'https://www.youtube.com/watch?v=LT06zadR_fo',
          // Any additional custom parameters are passed through
        },
      ],
    });
  }
  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
