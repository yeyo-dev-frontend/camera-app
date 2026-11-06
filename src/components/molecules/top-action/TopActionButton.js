import React from "react";

import { GLOW_SHADOWS } from "../../../constants/shadows";
import { BloodDripsSvg, Box, RedAuraSvg } from "../../atoms";

import { BloodButton } from "../blood-button/BloodButton";

function TopActionButtonImpl({
  onPress,
  disabled = false,
  accessibilityLabel,
  auraIntensity = 0.55,
  dripHeight = 22,
  children,
}) {
  return (
    <Box className="w-[52px] h-[52px] items-center justify-center">
      <Box
        className="absolute items-center justify-center"
        pointerEvents="none"
      >
        <RedAuraSvg size={78} intensity={auraIntensity} />
      </Box>
      <BloodButton
        onPress={onPress}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
        style={GLOW_SHADOWS.control}
        className={`w-12 h-12 rounded-[3px] bg-[#080102]/95 border-[1.5px] border-crimson-600 items-center justify-center ${
          disabled ? "opacity-45" : "opacity-100"
        }`}
      >
        {children}
      </BloodButton>
      <Box className="absolute top-[46px] items-center" pointerEvents="none">
        <BloodDripsSvg width={44} height={dripHeight} />
      </Box>
    </Box>
  );
}

export const TopActionButton = React.memo(TopActionButtonImpl);
