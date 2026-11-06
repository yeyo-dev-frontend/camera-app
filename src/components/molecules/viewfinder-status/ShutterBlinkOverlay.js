import React from "react";
import { Animated } from "react-native";

function ShutterBlinkOverlayImpl({ shutterFlashAnim }) {
  return (
    <Animated.View
      pointerEvents="none"
      className="absolute inset-0 bg-[#1a0202]"
      style={{ opacity: shutterFlashAnim }}
    />
  );
}

export const ShutterBlinkOverlay = React.memo(ShutterBlinkOverlayImpl);
