import React from "react";
import { Animated } from "react-native";

import { HORROR_ASSETS } from "../../../constants/theme";
import {
  BloodDripsSvg,
  Box,
  IconPhoto,
  IconVideo,
  Img,
  RedAuraSvg,
} from "../../atoms";

import { BloodButton } from "../blood-button/BloodButton";

function ShutterLensButtonImpl({
  isVideo,
  primary,
  disabled,
  isBusy,
  isRecording,
  recordPulseAnim,
  onPress,
}) {
  const label = isVideo
    ? isRecording
      ? "Detener vídeo"
      : "Grabar vídeo"
    : "Tomar foto";
  const wrapClass = primary
    ? "w-[88px] h-[88px] items-center justify-center"
    : "absolute left-1/2 ml-[70px] w-[56px] h-[56px] items-center justify-center";
  const btnClass = `${primary ? "w-[82px] h-[82px] border-2" : "w-[52px] h-[52px] border"} rounded-full bg-[#080102] items-center justify-center ${
    isVideo ? "border-[#e00018]" : "border-[#9b5d57]"
  } ${disabled ? "opacity-40" : "opacity-100"}`;
  const innerClass = isRecording
    ? primary
      ? "w-[26px] h-[26px] rounded-[2px] bg-[#ff1830]"
      : "w-[18px] h-[18px] rounded-[2px] bg-[#ff1830]"
    : primary
      ? "w-[34px] h-[34px] rounded-full bg-[#140003]/85"
      : "w-[25px] h-[25px] rounded-full bg-[#140003]/85";

  return (
    <Box className={wrapClass}>
      {primary && (
        <Box pointerEvents="none" className="absolute">
          <RedAuraSvg size={120} intensity={0.65} />
        </Box>
      )}
      <BloodButton
        bloodVariant="ring"
        accessibilityLabel={label}
        accessibilityState={{ disabled, busy: isBusy && primary }}
        disabled={disabled}
        onPress={onPress}
        className={btnClass}
      >
        <Box
          pointerEvents="none"
          className={`${primary ? "w-[72px] h-[72px]" : "w-[42px] h-[42px]"} rounded-full overflow-hidden items-center justify-center bg-[#100103]`}
        >
          <Img
            source={HORROR_ASSETS.shutterLens}
            accessible={false}
            className="absolute inset-0 w-full h-full"
          />
          {isVideo ? (
            <>
              <Box className="absolute inset-0 bg-[#78000c]/20" />
              <Animated.View
                className={`${innerClass} items-center justify-center`}
                style={{
                  transform: [{ scale: isRecording ? recordPulseAnim : 1 }],
                }}
              >
                {!isRecording && (
                  <IconVideo size={primary ? 23 : 17} color="#fff1ec" />
                )}
              </Animated.View>
            </>
          ) : (
            <IconPhoto size={primary ? 18 : 13} color="#111" />
          )}
        </Box>
      </BloodButton>
      {primary && (
        <Box pointerEvents="none" className="absolute top-[84px]">
          <BloodDripsSvg width={44} height={18} />
        </Box>
      )}
    </Box>
  );
}

export const ShutterLensButton = React.memo(ShutterLensButtonImpl);
