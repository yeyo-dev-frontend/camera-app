import React from "react";
import { Platform } from "react-native";

import { Box, IconFlipArrows, IconGear } from "../../atoms";
import { TopActionButton } from "../../molecules/top-action/TopActionButton";

function TopControlBarImpl({
  onOpenSettings,
  onFlipCamera,
  isRecording,
  isBusy,
}) {
  return (
    <Box
      className={`z-10 flex-row items-center justify-between px-[22px] pb-[10px] ${
        Platform.OS === "android" ? "pt-2" : "pt-1"
      }`}
    >
      <TopActionButton
        accessibilityLabel="Ajustes de cámara"
        onPress={onOpenSettings}
        auraIntensity={0.55}
        dripHeight={22}
      >
        <IconGear size={22} color="#d8d8dc" />
      </TopActionButton>

      <TopActionButton
        accessibilityLabel="Cambiar cámara"
        onPress={onFlipCamera}
        disabled={isRecording || isBusy}
        auraIntensity={0.58}
        dripHeight={24}
      >
        <IconFlipArrows size={22} color="#ececf0" />
      </TopActionButton>
    </Box>
  );
}

export const TopControlBar = React.memo(TopControlBarImpl);
