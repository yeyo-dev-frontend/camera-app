import React from "react";

import { FLASH_OPTIONS } from "../../../constants/theme";
import { Box, Btn, Paragraph } from "../../atoms";

function FlashSelectorRowImpl({ flash, setFlash }) {
  return (
    <Box className="mb-4">
      <Paragraph className="text-[#9e9ea8] text-[11px] font-bold tracking-[1.4px] mb-2">
        MODO DE FLASH
      </Paragraph>
      <Box className="flex-row bg-obsidian-800 rounded-[3px] p-[3px] border border-white/[0.08]">
        {FLASH_OPTIONS.map((opt) => {
          const active = flash === opt.key;
          return (
            <Btn
              key={opt.key}
              onPress={() => setFlash(opt.key)}
              accessibilityLabel={`Flash ${opt.label}`}
              accessibilityState={{ selected: active }}
              className={`flex-1 py-[7px] rounded-[3px] items-center ${
                active
                  ? "bg-[#8c0e0e]/50 border border-crimson-500"
                  : "border border-transparent"
              }`}
            >
              <Paragraph
                className={`text-xs font-bold tracking-[1.2px] ${
                  active ? "text-bone-100" : "text-[#6e717a]"
                }`}
              >
                {opt.label}
              </Paragraph>
            </Btn>
          );
        })}
      </Box>
    </Box>
  );
}

export const FlashSelectorRow = React.memo(FlashSelectorRowImpl);
