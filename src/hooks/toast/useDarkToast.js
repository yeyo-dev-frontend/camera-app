import { useCallback, useEffect, useRef, useState } from "react";
import { Animated } from "react-native";

import { TOAST_DURATION_MS } from "../../constants/theme";

export function useDarkToast() {
  const [toastMessage, setToastMessage] = useState(null);
  const [toastAnim] = useState(() => new Animated.Value(0));
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const showToast = useCallback(
    (message) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setToastMessage(message);
      Animated.timing(toastAnim, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }).start();

      timeoutRef.current = setTimeout(() => {
        Animated.timing(toastAnim, {
          toValue: 0,
          duration: 280,
          useNativeDriver: true,
        }).start(() => setToastMessage(null));
      }, TOAST_DURATION_MS);
    },
    [toastAnim],
  );

  return { toastMessage, toastAnim, showToast };
}
