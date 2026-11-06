import React from "react";
import { TouchableOpacity } from "react-native";

function BtnImpl({
  className = "",
  style = undefined,
  onPress = undefined,
  disabled = false,
  activeOpacity = 0.75,
  accessibilityRole = "button",
  accessibilityLabel = undefined,
  accessibilityState = undefined,
  children = undefined,
  ...props
}) {
  return (
    <TouchableOpacity
      className={className}
      style={style}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      accessibilityState={accessibilityState ?? { disabled }}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
}

export const Btn = React.memo(BtnImpl);
