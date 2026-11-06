import React from "react";

import { CAMERA_MODES } from "../../../constants/theme";
import { Box, Paragraph } from "../../atoms";
import { ShutterLensButton } from "../../molecules/shutter-button/ShutterLensButton";

function ShutterControlsImpl({
  mode,
  onTakePicture,
  onToggleVideo,
  isRecording,
  isBusy,
  recordPulseAnim,
}) {
  const videoIsPrimary = mode === CAMERA_MODES.VIDEO || isRecording;

  return (
    <Box className="w-full h-[112px] mt-2 items-center justify-center">
      {[CAMERA_MODES.PICTURE, CAMERA_MODES.VIDEO].map((buttonMode) => {
        const isVideo = buttonMode === CAMERA_MODES.VIDEO;
        return (
          <ShutterLensButton
            key={buttonMode}
            isVideo={isVideo}
            primary={isVideo === videoIsPrimary}
            disabled={isBusy || (!isVideo && isRecording)}
            isBusy={isBusy}
            isRecording={isRecording}
            recordPulseAnim={recordPulseAnim}
            onPress={isVideo ? onToggleVideo : onTakePicture}
          />
        );
      })}
      {isBusy && (
        <Paragraph className="absolute bottom-0 text-[#ecd8d3] text-[9px] tracking-[2px]">
          PROCESANDO
        </Paragraph>
      )}
    </Box>
  );
}

export const ShutterControls = React.memo(ShutterControlsImpl);
