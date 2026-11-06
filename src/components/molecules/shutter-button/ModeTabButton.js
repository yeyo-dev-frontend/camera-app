import React, { useCallback } from "react";

import { CAMERA_MODES } from "../../../constants/theme";
import { IconPhoto, IconVideo, Paragraph } from "../../atoms";

import { BloodButton } from "../blood-button/BloodButton";

function ModeTabButtonImpl({ item, selected, disabled, onSelectMode }) {
  const isPicture = item === CAMERA_MODES.PICTURE;
  const Icon = isPicture ? IconPhoto : IconVideo;

  const handlePress = useCallback(() => {
    onSelectMode(item);
  }, [onSelectMode, item]);

  return (
    <BloodButton
      bloodVariant="underline"
      bloodVisible={selected}
      accessibilityRole="tab"
      accessibilityLabel={isPicture ? "Modo foto" : "Modo vídeo"}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      onPress={handlePress}
      activeOpacity={0.7}
      className={`min-h-[44px] min-w-[88px] flex-row items-center justify-center gap-2 pb-[5px] border-b-2 border-b-transparent ${disabled ? "opacity-50" : "opacity-100"}`}
    >
      <Icon size={16} color={selected ? "#ed1930" : "#8c7e80"} />
      <Paragraph
        className={`text-xs font-extrabold tracking-[2px] ${
          selected ? "text-[#fff0eb]" : "text-[#8c7e80]"
        }`}
      >
        {isPicture ? "FOTO" : "VÍDEO"}
      </Paragraph>
    </BloodButton>
  );
}

export const ModeTabButton = React.memo(ModeTabButtonImpl);
