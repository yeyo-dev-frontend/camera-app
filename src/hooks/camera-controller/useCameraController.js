import { useEffect, useMemo, useRef, useState } from "react";

import { useCameraFilters } from "../camera-filters/useCameraFilters";
import { useDarkToast } from "../toast/useDarkToast";
import { useCameraPermissionSync } from "./useCameraPermissionSync";
import { useCameraReadyState } from "./useCameraReadyState";
import { useCameraSettingsState } from "./useCameraSettingsState";
import { usePhotoCaptureAction } from "./usePhotoCaptureAction";
import { useRecordingPulse } from "./useRecordingPulse";
import { useVideoRecordAction } from "./useVideoRecordAction";

export function useCameraController() {
  const [isRecording, setIsRecording] = useState(false);
  const [isBusy, setIsBusy] = useState(false);
  const cameraRef = useRef(null);
  const runtimeRef = useRef({});
  const { cameraReady, onCameraReadyChange, waitForCamera } =
    useCameraReadyState();
  const { setters, ...s } = useCameraSettingsState(
    runtimeRef,
    onCameraReadyChange,
  );
  const modeRef = useRef(s.mode);
  const {
    cameraGranted,
    enableCamera,
    requestMicPermission,
    getMicPermission,
  } = useCameraPermissionSync();
  const { shutterFlashAnim, recordPulseAnim, triggerShutterBlink } =
    useRecordingPulse(isRecording);
  const { toastMessage, toastAnim, showToast } = useDarkToast();
  const {
    activeFilterId,
    activeFilter,
    filterIntensity,
    selectFilter,
    changeFilterIntensity,
  } = useCameraFilters(isBusy || isRecording);

  useEffect(() => {
    runtimeRef.current = {
      isRecording,
      isBusy,
      mode: s.mode,
      activeFilterId,
      filterIntensity,
      showParanormalOverlay: s.showParanormalOverlay,
      lastPhoto: s.lastPhoto,
    };
    modeRef.current = s.mode;
  }, [
    isRecording,
    isBusy,
    s.mode,
    activeFilterId,
    filterIntensity,
    s.showParanormalOverlay,
    s.lastPhoto,
  ]);

  const takePicture = usePhotoCaptureAction({
    cameraRef,
    runtimeRef,
    modeRef,
    setMode: setters.setMode,
    setIsBusy,
    setLastPhoto: setters.setLastPhoto,
    onCameraReadyChange,
    waitForCamera,
    triggerShutterBlink,
    showToast,
  });
  const toggleVideoRecording = useVideoRecordAction({
    videoMuted: s.videoMuted,
    videoEffect: s.videoEffect,
    cameraRef,
    runtimeRef,
    modeRef,
    setMode: setters.setMode,
    setIsBusy,
    setIsRecording,
    onCameraReadyChange,
    waitForCamera,
    getMicPermission,
    requestMicPermission,
    showToast,
  });

  const animations = useMemo(
    () => ({ shutterFlashAnim, recordPulseAnim, toastAnim }),
    [shutterFlashAnim, recordPulseAnim, toastAnim],
  );
  const actions = useMemo(
    () => ({
      ...setters,
      onCameraReadyChange,
      selectFilter,
      changeFilterIntensity,
      takePicture,
      toggleVideoRecording,
    }),
    [
      setters,
      onCameraReadyChange,
      selectFilter,
      changeFilterIntensity,
      takePicture,
      toggleVideoRecording,
    ],
  );

  return {
    cameraRef,
    cameraGranted,
    enableCamera,
    animations,
    actions,
    state: {
      ...s,
      activeFilterId,
      activeFilter,
      filterIntensity,
      isRecording,
      isBusy,
      cameraReady,
      toastMessage,
    },
  };
}
