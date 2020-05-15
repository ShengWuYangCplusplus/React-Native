/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
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
  Accordion,
  Card,
  CardItem,
  DatePicker,
  Badge,
  Thumbnail,
  Item,
  Input,
  Toast,
} from 'native-base';
import {Image, StyleSheet} from 'react-native';
import {get} from '../../http/fetch';

export default function Mine({navigation}) {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    alert(`You clicked ${count} times`)
  });

  return (
    <Container>
      <Content>
        <Card>
          <CardItem>
            <Left>
              {/* <Thumbnail source={{uri: 'Image URL'}} /> */}
              <Body>
                <Text>NativeBase</Text>
                <Text note>GeekyAnts</Text>
                <Text>You clicked {count} times</Text>
                <Button onPress={() => setCount(count + 1)}><Text>Click me</Text></Button>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={require('../../assets/img/car_01.jpg')}
              style={{height: 200, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Left>
              {/* <Thumbnail source={{uri: 'Image URL'}} /> */}
              <Body>
                <Text>NativeBase</Text>
                <Text note>GeekyAnts</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={require('../../assets/img/car_02.jpg')}
              style={{height: 200, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>

        {/* {data.hits.map((item, idx) => (
          <Card key={idx}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: 'Image URL'}} />
                <Body>
                  <Text>{item.time}</Text>
                  <Text note>{item.address}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={require('../../assets/img/air01.jpg')}
                style={{height: 200, width: 400, flex: 1}}
              />
            </CardItem>
          </Card>
        ))} */}
        <Card>
          <CardItem>
            <Left>
              {/* <Thumbnail source={{uri: 'Image URL'}} /> */}
              <Body>
                <Text>NativeBase</Text>
                <Text note>GeekyAnts</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={require('../../assets/img/car_03.jpg')}
              style={{height: 200, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>
        <Card>
          <CardItem>
            <Left>
              {/* <Thumbnail source={{uri: 'Image URL'}} /> */}
              <Body>
                <Text>NativeBase</Text>
                <Text note>GeekyAnts</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={require('../../assets/img/car_04.jpg')}
              style={{height: 200, width: null, flex: 1}}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Icon active name="thumbs-up" />
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
}
