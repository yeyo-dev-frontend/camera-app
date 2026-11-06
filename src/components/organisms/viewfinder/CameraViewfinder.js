import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AppState } from "react-native";
import { CAMERA_MODES } from "../../../constants/theme";
import { Box } from "../../atoms";
import { DarkToastBanner } from "../../molecules/viewfinder-status/DarkToastBanner";
import { LastPhotoThumb } from "../../molecules/viewfinder-status/LastPhotoThumb";
import { ShutterBlinkOverlay } from "../../molecules/viewfinder-status/ShutterBlinkOverlay";
import { FilterSelectorBar } from "../filter-bar/FilterSelectorBar";
import { VideoHud } from "../video-hud/VideoHud";
import { VideoOverlay } from "../video-hud/VideoOverlay";
import { FilterCamera } from "./FilterCamera";
import { VideoCamera } from "./VideoCamera";
import { ViewfinderHud } from "./ViewfinderHud";

function CameraViewfinderImpl({
  cameraRef,
  facing,
  mode,
  flash,
  enableTorch,
  mirrorFront,
  activeFilter,
  activeFilterId,
  filterIntensity,
  onChangeFilterIntensity,
  showFilterBar,
  onSelectFilter,
  showParanormalOverlay,
  showGuides,
  lastPhoto,
  onOpenPhotoPreview,
  isRecording,
  isBusy,
  videoMuted,
  onToggleVideoMute,
  videoEffect,
  onSelectVideoEffect,
  shutterFlashAnim,
  toastMessage,
  toastAnim,
  onReadyChange,
  previewModalVisible,
}) {
  const [appActive, setAppActive] = useState(
    AppState.currentState === "active",
  );
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  useEffect(() => {
    const sub = AppState.addEventListener("change", (s) =>
      setAppActive(s === "active"),
    );
    return () => sub.remove();
  }, []);
  const handleLayout = useCallback(({ nativeEvent: { layout } }) => {
    setViewport((p) =>
      p.width === layout.width && p.height === layout.height
        ? p
        : { width: layout.width, height: layout.height },
    );
  }, []);
  const photoMode = mode === CAMERA_MODES.PICTURE,
    active = appActive && !previewModalVisible;
  const w = Math.min(viewport.width, (viewport.height * 3) / 4);
  const frameStyle = useMemo(
    () =>
      photoMode
        ? { width: w || "100%", aspectRatio: 3 / 4 }
        : { width: "100%", height: viewport.height || "100%" },
    [photoMode, w, viewport.height],
  );
  return (
    <Box
      className="flex-1 mx-[14px] z-[5] items-center justify-center"
      onLayout={handleLayout}
    >
      <Box
        className="rounded-[3px] overflow-hidden bg-obsidian-900 border border-[#74000e]/70"
        style={frameStyle}
      >
        {photoMode ? (
          <FilterCamera
            key={facing}
            cameraRef={cameraRef}
            facing={facing}
            flash={flash}
            enableTorch={enableTorch}
            mirrorFront={mirrorFront}
            activeFilter={activeFilter}
            showParanormalOverlay={showParanormalOverlay}
            isActive={active}
            onReadyChange={onReadyChange}
          />
        ) : (
          active && (
            <VideoCamera
              key={facing}
              cameraRef={cameraRef}
              facing={facing}
              flash={flash}
              muted={videoMuted}
              enableTorch={
                facing === "back" && (enableTorch || videoEffect === "night")
              }
              mirrorFront={mirrorFront}
              onReadyChange={onReadyChange}
            />
          )
        )}
        {!photoMode && <VideoOverlay effect={videoEffect} />}
        <ViewfinderHud showGuides={showGuides} />
        {photoMode && (
          <LastPhotoThumb
            lastPhoto={lastPhoto}
            isRecording={isRecording}
            onOpenPhotoPreview={onOpenPhotoPreview}
          />
        )}
        {!photoMode && (
          <VideoHud
            isRecording={isRecording}
            isBusy={isBusy}
            muted={videoMuted}
            onToggleMute={onToggleVideoMute}
            effect={videoEffect}
            onSelectEffect={onSelectVideoEffect}
            active={active}
            facing={facing}
          />
        )}
        {showFilterBar && photoMode && (
          <FilterSelectorBar
            activeFilterId={activeFilterId}
            onSelectFilter={onSelectFilter}
            disabled={isBusy || isRecording}
            intensity={filterIntensity}
            onChangeIntensity={onChangeFilterIntensity}
          />
        )}
        <ShutterBlinkOverlay shutterFlashAnim={shutterFlashAnim} />
        <DarkToastBanner
          toastMessage={toastMessage}
          toastAnim={toastAnim}
          elevated={showFilterBar && photoMode}
        />
      </Box>
    </Box>
  );
}
export const CameraViewfinder = React.memo(CameraViewfinderImpl);
