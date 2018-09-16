import React, { Component } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Reactotron from 'reactotron-react-native';

export const DoubleTappableButton = ({
  children,
  onPress = null,
  onDoubleTap = null,
  doublePressDelay = 500,
  ...restProps
}) => {
  let timeout;
  let tappedCount = 0;

  const handlePress = () => {
    if (timeout) {
      tappedCount = tappedCount + 1;
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      if (tappedCount >= 2) {
        if (typeof onDoubleTap === 'function') onDoubleTap();
      } else {
        if (typeof onPress === 'function') onPress();
      }
      tappedCount = 0;
    }, doublePressDelay);
  };

  return (
    <TouchableWithoutFeedback {...restProps} onPress={handlePress}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export default DoubleTappableButton;
