import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Box } from "../../atoms";
import { HorrorBackdrop } from "../../organisms/backdrop/HorrorBackdrop";
import { BottomCameraControls } from "../../organisms/bottom-controls/BottomCameraControls";
import { DarkSettingsModal } from "../../organisms/modals/DarkSettingsModal";
import { PhotoPreviewModal } from "../../organisms/modals/PhotoPreviewModal";
import { TopControlBar } from "../../organisms/top-bar/TopControlBar";
import { CameraViewfinder } from "../../organisms/viewfinder/CameraViewfinder";

function DarkCameraTemplateImpl({ cameraRef, state, animations, actions }) {
  return (
    <Box className="flex-1 bg-obsidian-950">
      <StatusBar style="light" />
      <HorrorBackdrop showSigils />
      <SafeAreaView className="flex-1" edges={["top", "bottom"]}>
        <TopControlBar
          onOpenSettings={actions.openSettings}
          onFlipCamera={actions.toggleCameraFacing}
          isBusy={state.isBusy}
          isRecording={state.isRecording}
        />
        <CameraViewfinder
          cameraRef={cameraRef}
          facing={state.facing}
          mode={state.mode}
          flash={state.flash}
          enableTorch={state.enableTorch}
          mirrorFront={state.mirrorFront}
          activeFilter={state.activeFilter}
          activeFilterId={state.activeFilterId}
          filterIntensity={state.filterIntensity}
          onChangeFilterIntensity={actions.changeFilterIntensity}
          showFilterBar={state.showFilterBar}
          onSelectFilter={actions.selectFilter}
          showParanormalOverlay={state.showParanormalOverlay}
          showGuides={state.showGuides}
          lastPhoto={state.lastPhoto}
          onOpenPhotoPreview={actions.openPhotoPreview}
          isRecording={state.isRecording}
          isBusy={state.isBusy}
          shutterFlashAnim={animations.shutterFlashAnim}
          toastMessage={state.toastMessage}
          toastAnim={animations.toastAnim}
          onReadyChange={actions.onCameraReadyChange}
          videoMuted={state.videoMuted}
          onToggleVideoMute={actions.toggleVideoMute}
          videoEffect={state.videoEffect}
          onSelectVideoEffect={actions.selectVideoEffect}
          previewModalVisible={state.previewModalVisible}
        />
        <BottomCameraControls
          mode={state.mode}
          onSelectMode={actions.selectMode}
          isBusy={state.isBusy}
          cameraReady={state.cameraReady}
          isRecording={state.isRecording}
          onTakePicture={actions.takePicture}
          onToggleVideo={actions.toggleVideoRecording}
          recordPulseAnim={animations.recordPulseAnim}
        />
      </SafeAreaView>
      <DarkSettingsModal
        visible={state.settingsVisible}
        onClose={actions.closeSettings}
        flash={state.flash}
        setFlash={actions.setFlash}
        enableTorch={state.enableTorch}
        setEnableTorch={actions.setEnableTorch}
        showFilterBar={state.showFilterBar}
        setShowFilterBar={actions.setShowFilterBar}
        showParanormalOverlay={state.showParanormalOverlay}
        setShowParanormalOverlay={actions.setShowParanormalOverlay}
        showGuides={state.showGuides}
        setShowGuides={actions.setShowGuides}
        mirrorFront={state.mirrorFront}
        setMirrorFront={actions.setMirrorFront}
      />
      <PhotoPreviewModal
        photoUri={state.lastPhoto?.uri}
        filterName={state.lastPhoto?.filterName}
        visible={state.previewModalVisible}
        onClose={actions.closePhotoPreview}
      />
    </Box>
  );
}
export const DarkCameraTemplate = React.memo(DarkCameraTemplateImpl);
