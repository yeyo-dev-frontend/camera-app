import React, { useEffect, useState } from "react";
import { MONO_FONT_STYLE } from "../../../constants/shadows";
import {
  computeSyntheticEvpLevel,
  formatTapeTimecode,
  formatTapeTimestamp,
} from "../../../utils/formatters";
import { Box, Paragraph } from "../../atoms";

const SEGMENTS = Array.from({ length: 12 }, (_, i) => i);

function TapeReadoutImpl({ isRecording, muted, active }) {
  const [now, setNow] = useState(() => Date.now());
  const [started] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return;
    const timer = setInterval(
      () => setNow(Date.now()),
      isRecording ? 100 : 1000,
    );
    return () => clearInterval(timer);
  }, [active, isRecording]);

  const elapsed = isRecording ? Math.max(0, now - started) : 0;
  const level = computeSyntheticEvpLevel(now, isRecording, muted);
  const blinkClass = Math.floor(now / 1000) % 2 ? "opacity-40" : "opacity-100";

  return (
    <Box pointerEvents="none" className="absolute inset-0 m-[22px]">
      <Box className="flex-row justify-between items-center gap-[6px]">
        <Paragraph
          style={MONO_FONT_STYLE}
          className={`text-[13px] leading-[21px] ${isRecording ? "text-[#ff5364]" : "text-[#e8eed8]"}`}
        >
          {isRecording ? "● REC" : "STBY"} ▣ [SP]
        </Paragraph>
        <Paragraph
          style={MONO_FONT_STYLE}
          className={`text-[#e8eed8] text-[13px] leading-[21px] ${blinkClass}`}
        >
          [▮▮ ] SIM
        </Paragraph>
      </Box>
      <Paragraph
        style={MONO_FONT_STYLE}
        className="text-[#e8eed8] text-[13px] leading-[21px]"
      >
        TC {formatTapeTimecode(elapsed)}{" "}
        <Paragraph
          style={MONO_FONT_STYLE}
          className="text-[#dce6cc] text-[9px] leading-[15px]"
        >
          CS
        </Paragraph>
      </Paragraph>
      <Box className="self-end mt-3">
        <Paragraph
          style={MONO_FONT_STYLE}
          className="text-[#dce6cc] text-[9px] leading-[15px]"
        >
          EVP · SIM {muted ? "· MUTE" : "· dB"}
        </Paragraph>
        <Box className="flex-row gap-[3px] my-1">
          {SEGMENTS.map((i) => (
            <Box
              key={i}
              className={`w-[5px] h-[13px] ${i < level ? (i > 8 ? "bg-[#ff465d]" : "bg-[#b9f8af]") : "bg-[#ffffff25]"}`}
            />
          ))}
        </Box>
        <Paragraph
          style={MONO_FONT_STYLE}
          className="text-[#dce6cc] text-[9px] leading-[15px]"
        >
          −60 0
        </Paragraph>
      </Box>
      <Paragraph
        style={MONO_FONT_STYLE}
        className="absolute bottom-[86px] left-0 text-[#e8eed8] text-[13px] leading-[21px]"
      >
        {formatTapeTimestamp(now)}
      </Paragraph>
    </Box>
  );
}
export const TapeReadout = React.memo(TapeReadoutImpl);
