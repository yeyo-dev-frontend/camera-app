import React from "react";

import { GLOW_SHADOWS } from "../../../constants/shadows";
import { Box, Btn, Img, Paragraph } from "../../atoms";

function LastPhotoThumbImpl({ lastPhoto, isRecording, onOpenPhotoPreview }) {
  if (!lastPhoto?.uri || isRecording) return null;

  return (
    <Btn
      activeOpacity={0.85}
      onPress={onOpenPhotoPreview}
      accessibilityLabel="Ver última foto capturada"
      style={GLOW_SHADOWS.thumb}
      className="absolute top-[46px] left-[16px] w-[44px] h-[56px] rounded-[2px] overflow-hidden bg-obsidian-950 border border-crimson-500/75"
    >
      <Img
        source={{ uri: lastPhoto.uri }}
        className="w-full h-full"
        resizeMode="cover"
      />
      <Box className="absolute bottom-0 left-0 right-0 bg-black/70 py-[1px] items-center">
        <Paragraph
          numberOfLines={1}
          className="text-bone-100 text-[7px] font-extrabold tracking-[0.6px]"
        >
          {lastPhoto.filterName}
        </Paragraph>
      </Box>
    </Btn>
  );
}

export const LastPhotoThumb = React.memo(LastPhotoThumbImpl);
