import React from 'react';
import Svg, { Circle, G, Polygon } from 'react-native-svg';

function ArcaneSigilSvgImpl({ size = 136 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 200 200" fill="none">
      <G opacity="0.13" stroke="#b8b0b0">
        <Circle cx="100" cy="100" r="92" strokeWidth="1.5" />
        <Circle cx="100" cy="100" r="82" strokeWidth="0.9" strokeDasharray="4 4" />
        <Circle cx="100" cy="100" r="64" strokeWidth="1" />
        <Polygon
          points="100,18 148,166 22,74 178,74 52,166"
          strokeWidth="1.2"
          fill="none"
        />
        <Polygon
          points="100,36 156,132 44,132"
          strokeWidth="0.9"
          fill="none"
        />
        <Circle cx="100" cy="100" r="18" strokeWidth="1" />
      </G>
    </Svg>
  );
}

export const ArcaneSigilSvg = React.memo(ArcaneSigilSvgImpl);
