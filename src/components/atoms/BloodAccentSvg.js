import React from "react";
import Svg, { Circle, Path } from "react-native-svg";

import { BLOOD_COLORS as colors } from "../../constants/bloodDecoration";

function BloodAccentSvgImpl({ variant = "corner", pressed = false }) {
  const shine = pressed ? colors.pressed : colors.highlight;
  if (variant === "ring") {
    return (
      <Svg width="100%" height="100%" viewBox="0 0 100 100" fill="none">
        <Circle cx="50" cy="50" r="47" stroke={colors.shadow} strokeWidth="4" />
        <Path
          d="M9 27 A46 46 0 0 1 86 20 M95 44 A46 46 0 0 1 21 86"
          stroke={colors.body}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <Path
          d="M24 89 Q29 88 32 93 L32 96 Q32 100 29 100 Q26 100 26 96 Z M64 92 Q69 88 72 91 L71 97 Q68 102 66 97 Z"
          fill={colors.wine}
        />
        <Path
          d="M14 25 A43 43 0 0 1 38 9 M92 58 Q88 76 76 84 M28 93 L28 96"
          stroke={shine}
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.8"
        />
      </Svg>
    );
  }
  if (variant === "underline") {
    return (
      <Svg
        width="100%"
        height="100%"
        viewBox="0 0 100 12"
        preserveAspectRatio="none"
        fill="none"
      >
        <Path
          d="M2 2 Q23 0 43 2 T76 2 L98 1 L94 5 Q74 4 65 6 L64 9 Q61 13 59 9 L59 6 Q33 5 16 6 L4 5 Z"
          fill={colors.wine}
        />
        <Path
          d="M9 2 Q34 1 50 3 T89 2"
          stroke={colors.body}
          strokeWidth="2"
          strokeLinecap="round"
        />
        <Path
          d="M15 2 L35 2 M60 7 L60 9"
          stroke={shine}
          strokeWidth="0.7"
          strokeLinecap="round"
        />
      </Svg>
    );
  }
  return (
    <Svg width="100%" height="100%" viewBox="0 0 28 28" fill="none">
      <Path
        d="M4 2 Q11 0 15 3 Q20 1 26 2 L26 13 Q24 18 22 14 L22 9 Q19 6 17 10 L17 20 Q15 26 13 20 L13 10 Q12 6 8 7 L3 6 Z"
        fill={colors.wine}
      />
      <Path
        d="M8 3 Q13 2 16 5 Q22 2 25 4 L25 10 M15 12 L15 18"
        stroke={shine}
        strokeWidth="0.9"
        strokeLinecap="round"
        opacity="0.8"
      />
      <Circle cx="21" cy="23" r="1.4" fill={colors.body} />
    </Svg>
  );
}

export const BloodAccentSvg = React.memo(BloodAccentSvgImpl);
