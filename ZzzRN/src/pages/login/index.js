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
  ListItem,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceStorage from '../../Storage/DeviceStorage';
import {Input, CheckBox} from 'react-native-elements';
var Buffer = require('buffer').Buffer;

export default function Login() {
  const [remember, setRember] = React.useState(false);
  const accountRef = React.createRef();
  const pwdRef = React.createRef();
  const phoneRef = React.createRef();
  const [registerNow, showRegister] = React.useState(false);
  const [account, setAccount] = React.useState('admin');
  const [pwd, setPwd] = React.useState('');
  const {signIn} = React.useContext(AuthContext);
  const Login = () => {
    if (registerNow === false) {
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
              console.log(res);
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
    }else{
      alert("注册中")
    }
  };
  const checkAccount = (value) => {
    setAccount(value);
  };
  const checkPwd = (value) => {
    setPwd(value);
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
            defaultValue={registerNow===false?'admin':''}
            ref={accountRef}
            placeholder="Account"
            leftIcon={<Icon name="logo-github" size={20} color="grey" />}
            leftIconContainerStyle={{width: 30}}
            onChangeText={(value) => checkAccount(value)}
          />
          <Input
            ref={pwdRef}
            placeholder="Password"
            leftIcon={<Icon name="ios-key" size={20} color="grey" />}
            leftIconContainerStyle={{width: 30}}
            onChangeText={(value) => checkPwd(value)}
          />
          {registerNow === true ? (
            <Input
              ref={phoneRef}
              placeholder="Phone"
              leftIcon={
                <Icon name="ios-phone-portrait" size={20} color="grey" />
              }
              leftIconContainerStyle={{width: 30}}
              onChangeText={(value) => checkPwd(value)}
            />
          ) : null}
        </Form>
        {registerNow === false ? (
          <CheckBox
            checked={remember}
            title="Remember Me"
            textStyle={{color: 'blue'}}
            onPress={() => {
              setRember(!remember);
            }}
          />
        ) : null}
        {registerNow === false ? (
          <Button transparent>
            <Text style={{color: 'gray'}}> 没有账号?</Text>
            <Text onPress={() => showRegister(true)}> 去注册 </Text>
          </Button>
        ) : (
          <Button transparent>
            <Text style={{color: 'gray'}}> 已有账号?</Text>
            <Text onPress={() => showRegister(false)}> 去登录 </Text>
          </Button>
        )}
        <Button
          block
          style={{marginTop: 30}}
          onPress={() => {
            Login();
          }}>
          {registerNow === true ? <Text>注 册</Text> : <Text>登 录</Text>}
        </Button>
      </Content>
    </Container>
  );
}
