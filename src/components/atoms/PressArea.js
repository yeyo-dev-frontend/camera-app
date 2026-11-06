import React from "react";
import { Pressable } from "react-native";

function PressAreaImpl({
  className = "",
  style = undefined,
  onPress = undefined,
  accessibilityRole = undefined,
  children = undefined,
  ...props
}) {
  return (
    <Pressable
      className={className}
      style={style}
      onPress={onPress}
      accessibilityRole={accessibilityRole}
      {...props}
    >
      {children}
    </Pressable>
  );
}

export const PressArea = React.memo(PressAreaImpl);
