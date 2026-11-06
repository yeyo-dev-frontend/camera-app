import { AlphaType, ColorType, Skia } from "@shopify/react-native-skia";
import { useCallback, useMemo } from "react";
import { useFrameOutput } from "react-native-vision-camera";
import { createSynchronizable, scheduleOnRN } from "react-native-worklets";
import { useAndroidPictureState } from "./useAndroidPictureState";

const FRAME_TARGET_RESOLUTION = { width: 640, height: 480 };

export function useAndroidFrameProcessor(renderFrame) {
  const sizeSync = useMemo(
    () => createSynchronizable({ width: 0, height: 0 }),
    [],
  );
  const { picture, pending, present } = useAndroidPictureState();

  const handleFrame = useCallback(
    (frame) => {
      "worklet";
      const layout = sizeSync.getBlocking();
      if (!layout.width || !layout.height || pending.getBlocking())
        return frame.dispose();
      renderFrame(frame, (draw) => {
        const plane = frame.getPlanes()[0];
        const data = Skia.Data.fromBytes(
          new Uint8Array(plane.getPixelBuffer()),
        );
        const recorder = Skia.PictureRecorder(),
          boundsRect = Skia.XYWHRect(0, 0, layout.width, layout.height);
        let image;
        try {
          image = Skia.Image.MakeImage(
            {
              width: frame.width,
              height: frame.height,
              colorType: ColorType.RGBA_8888,
              alphaType: AlphaType.Opaque,
            },
            data,
            plane.bytesPerRow,
          );
          if (!image) throw new Error("No se pudo leer el fotograma RGBA.");
          const canvas = recorder.beginRecording(boundsRect);
          const sideways =
            frame.orientation === "left" || frame.orientation === "right";
          const w = sideways ? frame.height : frame.width,
            h = sideways ? frame.width : frame.height;
          const scale = Math.max(layout.width / w, layout.height / h);
          canvas.translate(
            (layout.width - w * scale) / 2,
            (layout.height - h * scale) / 2,
          );
          canvas.scale(scale, scale);
          draw({ canvas, frameTexture: image });
          const next = recorder.finishRecordingAsPicture();
          pending.setBlocking(true);
          scheduleOnRN(present, next);
        } finally {
          [boundsRect, image, recorder, data].forEach((r) => r?.dispose());
        }
      });
    },
    [sizeSync, pending, renderFrame, present],
  );

  const frameOutput = useFrameOutput({
    pixelFormat: "rgb",
    targetResolution: FRAME_TARGET_RESOLUTION,
    allowDeferredStart: false,
    dropFramesWhileBusy: true,
    onFrame: handleFrame,
  });
  const handleLayout = useCallback(
    ({ nativeEvent: { layout } }) => {
      const cur = sizeSync.getBlocking();
      if (cur.width !== layout.width || cur.height !== layout.height)
        sizeSync.setBlocking({ width: layout.width, height: layout.height });
    },
    [sizeSync],
  );

  return { picture, frameOutput, handleLayout };
}
