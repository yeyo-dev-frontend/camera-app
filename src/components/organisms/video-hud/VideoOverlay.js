import React from "react";
import Svg, {
  Defs,
  Pattern,
  RadialGradient,
  Rect,
  Stop,
} from "react-native-svg";

import { Box } from "../../atoms";

function VideoOverlayImpl({ effect }) {
  const night = effect === "night";
  return (
    <Box pointerEvents="none" className="absolute inset-0">
      <Svg width="100%" height="100%">
        <Defs>
          <Pattern
            id="vhsLines"
            width="4"
            height="5"
            patternUnits="userSpaceOnUse"
          >
            <Rect width="4" height="1" fill="#000" opacity="0.22" />
          </Pattern>
          <RadialGradient id="vhsEdge" cx="50%" cy="45%" rx="70%" ry="70%">
            <Stop
              offset="0.35"
              stopColor={night ? "#001900" : "#210006"}
              stopOpacity="0"
            />
            <Stop
              offset="1"
              stopColor={night ? "#001900" : "#52000c"}
              stopOpacity="0.85"
            />
          </RadialGradient>
        </Defs>
        <Rect
          width="100%"
          height="100%"
          fill={night ? "#35ff62" : "#b58b57"}
          opacity={night ? 0.2 : 0.04}
        />
        <Rect width="100%" height="100%" fill="url(#vhsLines)" />
        <Rect width="100%" height="100%" fill="url(#vhsEdge)" />
      </Svg>
    </Box>
  );
}

export const VideoOverlay = React.memo(VideoOverlayImpl);
