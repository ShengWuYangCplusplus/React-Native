import React from 'react';
import {AuthContext} from '../../Context';
import {
  Container,
  Header,
  Content,
  Title,
  Form,
  Left,
  Right,
  Body,
  Item,
  Label,
  Button,
  Text,
  Toast,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceStorage from '../../Storage/DeviceStorage';
import {Input} from 'react-native-elements';
var Buffer = require('buffer').Buffer;

export default function Login() {
  const accountRef = React.createRef();
  const pwdRef = React.createRef();

  const [account,setAccount]=React.useState('admin')
  const [pwd,setPwd]=React.useState('ysw123')
  const {signIn} = React.useContext(AuthContext);
  const Login = () => {
    console.log(account)
    console.log(pwd)
    var adminStr = `${account}:${pwd}`;
    var base64Str = new Buffer(adminStr).toString('base64');
    fetch('http://youziweb.cn:8888/token', {
      headers: {
        Authorization: `Basic ${base64Str}`,
      },
      method: 'POST',
    })
      .then((response) => {
        response.json().then((res) => {
          if (res.code === 0 && res.token) {
            console.log(res)
            DeviceStorage.save('token', res.token);
            DeviceStorage.save('userInfo', res.data);
            signIn();
          } else {
            alert(res.des);
          }
        });
      })
      .catch((error) => {
        alert(error);
      });
  };
  const checkAccount = (value) => {
    setAccount(value)
  };
  const checkPwd = (value) => {
    setPwd(value)
  };
  return (
    <Container>
      <Header>
        <Body>
          <Title>测试App</Title>
        </Body>
      </Header>
      <Content padder>
        <Form>
          <Input
            defaultValue={'admin'}
            ref={accountRef}
            placeholder="Account"
            leftIcon={<Icon name="logo-github" size={20} color="grey" />}
            leftIconContainerStyle={{width: 30}}
            onChangeText={(value) => checkAccount(value)}
          />
          <Input
            ref={pwdRef}
            defaultValue="ysw123"
            placeholder="Password"
            leftIcon={<Icon name="ios-key" size={20} color="grey" />}
            leftIconContainerStyle={{width: 30}}
            onChangeText={(value) => checkPwd(value)}
          />
        </Form>
        <Button
          block
          style={{marginTop: 30}}
          onPress={() => {
            Login();
          }}>
          <Text> 登 录 </Text>
        </Button>
      </Content>
    </Container>
  );
}
