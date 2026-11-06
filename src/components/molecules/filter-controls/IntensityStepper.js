import React, { useCallback } from "react";

import { TEXT_GLOW_SHADOW } from "../../../constants/shadows";
import { Box, Btn, Paragraph } from "../../atoms";

function IntensityStepperImpl({ intensity, disabled, onChangeIntensity }) {
  const decDisabled = disabled || intensity <= 0;
  const incDisabled = disabled || intensity >= 1;

  const handleDecrease = useCallback(() => {
    onChangeIntensity(Math.max(0, Math.round((intensity - 0.05) * 100) / 100));
  }, [intensity, onChangeIntensity]);

  const handleIncrease = useCallback(() => {
    onChangeIntensity(Math.min(1, Math.round((intensity + 0.05) * 100) / 100));
  }, [intensity, onChangeIntensity]);

  return (
    <Box className="flex-row items-center">
      <Btn
        accessibilityLabel="Reducir intensidad"
        accessibilityState={{ disabled: decDisabled }}
        disabled={decDisabled}
        onPress={handleDecrease}
        className={`min-w-[44px] min-h-[44px] items-center justify-center ${decDisabled ? "opacity-35" : "opacity-100"}`}
      >
        <Paragraph
          style={TEXT_GLOW_SHADOW}
          className="text-[#f5e9e3] text-[22px] tracking-[1.4px]"
        >
          −
        </Paragraph>
      </Btn>
      <Paragraph
        accessibilityLiveRegion="polite"
        style={TEXT_GLOW_SHADOW}
        className="text-[#f5e9e3] text-[9px] tracking-[1.4px]"
      >
        INTENSIDAD {Math.round(intensity * 100)}%
      </Paragraph>
      <Btn
        accessibilityLabel="Aumentar intensidad"
        accessibilityState={{ disabled: incDisabled }}
        disabled={incDisabled}
        onPress={handleIncrease}
        className={`min-w-[44px] min-h-[44px] items-center justify-center ${incDisabled ? "opacity-35" : "opacity-100"}`}
      >
        <Paragraph
          style={TEXT_GLOW_SHADOW}
          className="text-[#f5e9e3] text-[22px] tracking-[1.4px]"
        >
          +
        </Paragraph>
      </Btn>
    </Box>
  );
}

export const IntensityStepper = React.memo(IntensityStepperImpl);
