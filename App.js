import {transform} from '@babel/core';
import React, {useRef} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

const ballRadius = 20;

export default () => {
  const dimensions = useWindowDimensions();

  const ballCoordinatesAnim = useRef(
    new Animated.ValueXY({
      x: dimensions.width / 2,
      y: dimensions.height / 2,
    }),
  ).current;

  return (
    <View
      style={styles.container}
      onStartShouldSetResponder={() => true}
      onResponderMove={event =>
        ballCoordinatesAnim.setValue({
          x: event.nativeEvent.pageX,
          y: event.nativeEvent.pageY,
        })
      }
      onResponderRelease={event =>
        Animated.sequence([
          Animated.timing(ballCoordinatesAnim, {
            toValue: {
              x: event.nativeEvent.pageX,
              y: dimensions.height - ballRadius,
            },
            duration: 2500,
            easing: Easing.bounce,
            useNativeDriver: true,
          }),
          Animated.timing(ballCoordinatesAnim, {
            toValue: {
              x: dimensions.width / 2,
              y: dimensions.height / 2,
            },
            easing: Easing.inOut(Easing.circle),
            useNativeDriver: true,
          }),
        ]).start()
      }>
      <Animated.View
        style={{
          width: ballRadius * 2,
          height: ballRadius * 2,
          borderRadius: ballRadius,
          backgroundColor: 'red',
          position: 'absolute',
          transform: [
            {
              translateX: Animated.subtract(ballCoordinatesAnim.x, ballRadius),
            },
            {
              translateY: Animated.subtract(ballCoordinatesAnim.y, ballRadius),
            },
          ],
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
