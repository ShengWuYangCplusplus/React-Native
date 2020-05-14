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
import {get} from './src/http/fetch.js';
import CheckBoxExample from './src/components/common/CheckBoxExample'
import SpinnerExample from './src/components/common/SpinnerExample'



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
    this.loadData({index: 0, size: 10});
  }
  render() {
    return (
      <Container>
        <Header searchBar rounded>
        <Item>
            <Icon android="md-menu" />
            <Input placeholder="Search" />
            <Icon name="ios-people" android="ios-people"/>
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <Content padder>
        <Text style={styles.iconStyle}>{'\xe62e'}</Text>
          <Accordion
            dataArray={this.state.alarmList}
            icon="add"
            expandedIcon="remove"
            iconStyle={{ color: "green" }}
            expandedIconStyle={{ color: "red" }}
          />
          <Button transparent success>
            <Text>Success111</Text>
          </Button>
          <Button rounded  transparent warning>
            <Text>Warning</Text>
          </Button>
          <Button transparent dark>
            <Text>Dark</Text>
          </Button>
          <Button iconLeft>
            <Icon name='home' />
            <Text>Home</Text>
          </Button>
          <Card>
            <CardItem>
              <Icon active name="logo-googleplus" />
              <Text>Google Plus</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
           </Card>
           <CheckBoxExample></CheckBoxExample>
           <Button success
            onPress={() =>
              Toast.show({
                text: "Wrong password!",
                buttonText: "Okay",
                type: "success"
              })}
          >
            <Text>Success Toast</Text>
          </Button>
           <DatePicker
            defaultDate={new Date(2020, 5, 14)}
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2023, 12, 31)}
            locale={"en"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Select date"
            textStyle={{ color: "green" }}
            placeHolderTextStyle={{ color: "#d3d3d3" }}
            onDateChange={this.setDate}
            disabled={false}
            />
            <Text>
              Date: {this.state.chosenDate.toString().substr(4, 12)}
            </Text>
            <SpinnerExample></SpinnerExample>
            <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={require('./src/assets/img/car_03.jpg')} style={{height: 300, width:310, flex: 1}}/>
                <Text>
                  BMW
                </Text>
                <Image source={require('./src/assets/img/car_02.jpg')} style={{height: 300, width:310, flex: 1}}/>
                <Text>
                  Audi
                </Text>
                <Image source={require('./src/assets/img/car_01.jpg')} style={{height: 300, width:310, flex: 1}}/>
                <Text>
                  Audi
                </Text>
                <Image source={require('./src/assets/img/car_04.jpg')} style={{height: 300, width:310, flex: 1}}/>
                <Text>
                  Audi
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="logo-github" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
        <Footer>
        <FooterTab>
            <Button vertical>
              <Icon name="apps" />
              <Text>Apps</Text>
            </Button>
            <Button vertical>
              <Icon name="camera" />
              <Text>Camera</Text>
            </Button>
            <Button vertical >
              <Icon active />
              <Text>Navigate</Text>
            </Button>
            <Button vertical>
              <Icon name="person" />
              <Text>Contact</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  viewStyle: {
      flexDirection: 'row',
      marginTop: 10
  },
  iconStyle: {
      fontFamily: 'iconfont',
      fontSize: 24,
      marginTop: 10,
      marginLeft: 10
  },
  svgStyle: {
      marginTop: 10,
      marginLeft: 30
  }
})
export default App;
