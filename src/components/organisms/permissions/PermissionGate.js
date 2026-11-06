import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import React from "react";

import { GLOW_SHADOWS } from "../../../constants/shadows";
import { Box, Btn, IconGear, Paragraph, Title } from "../../atoms";
import { HorrorBackdrop } from "../backdrop/HorrorBackdrop";

function PermissionGateImpl({ onRequestPermissions }) {
  return (
    <Box className="flex-1 bg-obsidian-950">
      <StatusBar style="light" />
      <HorrorBackdrop showSigils={false} />

      <Box className="flex-1 items-center justify-center px-8">
        <Box
          style={GLOW_SHADOWS.control}
          className="w-16 h-16 rounded-full bg-[#120608]/90 border-[1.5px] border-crimson-600 items-center justify-center mb-[18px]"
        >
          <IconGear size={26} color="#ff3b3b" />
        </Box>

        <Title className="text-[#ffe6e6] text-base font-extrabold tracking-[2.2px] mb-[10px]">
          ACCESO REQUERIDO
        </Title>
        <Paragraph className="text-[#9c9ca6] text-sm text-center leading-[21px] mb-[26px]">
          Permite el acceso a la cámara para abrir el visor.
        </Paragraph>

        <Btn
          activeOpacity={0.8}
          onPress={onRequestPermissions}
          style={GLOW_SHADOWS.control}
          className="rounded-full overflow-hidden border-[1.4px] border-crimson-500"
        >
          <LinearGradient
            colors={["#5e0a0a", "#240404"]}
            className="py-[13px] px-[30px] rounded-full"
          >
            <Title className="text-bone-100 text-[13px] font-extrabold tracking-[1.8px]">
              HABILITAR CÁMARA
            </Title>
          </LinearGradient>
        </Btn>
      </Box>
    </Box>
  );
}

export const PermissionGate = React.memo(PermissionGateImpl);
