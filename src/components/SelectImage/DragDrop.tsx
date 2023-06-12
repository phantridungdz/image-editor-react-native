/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {Dimensions, Text, View} from 'react-native';

type ContextType = {
  x: number;
  y: number;
};

interface DragDrop {
  children: JSX.Element | JSX.Element[];
  onDrag?(x: number, y: number): void;
  onDrop?(x: number, y: number): void;
  currentIndex: number;
  index: number;
}

const DragDrop: React.FunctionComponent<DragDrop> = ({
  children,
  onDrag,
  onDrop,
  currentIndex,
  index,
}) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const windowWidth = Dimensions.get('window').width;
  const scale = useSharedValue(1);
  const [zIndex, setZIndex] = React.useState(2);
  const [isSelect, setIsSelect] = React.useState(true);

  const drag = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.x = x.value;
      context.y = y.value;
      if (currentIndex === index) {
        runOnJS(setIsSelect)(true);
        runOnJS(setZIndex)(3);
      } else {
        runOnJS(setIsSelect)(false);
        runOnJS(setZIndex)(1);
      }
    },
    onActive: (event, context) => {
      x.value = event.translationX + context.x;
      y.value = event.translationY + context.y;
      if (onDrag) {
        runOnJS(onDrag)(x.value, y.value);
      }
    },
    onEnd: _ => {
      onDrop && runOnJS(onDrop)(x.value, y.value);
    },
  });
  useEffect(() => {
    if (currentIndex === index) {
      runOnJS(setIsSelect)(true);
      runOnJS(setZIndex)(3);
    } else {
      runOnJS(setIsSelect)(false);
      runOnJS(setZIndex)(1);
    }
  }, [currentIndex, index]);

  const zoom = useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
    onActive: (event, _) => {
      scale.value = event.scale;
    },
    onEnd: (event, _) => {
      scale.value = event.scale;
    },
  });

  return (
    <PanGestureHandler onGestureEvent={drag}>
      <Animated.View
        style={[
          {zIndex: zIndex},
          useAnimatedStyle(() => {
            return {
              transform: [
                {translateX: x.value},
                {translateY: y.value},
                {scale: scale.value / 2},
              ],
            };
          }),
        ]}>
        <PinchGestureHandler onGestureEvent={zoom}>
          <Animated.View
            style={[
              {borderWidth: isSelect ? 9 : 0},
              {borderColor: isSelect ? 'blue' : ''},
              useAnimatedStyle(() => {
                return {
                  transform: [{scale: scale.value}],
                };
              }),
            ]}>
            {children}
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};

export default DragDrop;
