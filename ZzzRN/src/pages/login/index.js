import React from 'react';
import { AuthContext } from '../../Context';
import { Container, Header, Content, Title, Form, Left, Right, Body, Item, Input, Label, Button, Text, Toast } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { post } from '../../http/fetch'
var Buffer = require('buffer').Buffer;

export default function Login({ navigation }) {
  const { signIn } = React.useContext(AuthContext);
  const Login=()=> {
    var adminStr = 'admin:ysw123'
    var base64Str = new Buffer(adminStr).toString('base64');
    fetch('http://youziweb.cn:8888/token', {
      headers: {
        'Authorization': `Basic ${base64Str}`
      },
      method: 'POST',
    })
      .then(response => {
        response.json().then(
          res => {
            console.log("login", res)
            if(res.code===0&&res.token){
              signIn()
            }else{
              alert(res.des)
            }
          }
        )
      }).catch((error) => {
        alert(error)
      })
  }
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent>
            <Ionicons name='ios-menu' size={20} color={'white'} />
          </Button>
        </Left>
        <Body>
          <Title>小武测试App</Title>
        </Body>
        <Right />
      </Header>
      <Content padder>
        <Form>
          <Item fixedLabel>
            <Label>账号:</Label>
            <Input />
          </Item>
          <Item fixedLabel last>
            <Label>密码:</Label>
            <Input />
          </Item>
        </Form>
        <Button block style={{ marginTop: 30 }} onPress={() => {
          Login();
        }}><Text> 登         录 </Text></Button>
      </Content>
    </Container>
  );
}