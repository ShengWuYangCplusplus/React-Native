import React from 'react';
import { Container, Header, Content, Form,Left, Item, Input, Label,Button ,Text,Toast } from 'native-base';
export default function Login({navigation}) {
    return (
      <Container>
        <Content>
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
          <Button block style={{marginTop:30}} success onPress={()=>navigation.navigate('Mine')}><Text> 登         录 </Text></Button>
        </Content>
      </Container>
    );
}