import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { Text, View, Button, ImagePickerResult } from 'react-native';
import ImagePicker from 'react-native-image-picker';
export default function imagePicker() {
  const options = {
    title: 'Select Avatar',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  /**
   * The first arg is the options object for customization (it can also be null or omitted for default options),
   * The second arg is the callback which sends object: response (more info in the API Reference)
   */
  ImagePicker.showImagePicker(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
      const source = { uri: response.uri };

      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };

      this.setState({
        avatarSource: source,
      });
    }
  });
  return (
    <View>
      <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
    </View>
  );
}
