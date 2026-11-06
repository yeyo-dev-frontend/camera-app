import { Canvas, Picture } from "@shopify/react-native-skia";
import React, { useImperativeHandle, useMemo } from "react";
import { StyleSheet } from "react-native";
import { useCamera } from "react-native-vision-camera";

import { useAndroidFrameProcessor } from "../../../hooks/camera-filters/useAndroidFrameProcessor";
import { Box } from "../../atoms";

function AndroidFrameCameraImpl({
  ref,
  style,
  device,
  isActive,
  outputs,
  constraints,
  orientationSource,
  onStarted,
  onStopped,
  onError,
  onFrame: renderFrame,
}) {
  const { picture, frameOutput, handleLayout } =
    useAndroidFrameProcessor(renderFrame);
  const allOutputs = useMemo(
    () => [...outputs, frameOutput],
    [outputs, frameOutput],
  );

  const controller = useCamera({
    device,
    isActive,
    outputs: allOutputs,
    mirrorMode: device === "front" ? "on" : "auto",
    constraints,
    orientationSource,
    onStarted,
    onStopped,
    onError,
  });

  useImperativeHandle(ref, () => ({ controller }), [controller]);

  return (
    <Box style={style} onLayout={handleLayout}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Picture picture={picture} />
      </Canvas>
    </Box>
  );
}

export const AndroidFrameCamera = React.memo(AndroidFrameCameraImpl);
