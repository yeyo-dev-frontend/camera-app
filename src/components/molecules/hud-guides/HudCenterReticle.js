import React from "react";
import Svg, { Line } from "react-native-svg";

import { Box } from "../../atoms";

function HudCenterReticleImpl() {
  return (
    <Box className="absolute inset-0 items-center justify-center">
      <Svg width={30} height={30} viewBox="0 0 30 30">
        <Line
          x1="15"
          y1="2"
          x2="15"
          y2="28"
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="1.2"
        />
        <Line
          x1="2"
          y1="15"
          x2="28"
          y2="15"
          stroke="rgba(255, 255, 255, 0.8)"
          strokeWidth="1.2"
        />
      </Svg>
    </Box>
  );
}

export const HudCenterReticle = React.memo(HudCenterReticleImpl);
