import React, {useRef} from 'react';
import {Image, ScrollView, Dimensions, Button} from 'react-native';
import ViewShot from 'react-native-view-shot';
import CameraRoll from '@react-native-community/cameraroll';

const ViewImageScreen = ({navigation, route}) => {
  const images = route.params?.images || [];
  const windowHeight = Dimensions.get('window').height;
  const windowWidth = Dimensions.get('window').width;
  const viewShotRef = useRef(null);

  const captureScrollView = async () => {
    const uri = await viewShotRef.current.capture();
    console.log('Captured image URI: ', uri);
    CameraRoll.saveToCameraRoll(uri)
      .then(alert('Done', 'Photo added to camera roll!'))
      .catch(err => console.log('err:', err));
  };

  return (
    <ViewShot ref={viewShotRef} options={{format: 'jpg', quality: 1.0}}>
      <ScrollView className="h-full">
        {images.map((image, index) => (
          <Image
            key={index}
            style={{height: windowHeight, width: windowWidth}}
            source={{uri: image}}
          />
        ))}
        <Button
          title="Capture ScrollView"
          className="h-40"
          onPress={captureScrollView}
        />
      </ScrollView>
    </ViewShot>
  );
};

export default ViewImageScreen;
