import React from 'react';
import { AsyncStorage } from 'react-native';
import SocketIOClient from 'socket.io-client';
import { GiftedChat } from 'react-native-gifted-chat';
import { Container,Content,Text,Header } from 'native-base';

const USER_NAME = '@username';

export default class Send extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      username: null,
      userNum: null
    };
    this.determineUser = this.determineUser.bind(this);
    this.onReceivedMessage = this.onReceivedMessage.bind(this);
    this.onSend = this.onSend.bind(this);
    this._storeMessages = this._storeMessages.bind(this);

    this.socket = SocketIOClient('http://youziweb.cn:8888');
    

    this.socket.on('users', function (data) {
      // alert('当前在线人数：'+data.number);
      this.setState({ ...this.state, userNum: data.number })
    }.bind(this));
    this.socket.on('receive_message', this.onReceivedMessage);
    this.determineUser();
  }
  componentWillMount() {
    this.socket.emit('disconnect')
  }
  /**
   * When a user joins the chatroom, check if they are an existing user.
   * If they aren't, then ask the server for a username.
   * Set the username to the component's state.
   */
  determineUser() {
    AsyncStorage.getItem(USER_NAME)
      .then((username) => {
        // If there isn't a stored username, then fetch one from the server.
        if (!username) {
          this.socket.emit('login', null);
          this.socket.on('login', (username) => {
            AsyncStorage.setItem(USER_NAME, username);
            this.setState({ ...this.state,username });
          });
        } else {
          this.socket.emit('login', { username: 'user' + new Date().getTime() });
          this.setState({...this.state,username });
        }
      })
      .catch((e) => alert(e));
  }

  // Event listeners
  /**
   * When the server sends a message to this.
   */
  onReceivedMessage(messages) {
    this._storeMessages(messages);
  }
  /**
   * When a message is sent, send the message to the server
   * and store it in this component's state.
   */
  onSend(messages = []) {
    this.socket.emit('message', messages[0]);
    // this._storeMessages(messages);
  }
  render() {
    var user = { _id: this.state.username || -1 };
    return (
      <Container>
        <Header><Text>当前在线人数:{this.state.userNum}</Text></Header>
        
        <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={user}
      />
      </Container>
      
    );
  }
  // Helper functions
  _storeMessages(messages) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
}
