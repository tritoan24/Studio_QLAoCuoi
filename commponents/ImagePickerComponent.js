import React from 'react';
import { View, Button, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

class ImagePickerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePath: null
    };
  }

  launchCameraHandler = () => {
    launchCamera({ mediaType: 'photo' }, response => {
      if (!response.didCancel) {
        const { uri } = response;
        this.uploadImage(uri);
      }
    });
  };

  launchImageLibraryHandler = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (!response.didCancel) {
        const { uri } = response;
        this.uploadImage(uri);
      }
    });
  };

  uploadImage = async uri => {
    try {
      const formData = new FormData();
      formData.append('image', {
        uri,
        type: 'image/jpeg',
        name: 'image.jpg'
      });

      const response = await fetch('YOUR_SERVER_ENDPOINT/uploadImage', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      // Lấy đường dẫn đến ảnh đã tải lên từ server và cập nhật state
      this.setState({ imagePath: data.imagePath });
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };

  render() {
    const { imagePath } = this.state;

    return (
      <View>
        <Button title="Chụp ảnh" onPress={this.launchCameraHandler} />
        <Button title="Chọn ảnh từ thư viện" onPress={this.launchImageLibraryHandler} />
        {imagePath && <Image source={{ uri: imagePath }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
}

export default ImagePickerComponent;
