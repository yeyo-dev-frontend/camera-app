import React, { useCallback } from "react";

import { TEXT_GLOW_SHADOW } from "../../../constants/shadows";
import { Paragraph } from "../../atoms";

import { BloodButton } from "../blood-button/BloodButton";

function FilterChipItemImpl({ filter, selected, disabled, onSelectFilter }) {
  const handlePress = useCallback(() => {
    onSelectFilter(filter.id);
  }, [onSelectFilter, filter.id]);

  return (
    <BloodButton
      bloodVariant="underline"
      bloodVisible={selected}
      accessibilityRole="button"
      accessibilityLabel={`${filter.name}. ${filter.subtitle}`}
      accessibilityState={{ selected, disabled }}
      disabled={disabled}
      activeOpacity={0.7}
      onPress={handlePress}
      className={`min-h-[44px] justify-center px-1 pb-[5px] border-b-2 border-b-transparent ${disabled ? "opacity-40" : "opacity-100"}`}
    >
      <Paragraph
        style={TEXT_GLOW_SHADOW}
        className={`text-[10px] tracking-[1.4px] ${
          selected
            ? "text-[#fff3ec] font-black"
            : "text-[#d1c5c5] font-semibold"
        }`}
      >
        {filter.name}
      </Paragraph>
    </BloodButton>
  );
}

export const FilterChipItem = React.memo(FilterChipItemImpl);
