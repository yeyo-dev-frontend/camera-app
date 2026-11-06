import React from "react";
import Svg, { Circle, Path, Rect } from "react-native-svg";

function IconPhotoImpl({ size = 16, color = "#ffe0e0" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="2.5"
        stroke={color}
        strokeWidth="2.2"
      />
      <Circle cx="8.5" cy="9.5" r="1.7" fill={color} />
      <Path d="M4.5 18l5-5.5 3.5 3.8 2.5-2.8 4 4.5H4.5Z" fill={color} />
    </Svg>
  );
}

export const IconPhoto = React.memo(IconPhotoImpl);
