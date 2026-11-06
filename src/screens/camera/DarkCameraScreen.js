import React from "react";

import { PermissionGate } from "../../components/organisms/permissions/PermissionGate";
import { DarkCameraTemplate } from "../../components/templates/camera-layout/DarkCameraTemplate";
import { useCameraController } from "../../hooks/camera-controller/useCameraController";

export function DarkCameraScreen() {
  const { cameraRef, cameraGranted, enableCamera, state, animations, actions } =
    useCameraController();

  if (!cameraGranted) {
    return <PermissionGate onRequestPermissions={enableCamera} />;
  }

  return (
    <DarkCameraTemplate
      cameraRef={cameraRef}
      state={state}
      animations={animations}
      actions={actions}
    />
  );
}
