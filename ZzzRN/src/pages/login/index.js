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
import {apis} from '../../http/all-api.js'

var Buffer = require('buffer').Buffer;

export default function Login() {
  const [remember, setRember] = React.useState(false);
  const [code, setCode] = React.useState(null);
  const accountRef = React.createRef();
  const pwdRef = React.createRef();
  const phoneRef = React.createRef();
  const nameRef = React.createRef();
  const [registerNow, showRegister] = React.useState(false);
  const [phone, setPhone] = React.useState(null);
  const [account, setAccount] = React.useState(null);
  const [userName, setUserName] = React.useState(null);
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
      apis.System.regist({phone:phone,code:code,account:account,password:pwd,userName:userName}).then(
        res=>{
          console.log(res)
          if(res.code===0){
            alert('注册成功,请登录')
            showRegister(false)
          }else{
            alert(`注册失败:${res.des}`)
          }
        }
      )
    }
  };
  const checkPhone=(value)=>{
    setPhone(value)
  }
  const checkAccount = (value) => {
    setAccount(value);
  };
  const checkPwd = (value) => {
    setPwd(value);
  };
  const checkCode = (value) => {
    setCode(value);
  };
  const checkUserName = (value) => {
    setUserName(value);
  };
  const getSmsCode=()=>{
    console.log("获取验证码",phone)
    apis.System.getSmsCode({phoneNumber:phone}).then(
      res=>{
        if(res.des=='success'){
          alert('验证码已成功发送到您的短信中,请注意查收')
        }else{
          alert(`验证码发送失败:${res.des}`)
        }
      }
    )
    
  }
  return (
    <Container>
      <Header>
        <Body>
          <Title>测试App</Title>
        </Body>
      </Header>
      <Content padder>
        <Form>
          {registerNow === true ? (
            <Input
              ref={phoneRef}
              placeholder="Phone"
              leftIcon={
                <Icon name="ios-phone-portrait" size={20} color="grey" />
              }
              leftIconContainerStyle={{width: 30}}
              onChangeText={(value) => checkPhone(value)}
            />
          ) : null}
          <Input
            
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
            ref={nameRef}
            placeholder="UserName"
            leftIcon={<Icon name="md-contact" size={20} color="grey" />}
            leftIconContainerStyle={{width: 30}}
            onChangeText={(value) => checkUserName(value)}
         />
          ) : null}
           {registerNow === true ? (
            <Button transparent>
            <Text onPress={() => getSmsCode()}> 获取验证码 </Text>
          </Button>
          ) : null}
          {registerNow === true ? (
            <Input
              placeholder="Code"
              leftIcon={
                <Icon name="ios-text" size={20} color="grey" />
              }
              leftIconContainerStyle={{width: 30}}
              onChangeText={(value) => checkCode(value)}
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
