import React from "react";
import Svg, { Circle, Defs, RadialGradient, Stop } from "react-native-svg";

function RedAuraSvgImpl({ size = 120, intensity = 0.55 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 120 120">
      <Defs>
        <RadialGradient id="redAura" cx="50%" cy="50%" rx="50%" ry="50%">
          <Stop offset="0%" stopColor="#ff1e1e" stopOpacity={intensity} />
          <Stop
            offset="55%"
            stopColor="#990808"
            stopOpacity={intensity * 0.55}
          />
          <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
        </RadialGradient>
      </Defs>
      <Circle cx="60" cy="60" r="58" fill="url(#redAura)" />
    </Svg>
  );
}

export const RedAuraSvg = React.memo(RedAuraSvgImpl);
