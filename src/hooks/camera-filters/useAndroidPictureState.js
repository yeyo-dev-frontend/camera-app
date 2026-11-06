import { Skia } from "@shopify/react-native-skia";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useSharedValue } from "react-native-reanimated";
import { createSynchronizable } from "react-native-worklets";

export function useAndroidPictureState() {
  const empty = useMemo(() => {
    const recorder = Skia.PictureRecorder();
    recorder.beginRecording();
    const initial = recorder.finishRecordingAsPicture();
    recorder.dispose();
    return initial;
  }, []);
  const picture = useSharedValue(empty);
  const pending = useMemo(() => createSynchronizable(false), []);
  const mounted = useRef(true);
  const retiredRef = useRef(null);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
      const current = picture.get();
      picture.set(empty);
      if (retiredRef.current && retiredRef.current !== empty) {
        retiredRef.current.dispose();
        retiredRef.current = null;
      }
      if (current && current !== empty) current.dispose();
    };
  }, [picture, empty]);

  const present = useCallback(
    (next) => {
      try {
        if (mounted.current) {
          const prev = picture.get();
          picture.set(next);
          if (retiredRef.current && retiredRef.current !== empty)
            retiredRef.current.dispose();
          retiredRef.current = prev !== empty ? prev : null;
        } else {
          next.dispose();
        }
      } finally {
        pending.setBlocking(false);
      }
    },
    [picture, pending, empty],
  );

  return { picture, pending, present };
}
