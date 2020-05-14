/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  Container,
  Header,
  Title,
  Content,
  Footer,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Accordion ,
  Card,
  CardItem,
  DatePicker,
  Badge,
  Thumbnail,
  Item,
  Input,
  Toast
} from 'native-base';
import {Image,StyleSheet  } from 'react-native';
// import {get} from './src/http/fetch.js';
// import CheckBoxExample from './src/components/common/CheckBoxExample'
// import SpinnerExample from './src/components/common/SpinnerExample'



class App extends Component {
  constructor(){
    super()
    this.state={
      chosenDate: new Date(),
      alarmList:[],
      showToast:false
    }
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  async loadData(req) {
    get('http://youziweb.cn:8888/api/alarm', req).then((res) => {
      console.log('result', res);
      this.setState({
        ...this.state,
        alarmList:res.data.map((item,idx)=>({
          title:item.time,
          content:item.address
        }))
      })
    });
  }
  componentDidMount() {
    console.log('hello React Native');
    // this.loadData({index: 0, size: 10});
  }
  render() {
    return(
      <Container>
      <Header>
        <Left>
          <Button transparent>
            <Icon name='menu' />
          </Button>
        </Left>
        <Body>
          <Title>Header</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Text>
          This is Content Section
        </Text>
      </Content>
      <Footer>
        <FooterTab>
          <Button full>
            <Text>Footer</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
    )
  }
}

export default App;
