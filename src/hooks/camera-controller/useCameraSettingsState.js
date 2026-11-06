import { useCallback, useEffect, useMemo, useState } from "react";
import { CAMERA_MODES } from "../../constants/theme";
import { hapticsService } from "../../services/haptics/hapticsService";
import { deleteTempFileQuietly } from "../../services/skia-photo/skiaDataLoader";

export function useCameraSettingsState(runtimeRef, onCameraReadyChange) {
  const [facing, setFacing] = useState("back");
  const [mode, setMode] = useState(CAMERA_MODES.PICTURE);
  const [videoMuted, setVideoMuted] = useState(false);
  const [videoEffect, setVideoEffect] = useState("vhs");
  const [flash, setFlash] = useState("off");
  const [enableTorch, setEnableTorch] = useState(false);
  const [showFilterBar, setShowFilterBar] = useState(true);
  const [showParanormalOverlay, setShowParanormalOverlay] = useState(true);
  const [showGuides, setShowGuides] = useState(true);
  const [mirrorFront, setMirrorFront] = useState(true);
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [lastPhoto, setLastPhoto] = useState(null);
  const [previewModalVisible, setPreviewModalVisible] = useState(false);

  useEffect(
    () => () => deleteTempFileQuietly(runtimeRef.current.lastPhoto?.uri),
    [runtimeRef],
  );

  const toggleVideoMute = useCallback(() => {
    if (!runtimeRef.current.isRecording && !runtimeRef.current.isBusy)
      setVideoMuted((v) => !v);
  }, [runtimeRef]);
  const selectVideoEffect = useCallback(
    (value) => {
      if (
        !runtimeRef.current.isRecording &&
        !runtimeRef.current.isBusy &&
        (value === "vhs" || value === "night")
      )
        setVideoEffect(value);
    },
    [runtimeRef],
  );
  const selectMode = useCallback(
    (nextMode) => {
      const { isRecording, isBusy, mode: cur } = runtimeRef.current;
      if (isRecording || isBusy || cur === nextMode) return;
      hapticsService.selection();
      onCameraReadyChange(false);
      setMode(nextMode);
    },
    [runtimeRef, onCameraReadyChange],
  );
  const toggleCameraFacing = useCallback(() => {
    if (runtimeRef.current.isRecording || runtimeRef.current.isBusy) return;
    hapticsService.selection();
    onCameraReadyChange(false);
    setFacing((cur) => (cur === "back" ? "front" : "back"));
  }, [runtimeRef, onCameraReadyChange]);
  const openSettings = useCallback(() => {
    hapticsService.selection();
    setSettingsVisible(true);
  }, []);
  const closeSettings = useCallback(() => setSettingsVisible(false), []);
  const openPhotoPreview = useCallback(() => {
    if (runtimeRef.current.lastPhoto?.uri) {
      hapticsService.selection();
      setPreviewModalVisible(true);
    }
  }, [runtimeRef]);
  const closePhotoPreview = useCallback(
    () => setPreviewModalVisible(false),
    [],
  );
  const setters = useMemo(
    () => ({
      toggleVideoMute,
      selectVideoEffect,
      setMode,
      setFlash,
      setEnableTorch,
      setShowFilterBar,
      setShowParanormalOverlay,
      setShowGuides,
      setMirrorFront,
      setLastPhoto,
      selectMode,
      toggleCameraFacing,
      openSettings,
      closeSettings,
      openPhotoPreview,
      closePhotoPreview,
    }),
    [
      toggleVideoMute,
      selectVideoEffect,
      selectMode,
      toggleCameraFacing,
      openSettings,
      closeSettings,
      openPhotoPreview,
      closePhotoPreview,
    ],
  );
  return {
    videoMuted,
    videoEffect,
    facing,
    mode,
    flash,
    enableTorch,
    showFilterBar,
    showParanormalOverlay,
    showGuides,
    mirrorFront,
    settingsVisible,
    lastPhoto,
    previewModalVisible,
    setters,
  };
}
