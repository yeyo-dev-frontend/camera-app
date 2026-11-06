import React from "react";
import { Switch } from "react-native";

const TRACK_COLORS = { false: "#232329", true: "#7a0e0e" };

function ToggleSwitchImpl({ value, onValueChange, ...props }) {
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={TRACK_COLORS}
      thumbColor={value ? "#ff2e2e" : "#8e8e96"}
      {...props}
    />
  );
}

export const ToggleSwitch = React.memo(ToggleSwitchImpl);
