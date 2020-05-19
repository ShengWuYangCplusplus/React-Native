/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState, useEffect } from 'react';
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
import { Image, StyleSheet } from 'react-native';
import { get } from '../../http/fetch';
import {ListItem} from 'react-native-elements'

export default function Mine({ navigation }) {
  const [alarmList, setList] = useState([])
  
  keyExtractor = (item, index) => index.toString()
  useEffect(() => {
    const fetchData = async () => {
      const result = await get('http://youziweb.cn:8888/api/alarm', { index: 0, size: 10 })
      console.log("res", JSON.stringify(result))
      setList(result.data);
    }
    fetchData();
  }, []);
  const [count, setCount] = useState(0)
  useEffect(() => {
    console.log(`you clicked ${count} times`)
  },[count])   //仅在count更改时更新
/**
 * 可以把 useEffect Hook看做componentDidMount componentDidUpdate和componentWillUmount这三个函数的结合
 * 你可能任务需要单独的effect来执行清除操作 但由于添加和删除订阅的代码的紧密性  所以useEffect的设计是在同一个地方执行  如果你的effect返回一个函数 React将会在执行清除操作时调用它
 * 为什么要在effect中返回一个函数 这是effect可选的清除机制  每个effect都可以返回一个清除函数  如此可以将添加和移除订阅的逻辑放在一起  它们都属于effect的一部分
 * react何时清除effect?react会在组件卸载的时候 执行清除操作 
 * 正如之前学到的 effect在每次渲染的时候都会执行 这就是为什么React会在执行当前effect之前对上一个effect进行清除 
 * 并不是必须为effect中返回的函数命名,这里我们将其命名为cleanup时为了表明此函数的目的但其实也可以返回一个箭头函数或者起一个别的名字
 * 就像你可以使用多个state的Hook一样 你也可以使用多个effect 这会将不相关逻辑分离到不同的effect中
 * React将按照effect声明的顺序依次调用组件中的每一个effect
 * 通过跳过effect进行性能优化
 * 在某些情况下 每次渲染后都执行清理或者执行effect可能会导致性能问题 在class组件中 我们可以用过在componentDidUpdate中添加对prevProps或prevState的比较逻辑解决
 * 这是很常见的需求,所以它被内置到了useEffect的Hook API中 如果某些特定值在两次重渲染之间没有发生变化,你可以通知React跳过对effect的调用  只要传递数组作为useEffect的第二个可选参数即可
 * 上面这个示例中 我们传入[count]作为第二个参数 这个参数是什么作用呢  如果count的值是5  而且我们的组件重渲染的时候 count还是等于5  React将对前一次渲染的[5]和后一次渲染的[5]进行比较 因为数组中的所有元素都是相等的(5===5) React会跳过这个effect,这就实现了性能的优化
 * 当渲染时 如果count的值更新成了6   React将会把前一次渲染的数组[5]和这次渲染的数组[6]中的元素进行对比, 因为5!==6React就会再次调用effect  如果数组中有多个元素 即使只有一个元素发生变化 React也会执行effect
 * 对于有清除操作的effect同样适用
 * 未来版本可能会在构建时自动添加第二个参数
 * 如果想执行只运行一次的effect (仅在组件挂载和卸载时执行)可以传递一个空数组([])作为第二个参数 这就告诉React你的effect不依赖于props或state中的任何值  所以它永远都不需要重复执行
 */


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
                <Text note>you clicked {count} times</Text>
                <Button onPress={() => setCount(count + 1)}><Text>Click me</Text></Button>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={require('../../assets/img/car_01.jpg')}
              style={{ height: 200, width: null, flex: 1 }}
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
              style={{ height: 200, width: null, flex: 1 }}
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

        {alarmList.map((item, idx) => (
          <Card key={idx}>
            <CardItem>
              <Left>
                <Thumbnail source={{ uri: 'Image URL' }} />
                <Body>
                  <Text>{item.time}</Text>
                  <Text note>{item.address}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem cardBody>
              <Image
                source={require('../../assets/img/air01.jpg')}
                style={{ height: 200, width: 400, flex: 1 }}
              />
            </CardItem>
          </Card>
        ))}
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
              style={{ height: 200, width: null, flex: 1 }}
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
              style={{ height: 200, width: null, flex: 1 }}
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
        <Button danger rounded onPress={()=>{
          alert("shit")
          navigation.navigate('Login')}}>
                <Icon active name="thumbs-up" />
                <Text>退出登录</Text>
              </Button>
      </Content>
    </Container>
  );
}
