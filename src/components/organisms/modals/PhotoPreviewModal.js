import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Modal } from "react-native";

import { GLOW_SHADOWS } from "../../../constants/shadows";
import { Box, Img, Paragraph, PressArea } from "../../atoms";
import { ModalHeaderBar } from "../../molecules/settings-controls/ModalHeaderBar";

function PhotoPreviewModalImpl({ photoUri, filterName, visible, onClose }) {
  if (!visible || !photoUri) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <PressArea
        className="flex-1 bg-black/90 items-center justify-center p-5"
        onPress={onClose}
      >
        <PressArea
          style={GLOW_SHADOWS.modal}
          className="w-full max-w-[370px] rounded-[4px] border border-crimson-500/75 bg-obsidian-900 overflow-hidden"
          onPress={() => {}}
        >
          <LinearGradient
            colors={["#140608", "#070709"]}
            className="px-4 py-3 border-b border-white/10"
          >
            <ModalHeaderBar
              title={`CAPTURA · ${filterName}`}
              onClose={onClose}
              showDot
            />
          </LinearGradient>

          <Box className="w-full aspect-[3/4] bg-black">
            <Img
              source={{ uri: photoUri }}
              className="w-full h-full"
              resizeMode="contain"
            />
          </Box>

          <Box className="px-4 py-3 items-center bg-obsidian-950">
            <Paragraph className="text-[#8e9099] text-[11px] tracking-[1.2px]">
              GUARDADA EN GALERÍA
            </Paragraph>
          </Box>
        </PressArea>
      </PressArea>
    </Modal>
  );
}

export const PhotoPreviewModal = React.memo(PhotoPreviewModalImpl);
