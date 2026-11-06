import Constants from "expo-constants";
import React from "react";
import { Platform } from "react-native";

import { CameraStatusMessage } from "../../molecules/viewfinder-status/CameraStatusMessage";

export const supportsLiveFilters =
  Platform.OS !== "web" && Constants.executionEnvironment !== "storeClient";

const NativeCamera = supportsLiveFilters
  ? require("./NativeFilterCamera").NativeFilterCamera
  : null;

export function FilterCamera(props) {
  if (NativeCamera) return <NativeCamera {...props} />;
  return (
    <CameraStatusMessage
      message={
        Platform.OS === "web"
          ? "Abre la app en Android o iOS para usar la cámara."
          : "Abre la versión de desarrollo instalada para usar la cámara."
      }
    />
  );
}
