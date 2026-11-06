import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { Modal } from "react-native";

import { GLOW_SHADOWS } from "../../../constants/shadows";
import { Box, PressArea } from "../../atoms";
import { FlashSelectorRow } from "../../molecules/settings-controls/FlashSelectorRow";
import { ModalHeaderBar } from "../../molecules/settings-controls/ModalHeaderBar";
import { SettingToggleItem } from "../../molecules/settings-controls/SettingToggleItem";

function DarkSettingsModalImpl({
  visible,
  onClose,
  flash,
  setFlash,
  enableTorch,
  setEnableTorch,
  showFilterBar,
  setShowFilterBar,
  showParanormalOverlay,
  setShowParanormalOverlay,
  showGuides,
  setShowGuides,
  mirrorFront,
  setMirrorFront,
}) {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <PressArea
        className="flex-1 bg-black/80 items-center justify-center p-[22px]"
        onPress={onClose}
      >
        <PressArea
          style={GLOW_SHADOWS.sheet}
          className="w-full max-w-[360px] rounded-[4px] border border-[#dc1c1c]/65 overflow-hidden"
          onPress={() => {}}
        >
          <LinearGradient
            colors={["#130709", "#08070a", "#050506"]}
            className="p-5"
          >
            <ModalHeaderBar title="AJUSTES DE CÁMARA" onClose={onClose} />
            <Box className="h-[1px] bg-[#ff2d2d]/20 my-[14px]" />
            <FlashSelectorRow flash={flash} setFlash={setFlash} />
            <SettingToggleItem
              title="Linterna (Torch)"
              subtitle="Luz continua en oscuridad"
              value={enableTorch}
              onValueChange={setEnableTorch}
            />
            <SettingToggleItem
              title="Selector de Filtros"
              subtitle="Carrusel de filtros Dark en el visor"
              value={showFilterBar}
              onValueChange={setShowFilterBar}
            />
            <SettingToggleItem
              title="Presencia Paranormal"
              subtitle="Huella espectral en visor y capturas"
              value={showParanormalOverlay}
              onValueChange={setShowParanormalOverlay}
            />
            <SettingToggleItem
              title="Mira y Esquinas"
              subtitle="Retícula central (+) y marcos"
              value={showGuides}
              onValueChange={setShowGuides}
            />
            <SettingToggleItem
              title="Espejo Frontal"
              subtitle="Invertir selfies horizontalmente"
              value={mirrorFront}
              onValueChange={setMirrorFront}
            />
          </LinearGradient>
        </PressArea>
      </PressArea>
    </Modal>
  );
}

export const DarkSettingsModal = React.memo(DarkSettingsModalImpl);
