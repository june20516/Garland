import React, { useState } from 'react';
import { View, Button, Image, StyleSheet, Alert } from 'react-native';
import ImagePicker, {
  ImagePickerResponse,
  OptionsCommon,
} from 'react-native-image-picker';
import { uploadImage } from '../../services/api/storage';

const ImageInput: React.FC = () => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleChooseImage = () => {
    const options: OptionsCommon = {
      mediaType: 'photo',
    };

    ImagePicker.launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets[0]?.uri) {
        setImageUri(response.assets[0]?.uri);
      }
    });
  };

  const handleUploadImage = async () => {
    if (imageUri) {
      try {
        const userId = 'yourUserId'; // 실제 사용자 ID로 교체
        const url = await uploadImage(imageUri, userId);
        console.log('Uploaded Image URL:', url);
        Alert.alert('Image Uploaded', `Image successfully uploaded: ${url}`);
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Upload Failed', 'Error occurred while uploading image');
      }
    }
  };

  return (
    <View style={styles.container}>
      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.previewImage} />
      )}
      <Button title="Choose Image" onPress={handleChooseImage} />
      <Button title="Upload Image" onPress={handleUploadImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

export default ImageInput;
