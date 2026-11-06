import React from "react";

import { Box, Paragraph, PressArea } from "../../atoms";

function CameraStatusMessageImpl({ message, onRetry = undefined }) {
  return (
    <Box className="absolute inset-0 bg-[#080404] justify-center p-6">
      <Paragraph className="text-[#fff3ec] text-xs text-center leading-[22px]">
        {message}
      </Paragraph>
      {onRetry && (
        <PressArea
          accessibilityRole="button"
          onPress={onRetry}
          className="self-center mt-3 p-[14px] rounded-[8px] bg-[#581322]"
        >
          <Paragraph className="text-[#fff3ec] text-xs text-center font-semibold">
            Reintentar
          </Paragraph>
        </PressArea>
      )}
    </Box>
  );
}

export const CameraStatusMessage = React.memo(CameraStatusMessageImpl);
