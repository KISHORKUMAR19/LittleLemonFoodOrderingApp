import { useState, useRef, useCallback } from 'react';
import { Animated } from 'react-native';

const useFeedback = () => {
  const [feedbackMessage, setFeedbackMessage] = useState<string>('');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showFeedback = useCallback((message: string) => {
    setFeedbackMessage(message);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        delay: 1500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim]);

  return {
    feedbackMessage,
    fadeAnim,
    showFeedback
  };
};

export default useFeedback;