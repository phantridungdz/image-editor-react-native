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
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';

type ContextType = {
  x: number;
  y: number;
};

interface ResizePoint {
  children: JSX.Element | JSX.Element[];
  onDrag?(x: number, y: number, index: number): void;
  onDrop?(x: number, y: number): void;
}

const DragDrop: React.FunctionComponent<ResizePoint> = ({
  children,
  onDrag,
  onDrop,
}) => {
  const x = useSharedValue(0);
  const y = useSharedValue(0);
  const scale = useSharedValue(1);

  const drag = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    ContextType
  >({
    onStart: (event, context) => {
      context.x = x.value;
    },
    onActive: (event, context) => {
      x.value = event.translationX + context.y;
      if (onDrag) {
        runOnJS(onDrag)(x.value, y.value, 0);
      }
    },
    onEnd: _ => {
      onDrop && runOnJS(onDrop)(x.value, y.value);
    },
  });

  return (
    <PanGestureHandler onGestureEvent={drag}>
      <Animated.View
        className="absolute h-full w-full"
        style={[
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
        {children}
      </Animated.View>
    </PanGestureHandler>
  );
};

export default DragDrop;
