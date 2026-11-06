import { useCallback, useEffect, useState } from "react";
import { Animated } from "react-native";

export function useRecordingPulse(isRecording) {
  const [shutterFlashAnim] = useState(() => new Animated.Value(0));
  const [recordPulseAnim] = useState(() => new Animated.Value(1));

  useEffect(() => {
    let loopAnim = null;

    if (isRecording) {
      loopAnim = Animated.loop(
        Animated.sequence([
          Animated.timing(recordPulseAnim, {
            toValue: 0.78,
            duration: 550,
            useNativeDriver: true,
          }),
          Animated.timing(recordPulseAnim, {
            toValue: 1,
            duration: 550,
            useNativeDriver: true,
          }),
        ]),
      );
      loopAnim.start();
    } else {
      recordPulseAnim.setValue(1);
    }

    return () => {
      if (loopAnim) loopAnim.stop();
    };
  }, [isRecording, recordPulseAnim]);

  const triggerShutterBlink = useCallback(() => {
    shutterFlashAnim.setValue(0.85);
    Animated.timing(shutterFlashAnim, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, [shutterFlashAnim]);

  return { shutterFlashAnim, recordPulseAnim, triggerShutterBlink };
}
