import React, { useState } from "react";

import { BloodAccentSvg, Box, Btn } from "../../atoms";

const placements = {
  ring: "absolute inset-0",
  corner: "absolute top-0 right-0 w-[23px] h-[23px]",
  underline: "absolute bottom-0 left-[3px] right-[3px] h-[9px]",
};

// Decoration stays inside the touch target and inherits its disabled opacity.
// Press feedback is event-driven: no timers or continuous animation per button.
function BloodButtonImpl({
  bloodVariant = "corner",
  bloodVisible = true,
  disabled = false,
  children = undefined,
  onPressIn = undefined,
  onPressOut = undefined,
  ...props
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <Btn
      {...props}
      disabled={disabled}
      onPressIn={(event) => {
        setPressed(true);
        onPressIn?.(event);
      }}
      onPressOut={(event) => {
        setPressed(false);
        onPressOut?.(event);
      }}
    >
      {children}
      {bloodVisible && (
        <Box
          pointerEvents="none"
          accessible={false}
          accessibilityElementsHidden
          importantForAccessibility="no-hide-descendants"
          className={placements[bloodVariant] || placements.corner}
        >
          <BloodAccentSvg
            variant={bloodVariant}
            pressed={pressed && !disabled}
          />
        </Box>
      )}
    </Btn>
  );
}

export const BloodButton = React.memo(BloodButtonImpl);
