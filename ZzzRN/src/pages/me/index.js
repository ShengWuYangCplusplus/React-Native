import React, { Component } from 'react';
import { View, Button, Text, Image } from 'react-native';
// import ImagePicker from 'react-native-image-picker';
import CropPicker from 'react-native-image-crop-picker';
import { get } from '../../http/fetch'
function BaseCenterView({ children }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
    this.state = { _imageObj: null, imgURL: null };
  }
  openMycamera() {
    CropPicker.openPicker({
      multiple: false
    })
    .then(image => {
      // 这里将会获取到选中图片的数组
      // uploading file here ...
      console.log('images 数组：',image)
      // this.setState({imgURL:image.path,_imageObj:image})
      let form = new FormData();
      let path = image.path;
      let filename = path.substr(path.lastIndexOf('/') + 1);
      let file = { uri: path, type: 'multipart/form-data', name: filename };
      form.append('avatar', file);
      // 调用fetch发送请求
      fetch('http://youziweb.cn:8888/upload/image', {
        method: 'POST',
        body: form,
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })
        .then((response) => {
          // success goes here
          console.log('success',response)
          
        }).catch((error) => {
          // error goes here
          console.log("error",error)
        })
    })
    .catch((error)=>{
      console.log(error)
    });
  }
  confirmUpload() {
    if (!this.state.imgURL) {
      alert('照片不能为空');
      return false;
    }
    // this._uploadImage();
  }
  _uploadImage() {
    // image 为单个图片对象
   
  }
  render() {
    return (
      <BaseCenterView>
        <Text>我的</Text>
        <Button title="上传照片" onPress={() => this.openMycamera()}></Button>
        <Image
          source={{ uri: this.state.imgURL }}
          style={{ height: 300, width: 300 }}
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
