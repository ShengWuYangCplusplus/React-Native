import React, { Component } from 'react';
import { Container, Header, Content, Form,Left, Item, Input, Label } from 'native-base';
export default class Login extends Component {
  render() {
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
        </Content>
      </Container>
    );
  }
}