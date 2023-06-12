/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';
import ViewShot, {captureRef} from 'react-native-view-shot';
import {
  Image,
  Share,
  Dimensions,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import DragDrop from '../components/SelectImage/DragDrop';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import {Text} from 'react-native';

interface SelectImageScreen {
  navigation: any;
  route: any;
}

const SelectImageScreen: React.FC<SelectImageScreen> = ({
  navigation,
  route,
}) => {
  const viewShotRef = React.useRef<ViewShot>(null);
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const [images, setImages] = useState<string[]>([]);
  const [curentIndex, setCurrentIndex] = useState(0);
  const [_, setScrollHeight] = useState(windowHeight);
  const [widthShotView, setWidthShotView] = useState(windowWidth);
  const [heightShotView, setHeightShotView] = useState(windowHeight);

  const drag = (_x: number, _y: number) => {};
  const drop = (_x: number, _y: number) => {};
  const openImagePicker = () => {
    ImagePicker.openPicker({
      width: windowWidth,
      height: windowHeight,
      multiple: true,
    }).then(response => {
      const imagePaths = response.map(image => `file://${image.path}`);
      setImages(prevImages => prevImages.concat(imagePaths));
      setScrollHeight(imagePaths.length * windowHeight);
    });
  };
  const captureScrollView = async () => {
    const uri = await captureRef(viewShotRef, {
      format: 'jpg',
      quality: 0.8,
    });
    console.log('Captured image URI: ', uri);
    Share.share({title: 'image', url: uri});
  };
  const selectOrNot = (index: number) => {
    curentIndex === index ? setCurrentIndex(100) : setCurrentIndex(index);
  };
  const deleteImage = (index: number) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };
  const editImage = (index: number) => {
    ImagePicker.openCropper({
      freeStyleCropEnabled: true,
      path: images[index],
      mediaType: 'photo',
    }).then(image => {
      console.log(image);
      const updatedImages = [...images];
      updatedImages[index] = `file://${image.path}`;
      setImages(updatedImages);
    });
  };

  useEffect(() => {
    if (route.params?.images) {
      setImages(images.concat(route.params.images));
    }
  }, []);
  return (
    <View className="bg-blue-900 h-full">
      <View className="h-10 bg-black z-10" />
      <View className="flex flex-row z-10 bg-black border-b-4 border-white">
        <TouchableOpacity
          className="rounded-sm flex-1 py-[15px] pl-[15px]"
          onPress={() => openImagePicker()}>
          <Image
            className="w-[25px] h-[25px] p-5"
            source={require('../../assets/gallerry.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-sm flex-1 py-[15px]"
          onPress={() => captureScrollView()}>
          <Image
            className="w-[25px] h-[25px] p-5 self-center"
            source={require('../../assets/download.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          className="rounded-sm py-[15px] pr-[15px] flex-1"
          onPress={() => navigation.push('ScanScreen')}>
          <Image
            className="w-[25px] h-[25px] p-5 self-end"
            source={require('../../assets/takephoto.png')}
          />
        </TouchableOpacity>
      </View>
      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={0}
        zoomStep={0.5}
        initialZoom={0.71}
        bindToBorders={true}
        className="h-full items-center"
        // onZoomAfter={this.logOutZoomState}
      >
        <ViewShot
          ref={viewShotRef}
          options={{format: 'jpg', quality: 1.0}}
          style={{
            width: widthShotView * 2,
            height: heightShotView,
            backgroundColor: 'white',
            borderWidth: 4,
            borderBottomColor: 'black',
            margin: 'auto',
            // position: 'absolute',
            // right: widthShotView * 2,
            // left: widthShotView / 2 - widthShotView,
          }}>
          {images.length < 1 ? (
            <Text className="m-auto text-[45px]">
              Bill Area, please import or take a photo!
            </Text>
          ) : (
            <></>
          )}
          {images.map((image, index) => (
            <DragDrop
              key={index}
              index={index}
              onDrag={drag}
              onDrop={drop}
              currentIndex={curentIndex}>
              <TouchableOpacity
                key={index}
                style={{display: curentIndex === index ? 'flex' : 'none'}}
                className="h-[55px] w-[55px] absolute z-10 rounded-full bg-contain bg-white -top-[50px] -right-[25px]"
                onPressIn={() => deleteImage(index)}>
                <Text className="text-black m-auto text-[45px]">X</Text>
              </TouchableOpacity>
              <TouchableOpacity onPressIn={() => selectOrNot(index)}>
                <Image className="w-full h-full" source={{uri: image}} />
              </TouchableOpacity>
            </DragDrop>
          ))}
        </ViewShot>
      </ReactNativeZoomableView>
      <View className="h-[120px]">
        <ScrollView
          horizontal={true}
          style={{height: 10}}
          className=" bg-black z-10 border-t-4 border-white">
          <TouchableOpacity
            className="rounded-sm py-[15px] pl-[15px] "
            onPress={() => editImage(curentIndex)}>
            <Image
              className="w-[25px] h-[25px] p-5"
              source={require('../../assets/edit-image.png')}
            />
          </TouchableOpacity>
          <View className="ml-[40px]">
            <View className="flex flex-row items-center">
              <Text className="text-white w-[50px]">Width</Text>
              <Slider
                step={1}
                value={windowWidth}
                onValueChange={value => setWidthShotView(value)}
                style={{width: 250, height: 40}}
                minimumValue={0}
                maximumValue={1000}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="blue"
              />
            </View>
            <View className="flex flex-row items-center">
              <Text className="text-white w-[50px]">Height</Text>
              <Slider
                step={1}
                value={windowWidth}
                onValueChange={value => setHeightShotView(value)}
                style={{width: 250, height: 40}}
                minimumValue={0}
                maximumValue={2000}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="blue"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SelectImageScreen;
