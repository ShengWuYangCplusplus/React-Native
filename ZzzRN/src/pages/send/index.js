import React from 'react'
import { GiftedChat } from 'react-native-gifted-chat'
import SocketIOClient from 'socket.io-client';
import DeviceStorage from '../../Storage/DeviceStorage';
import {Header,Text,Container} from 'native-base';
export default class Send extends React.Component {
  state = {
    socket:null,
    userInfo:null,
    userNum:0,
    messages: [],
  }
  componentDidMount(){
    let socket=SocketIOClient('http://youziweb.cn:8888');
    this.setState({
      socket : socket,
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
      ],
    })
    DeviceStorage.get('userInfo').then(
      res=>{
        this.setState({...this.state,userInfo:res})
        socket.emit("login", { username: "user:" + res.name });
        socket.on("users", function (data) {
          this.setState({...this.state,userNum:data.number})
        }.bind(this));
        socket.on("receive_message", function (data) {
          console.log('receivedata',data);
          let str;
          if(data.avatar&&data.avatar.indexOf('http')!==-1){
            str=data.avatar
          }else{
            str=`http://youziweb.cn:8888${data.avatar}`
          }
          let newMessage={
            _id: new Date(),
            text: data.text,
            createdAt: new Date(),
            user: {
              _id: data.user,
              name: data.user,
              avatar: str,
              // avatar: this.state.userInfo?`http://youziweb.cn:8888${res.avatarPath}`:'http://att3.citysbs.com/200x200/hangzhou/2020/04/15/11/dd6719bd4287d9efd49434c43563a032_v2_.jpg',
            },
          }
          this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, newMessage),
          }))
        }.bind(this));
      }
    )
    
  }
  componentWillUnmount(){
    this.state.socket.emit('disconect')
    this.setState({...this.state,socket:null})
  }
  onSend(messages = []) {
    console.log("???",messages[0])
    this.state.socket.emit('message', {...messages[0],"avatar":this.state.userInfo.avatarPath||'http://pic4.zhimg.com/50/v2-f5c59ac2bbf4a83da1819eed1e8eb9c8_hd.jpg'});
  }
  render() {
    return (
      <Container>
        <Header><Text >当前在线人数:{this.state.userNum}</Text></Header>
        <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
      </Container>
      
    )
  }
}