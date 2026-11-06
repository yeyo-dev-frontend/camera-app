import React from "react";
import { Platform } from "react-native";

import { Box } from "../../atoms";
import { ModeSelector } from "./ModeSelector";
import { ShutterControls } from "./ShutterControls";

function BottomCameraControlsImpl({
  mode,
  onSelectMode,
  isBusy,
  cameraReady,
  isRecording,
  onTakePicture,
  onToggleVideo,
  recordPulseAnim,
}) {
  return (
    <Box
      className={`z-10 items-center pt-[10px] ${Platform.OS === "android" ? "pb-[14px]" : "pb-[6px]"}`}
    >
      <ModeSelector
        mode={mode}
        onSelectMode={onSelectMode}
        isBusy={isBusy}
        isRecording={isRecording}
      />
      <ShutterControls
        mode={mode}
        isBusy={isBusy || !cameraReady}
        onTakePicture={onTakePicture}
        onToggleVideo={onToggleVideo}
        isRecording={isRecording}
        recordPulseAnim={recordPulseAnim}
      />
    </Box>
  );
}

export const BottomCameraControls = React.memo(BottomCameraControlsImpl);
