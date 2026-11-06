import React from "react";

import { MONO_FONT_STYLE } from "../../../constants/shadows";
import { Paragraph, PressArea } from "../../atoms";

function VideoHudButtonImpl({
  label,
  selected = false,
  disabled = false,
  accessibilityLabel = undefined,
  onPress,
}) {
  return (
    <PressArea
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      className={`min-h-[44px] justify-center items-center px-2 border rounded-[3px] shrink ${
        selected
          ? "border-[#c0efae] bg-[#28442bdd]"
          : "border-[#73816a] bg-[#080c08cc]"
      } ${disabled ? "opacity-55" : "opacity-100"}`}
    >
      <Paragraph
        style={MONO_FONT_STYLE}
        className="text-[#dce6cc] text-[9px] leading-[15px]"
      >
        {label}
      </Paragraph>
    </PressArea>
  );
}

export const VideoHudButton = React.memo(VideoHudButtonImpl);
