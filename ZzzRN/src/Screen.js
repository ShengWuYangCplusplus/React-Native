import * as React from 'react';
import {View, Button, Text} from 'react-native';
import {AuthContext} from './Context';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-picker';
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
function openMycamera() {
  ImagePicker.showImagePicker(photoOptions, (response) => {
    console.log('response' + JSON.stringify(response));
    if (response.didCancel) {
      return;
    }
  });
};
function BaseCenterView({children}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {children}
    </View>
  );
}

export function HomeScreen({navigation}) {
  return (
    <BaseCenterView>
      <Text>首页</Text>
    </BaseCenterView>
  );
}
export function DetailsScreen() {
  return (
    <BaseCenterView>
      <Text>详情</Text>
    </BaseCenterView>
  );
}
export function MineScreen() {
  return (
    <BaseCenterView>
      <Text>我的</Text>
      <Button title="选择照片" onPress={openMycamera()}></Button>
    </BaseCenterView>
  );
}
export function SettingScreen() {
  const {signOut} = React.useContext(AuthContext);
  return (
    <BaseCenterView>
      <Text>设置</Text>
      <Button
        title="退出登录"
        onPress={() => {
          signOut();
        }}
      />
    </BaseCenterView>
  );
}
export function SignInScreen() {
  const {signIn} = React.useContext(AuthContext);
  return (
    <BaseCenterView>
      <Text>登录页面</Text>
      <Button
        title="登录"
        onPress={() => {
          signIn();
        }}
      />
    </BaseCenterView>
  );
}
export function SplashScreen() {
  return (
    <BaseCenterView>
      <Text>loading...</Text>
    </BaseCenterView>
  );
}
