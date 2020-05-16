import React, {Component} from 'react';
import {View, Button, Text, Image} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {get} from '../../http/fetch'
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
    ImagePicker.showImagePicker(photoOptions, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setState({
          _imageObj: response,
          imgURL: response.uri,
        });
      }
    });
  }
  confirmUpload() {
    if (!this.state.imgURL) {
      alert('照片不能为空');
      return false;
    }
    let params = this.state._imageObj;
    this._uploadImage('/image', params);
  }
  _uploadImage(url, params) {
    let file = {
      uri: params.uri,
      type: 'multipart/form-data',
      name: 'image.jpg',
    };
    let formdata = new FormData();
    formdata.append('avatar', file);
    console.log(formdata)
    get('http://youziweb.cn:8888/api/alarm', {index:0,size:10}).then((res) => {
      console.log(res)
    });
    fetch('http://youziweb.cn:8888/upload/image',{
        method:'POST',
        body:formdata,
        headers : {
            'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;',
            'Content-Type' : 'text/plain;charset=UTF-8',
            'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.89 Safari/537.36',
            'Host' : 'youziweb.cn',
        }
    }).then(
        res=>{
            console.log('res',res)
        }
    ).catch(err=>{
        console.log('err',err)
    })
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
