import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Text,
  Button,
} from 'react-native';
import {RNCamera} from 'react-native-camera';

const ScanScreen = ({navigation}) => {
  const cameraRef = useRef(null);
  const [images, setImages] = useState([]);
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      setImages(images.concat(data.uri));
    }
  };

  const goToImageView = () => {
    navigation.navigate('ViewImageScreen', {
      images: images,
    });
  };

  return (
    <View className="bg-blue-200 w-full h-full ">
      {images.length > 0 && (
        <View
          style={{bottom: windowHeight - 100}}
          className="bg-red-300 h-full flex flex-col">
          <Image
            source={{uri: images[images.length - 1]}}
            className="absolute border-white w-full h-full"
          />
        </View>
      )}
      <View
        style={{
          bottom: images.length > 0 ? windowHeight - 100 : 0,
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
              style={{
                bottom: images.length > 0 ? 160 : 70,
              }}
              className="absolute bg-white border-black border-4 h-20 w-20 self-center rounded-full"
            />
            {images.length > 1 && (
              <TouchableOpacity
                onPress={goToImageView}
                className="absolute rounded-full self-center">
                <Text style={{fontSize: 30}} className=" text-white">
                  Compile Now !
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </RNCamera>
      </View>
    </View>
  );
};

export default ScanScreen;
