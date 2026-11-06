import React from "react";

import { MONO_FONT_STYLE } from "../../../constants/shadows";
import { Box, Paragraph } from "../../atoms";
import { TapeReadout } from "../../molecules/video-controls/TapeReadout";
import { VideoHudButton } from "../../molecules/video-controls/VideoHudButton";

const EFFECT_OPTIONS = [
  ["vhs", "VHS"],
  ["night", "VISIÓN NOCTURNA"],
];

function VideoHudImpl({
  isRecording,
  isBusy,
  muted,
  onToggleMute,
  effect,
  onSelectEffect,
  active,
  facing,
}) {
  const disabled = isRecording || isBusy;
  const statusHint =
    effect === "night"
      ? `NIGHTSHOT · VERDE EN VÍDEO${facing === "front" ? " · SIN LUZ" : ""}`
      : "VHS · EFECTO SOLO EN VISOR";

  return (
    <Box pointerEvents="box-none" className="absolute inset-0">
      <TapeReadout
        key={isRecording ? "recording" : "standby"}
        isRecording={isRecording}
        muted={muted}
        active={active}
      />
      <Box className="absolute bottom-[18px] left-[18px] right-[18px] gap-[6px]">
        <Paragraph
          style={MONO_FONT_STYLE}
          className="text-[#dce6cc] text-[9px] leading-[15px]"
        >
          {statusHint}
        </Paragraph>
        <Box className="flex-row justify-between items-center gap-[6px]">
          {EFFECT_OPTIONS.map(([value, label]) => (
            <VideoHudButton
              key={value}
              label={label}
              selected={effect === value}
              disabled={disabled}
              onPress={() => onSelectEffect(value)}
            />
          ))}
          <VideoHudButton
            label={muted ? "MIC OFF" : "MIC ON"}
            accessibilityLabel={
              muted ? "Activar micrófono" : "Silenciar micrófono"
            }
            disabled={disabled}
            onPress={onToggleMute}
          />
        </Box>
      </Box>
    </Box>
  );
}

export const VideoHud = React.memo(VideoHudImpl);
