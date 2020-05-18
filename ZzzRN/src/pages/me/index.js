import React, {Component} from 'react';
import {View, Button, Text, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {get} from '../../http/fetch';
function BaseCenterView({children}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {children}
    </View>
  );
}
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
class Me extends Component {
  constructor(props) {
    super(props);
    this.state = {_imageObj: null, imgURL: null};
  }
  openMycamera() {
    ImagePicker.showImagePicker(photoOptions, (image) => {
      if (image.didCancel) {
        console.log('User cancelled image picker');
      } else if (image.error) {
        console.log('ImagePicker Error: ', image.error);
      } else if (image.customButton) {
        console.log('User tapped custom button: ', image.customButton);
      } else {
        console.log('image', image);
        this.setState({
          _imageObj: image,
          imgURL: image.uri,
        });
        let str = 'data:image/jpg;base64,' + image.data;
        // let url = 'http://youziweb.cn:8888/rnupload/image';
        let url = 'http://192.168.0.110:8888/rnupload/image';
        fetch(url, {
          method: "POST",
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `avatar=${str}`
        }).then(function(response) {
          console.log(response)
        });
         
      }
    });
  }
  confirmUpload() {
    if (!this.state.imgURL) {
      alert('照片不能为空');
      return false;
    }
  }
  render() {
    return (
      <BaseCenterView>
        <Text>我的</Text>
        <Button title="上传照片" onPress={() => this.openMycamera()}></Button>
        <Image
          source={{uri: this.state.imgURL}}
          style={{height: 300, width: 300}}
        />
        <Button
          title="确认上传"
          success
          onPress={() => this.confirmUpload()}></Button>
      </BaseCenterView>
    );
  }
}

export default Me;
