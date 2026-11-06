import React from "react";
import Svg, { Circle, Line } from "react-native-svg";

function BloodDripsSvgImpl({ width = 44, height = 24 }) {
  return (
    <Svg width={width} height={height} viewBox="0 0 48 26" fill="none">
      <Line
        x1="14"
        y1="0"
        x2="14"
        y2="16"
        stroke="#7a0909"
        strokeWidth="1.2"
        opacity="0.55"
      />
      <Circle cx="14" cy="17" r="1.3" fill="#8f0b0b" opacity="0.6" />
      <Line
        x1="25"
        y1="0"
        x2="25"
        y2="23"
        stroke="#990d0d"
        strokeWidth="1.4"
        opacity="0.65"
      />
      <Circle cx="25" cy="24" r="1.5" fill="#b31212" opacity="0.7" />
      <Line
        x1="34"
        y1="0"
        x2="34"
        y2="11"
        stroke="#6e0707"
        strokeWidth="1"
        opacity="0.45"
      />
    </Svg>
  );
}

export const BloodDripsSvg = React.memo(BloodDripsSvgImpl);
