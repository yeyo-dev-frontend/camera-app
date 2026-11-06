import React from "react";

import { CAMERA_MODES } from "../../../constants/theme";
import { Box } from "../../atoms";
import { ModeTabButton } from "../../molecules/shutter-button/ModeTabButton";

function ModeSelectorImpl({ mode, onSelectMode, isRecording, isBusy }) {
  const disabled = isRecording || isBusy;

  return (
    <Box className="flex-row items-center gap-8">
      <ModeTabButton
        item={CAMERA_MODES.PICTURE}
        selected={mode === CAMERA_MODES.PICTURE}
        disabled={disabled}
        onSelectMode={onSelectMode}
      />
      <ModeTabButton
        item={CAMERA_MODES.VIDEO}
        selected={mode === CAMERA_MODES.VIDEO}
        disabled={disabled}
        onSelectMode={onSelectMode}
      />
    </Box>
  );
}

export const ModeSelector = React.memo(ModeSelectorImpl);
