import * as React from 'react';
import {Card, ListItem, Button, Icon} from 'react-native-elements';
const users = [
  {
    name: 'brynn11',
    avatar: 'https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png',
  },
  {
    name: 'brynn11',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
  {
    name: 'brynn11',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg',
  },
];
export default function MessageScreen({navigation}) {
  return (
    <Card containerStyle={{padding: 0}}>
      {users.map((u, i) => {
        return (
          <ListItem
            key={i}
            roundAvatar
            title={u.name}
            avatar={{uri: u.avatar}}
            onPress={()=>navigation.navigate('SendDetail')}
          />
        );
      })}
    </Card>
  );
}
