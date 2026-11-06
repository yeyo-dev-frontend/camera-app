import React from "react";
import Svg, { Circle, G, Line } from "react-native-svg";

function GothicCrossSvgImpl({ width = 64, height = 100, opacity = 0.22 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 80 130" fill="none">
      <G opacity={opacity} stroke="#8f0d0d" strokeWidth="2">
        <Line x1="40" y1="6" x2="40" y2="124" />
        <Line x1="12" y1="38" x2="68" y2="38" />
        <Line x1="34" y1="14" x2="46" y2="14" />
        <Line x1="20" y1="32" x2="20" y2="44" />
        <Line x1="60" y1="32" x2="60" y2="44" />
        <Circle cx="40" cy="38" r="9" strokeWidth="1.2" />
      </G>
    </Svg>
  );
}

export const GothicCrossSvg = React.memo(GothicCrossSvgImpl);
