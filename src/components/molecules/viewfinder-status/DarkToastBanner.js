import React, { useMemo } from "react";
import { Animated } from "react-native";

import { GLOW_SHADOWS } from "../../../constants/shadows";
import { Paragraph } from "../../atoms";

function DarkToastBannerImpl({ toastMessage, toastAnim, elevated = false }) {
  const translateY = useMemo(
    () =>
      toastAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 0],
      }),
    [toastAnim],
  );

  if (!toastMessage) return null;

  return (
    <Animated.View
      pointerEvents="none"
      className={`absolute ${
        elevated ? "bottom-[118px]" : "bottom-[22px]"
      } self-center bg-[#0a0405]/90 border border-[#d91e1e] px-4 py-2 rounded-[3px]`}
      style={[
        GLOW_SHADOWS.toast,
        { opacity: toastAnim, transform: [{ translateY }] },
      ]}
    >
      <Paragraph className="text-[#ffe4e4] text-[11px] font-bold tracking-[1.4px]">
        {toastMessage}
      </Paragraph>
    </Animated.View>
  );
}

export const DarkToastBanner = React.memo(DarkToastBannerImpl);
