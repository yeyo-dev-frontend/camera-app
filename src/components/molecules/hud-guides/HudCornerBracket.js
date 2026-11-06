import React from "react";
import Svg, { Path } from "react-native-svg";

import { Box } from "../../atoms";

const ARM = 24;
const STROKE_COLOR = "rgba(255, 232, 232, 0.85)";

const PATHS = {
  tl: `M 1 ${ARM} L 1 1 L ${ARM} 1`,
  tr: `M 2 1 L ${ARM + 1} 1 L ${ARM + 1} ${ARM}`,
  bl: `M 1 2 L 1 ${ARM + 1} L ${ARM} ${ARM + 1}`,
  br: `M 2 ${ARM + 1} L ${ARM + 1} ${ARM + 1} L ${ARM + 1} 2`,
};

function HudCornerBracketImpl({ position, className }) {
  return (
    <Box className={`absolute ${className}`}>
      <Svg width={ARM + 2} height={ARM + 2}>
        <Path
          d={PATHS[position]}
          stroke={STROKE_COLOR}
          strokeWidth="1.5"
          fill="none"
        />
      </Svg>
    </Box>
  );
}

export const HudCornerBracket = React.memo(HudCornerBracketImpl);
