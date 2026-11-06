import React from "react";

import { Box, Paragraph, ToggleSwitch } from "../../atoms";

function SettingToggleItemImpl({ title, subtitle, value, onValueChange }) {
  return (
    <Box className="flex-row items-center justify-between py-[10px] border-t border-white/[0.06]">
      <Box className="flex-1 pr-3">
        <Paragraph className="text-bone-300 text-[13px] font-semibold">
          {title}
        </Paragraph>
        <Paragraph className="text-[#73737d] text-[11px] mt-[2px]">
          {subtitle}
        </Paragraph>
      </Box>
      <ToggleSwitch value={value} onValueChange={onValueChange} />
    </Box>
  );
}

export const SettingToggleItem = React.memo(SettingToggleItemImpl);
