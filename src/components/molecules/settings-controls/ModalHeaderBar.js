import React from "react";

import { Box, Btn, Paragraph, Title } from "../../atoms";

function ModalHeaderBarImpl({ title, onClose, showDot = false }) {
  return (
    <Box className="flex-row items-center justify-between">
      <Box className="flex-row items-center">
        {showDot && (
          <Box className="w-2 h-2 rounded-[3px] bg-crimson-500 mr-2" />
        )}
        <Title className="text-[#ffe4e4] text-xs font-extrabold tracking-[1.8px]">
          {title}
        </Title>
      </Box>
      <Btn
        onPress={onClose}
        accessibilityLabel="Cerrar ventana"
        className="w-[30px] h-[30px] rounded-[3px] bg-[#ff1e1e]/15 border border-[#ff3232]/40 items-center justify-center"
      >
        <Paragraph className="text-[#ffdada] text-[13px] font-bold">
          ✕
        </Paragraph>
      </Btn>
    </Box>
  );
}

export const ModalHeaderBar = React.memo(ModalHeaderBarImpl);
