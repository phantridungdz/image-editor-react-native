import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';

interface ScanScreen {
  navigation: any;
}

const ScanScreen: React.FC<ScanScreen> = ({navigation}) => {
  const cameraRef = useRef<any>();
  const [images, setImages] = useState([]);
  const windowHeight = Dimensions.get('window').height;

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      setImages(images.concat(data.uri));
    }
  };
  useEffect(() => {
    if (images.length !== 0) {
      console.log(images);
      navigation.navigate('SelectImageScreen', {
        images: images,
      });
    }
  }, [images, navigation]);

  return (
    <View className="bg-blue-200 w-full h-full ">
      <View
        style={{
          height: windowHeight,
        }}
        className="bg-green-300">
        <RNCamera
          ref={cameraRef}
          className="flex flex-1"
          type={RNCamera.Constants.Type.back}
          captureAudio={true}>
          <View className="h-full w-full">
            <TouchableOpacity
              onPress={takePicture}
              className="absolute bg-white border-black border-4 h-20 w-20 self-center rounded-full bottom-[45px]"
            />
          </View>
        </RNCamera>
      </View>
    </View>
  );
};

export default ScanScreen;
