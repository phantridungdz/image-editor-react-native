/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Dimensions, Text} from 'react-native';
import {RNCamera} from 'react-native-camera';

interface ScanScreen {
  navigation: any;
  route: any;
}

const ScanScreen: React.FC<ScanScreen> = ({navigation}) => {
  const cameraRef = useRef<any>();
  const [images, setImages] = useState<
    {path: string; width: number; height: number}[]
  >([]);
  const windowHeight = Dimensions.get('window').height;

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = {quality: 0.5, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      const imagePaths = {
        path: data.uri,
        width: data.width / 5,
        height: data.height / 5,
      };
      setImages(prevImages => prevImages.concat(imagePaths));
    }
  };
  // useEffect(() => {
  //   if (images.length !== 0) {
  //     console.log(images);
  //     navigation.navigate('SelectImageScreen', {
  //       images: images,
  //     });
  //   }
  // }, [images, navigation]);

  const onDone = () => {
    navigation.navigate('SelectImageScreen', {
      images: images,
    });
  };
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
          {images.length > 1 && (
            <TouchableOpacity
              onPress={() => onDone()}
              className="absolute top-10 left-20">
              <Text style={{fontSize: 30}} className=" text-white">
                Compile Now !
              </Text>
            </TouchableOpacity>
          )}
        </RNCamera>
      </View>
    </View>
  );
};

export default ScanScreen;
