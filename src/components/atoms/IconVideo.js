import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

function IconVideoImpl({ size = 16, color = "#6e7178" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2.5" y="6" width="13" height="12" rx="2.5" fill={color} />
      <Circle cx="6.5" cy="10.5" r="1.2" fill="#0d0d10" />
      <Circle cx="10.5" cy="10.5" r="1.2" fill="#0d0d10" />
      <Path d="M16.5 10.2 21.5 7v10l-5-3.2v-3.6Z" fill={color} />
    </Svg>
  );
}

export const IconVideo = React.memo(IconVideoImpl);
