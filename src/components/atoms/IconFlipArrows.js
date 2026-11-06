import React from "react";
import Svg, { Path } from "react-native-svg";

function IconFlipArrowsImpl({ size = 22, color = "#ececf0" }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M7 7h11v3l4-4-4-4v3H5v6h2V7Zm10 10H6v-3l-4 4 4 4v-3h13v-6h-2v4Z"
        fill={color}
      />
    </Svg>
  );
}

export const IconFlipArrows = React.memo(IconFlipArrowsImpl);
