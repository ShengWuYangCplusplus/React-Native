import React, { useEffect } from 'react';
import {View, Image, FlatList} from 'react-native';
import {Button, Text} from 'native-base';
import ImagePicker from 'react-native-image-picker';
import axios from 'axios';
import {Avatar, ListItem} from 'react-native-elements';
import {AuthContext} from '../../Context';
import  Icon  from 'react-native-vector-icons/Ionicons';
import DeviceStorage from '../../Storage/DeviceStorage'
var photoOptions = {
  //底部弹出框选项
  title: '请选择',
  cancelButtonTitle: '取消',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '选择相册',
  quality: 0.75,
  allowsEditing: true,
  noData: false,
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

export default function Me() {
  const [userInfo,setUserInfo]=React.useState({})
  const {signOut} = React.useContext(AuthContext);
  const list = [
    {
      name: 'Amy Farha',
      subtitle: 'Vice President',
    },
    {
      name: 'Chris Jackson',
      avatar_url:
        'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      subtitle: 'Vice Chairman',
    },
  ];
  useEffect(()=>{
   DeviceStorage.get('userInfo').then(
     res=>{
       console.log("userinfo",res)
      setUserInfo(res)
     }
   )
  })
  const keyExtractor = (item, index) => index.toString();
  const renderItem = ({item}) => (
    <ListItem
      title={item.name}
      subtitle={item.subtitle}
      leftAvatar={{
        source: item.avatar_url && {uri: item.avatar_url},
        title: item.name[0],
      }}
      bottomDivider
      chevron
    />
  );
  const [imgUrl, setImgUrl] = React.useState(null);
  const openMycamera = () => {
    ImagePicker.showImagePicker(photoOptions, (image) => {
      if (image.didCancel) {
        console.log('User cancelled image picker');
      } else if (image.error) {
        console.log('ImagePicker Error: ', image.error);
      } else if (image.customButton) {
        console.log('User tapped custom button: ', image.customButton);
      } else {
        let str = 'data:image/jpg;base64,' + image.data;
        let url = 'http://youziweb.cn:8888/rnupload/image';
        axios
          .post(url, {avatar: str})
          .then((result) => {
            let res = result.data;
            if (res.code === 0) {
              setImgUrl(`http://youziweb.cn:8888/${res.path}`);
            }
          })
          .catch((err) => {
            console.log('err', err);
          })
          .finally(() => {});
      }
    });
  };
  return (
    <View>
      <ListItem
        key={'aaa'}
        leftAvatar={{ source: { uri: 'http://youziweb.cn:8888/uploads/image/1589854508457.jpg' } }}
        title={userInfo.name}
        subtitle={userInfo.departmentId}
        bottomDivider
      />
      {/* <Button block onPress={openMycamera}>
        <Text>选择头像{name}</Text>
      </Button> */}
      {/* <Image source={{uri: imgUrl}} style={{height: 300, width: 300}} /> */}
      <FlatList
        keyExtractor={keyExtractor}
        data={list}
        renderItem={renderItem}
      />
      <Button block danger onPress={signOut}>
        <Text>退出登录</Text>
      </Button>
    </View>
  );
}
