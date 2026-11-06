import * as MediaLibrary from "expo-media-library";
import { Platform } from "react-native";

import { ensurePermission } from "../permissions/permissionService";

export async function saveMediaToGallery(uri) {
  if (!uri) {
    throw new Error("URI de archivo multimedia inválida");
  }
  return MediaLibrary.Asset.create(uri);
}

export async function ensureGalleryWriteAccess() {
  if (Platform.OS === "android" && Number(Platform.Version) >= 30) return true;
  return ensurePermission(
    () => MediaLibrary.getPermissionsAsync(true),
    () => MediaLibrary.requestPermissionsAsync(true),
    "Permite guardar fotos y videos en la galería.",
  );
}
