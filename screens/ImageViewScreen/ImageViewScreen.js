import React, {useEffect, useState} from 'react';
import {View, Text, Modal,TouchableOpacity} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import Entypo from 'react-native-vector-icons/Entypo';
function ImageViewScreen({route, navigation}) {
  //console.log(route.params)

 
  return (
    <Modal visible={true} transparent={true}>
      <ImageViewer
        imageUrls={route.params}
        enableSwipeDown={true}
        saveToLocalByLongPress={false}
        onCancel={() => navigation.goBack()}
        renderHeader={() => (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 8,
              marginRight: 8,
            }}
            onPress={()=> navigation.goBack()}
            >
            <Entypo name="cross" size={26} color="white"></Entypo>
          </TouchableOpacity>
        )}
      />
    </Modal>
  );
}

export default ImageViewScreen;
