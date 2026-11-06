import { ImageFormat, Skia } from "@shopify/react-native-skia";
import { File, Paths } from "expo-file-system";

import { getFilterById } from "../../constants/filters";
import { resolveFilter } from "../../utils/filterSettings";
import { drawParanormalOverlay, drawPhotoFilter } from "../filterRenderer";
import { getGhostHandprintSkImage, readSkDataFromUri } from "./skiaDataLoader";

export async function applyDarkFilterToPhoto({
  photoUri,
  filterId,
  intensity = 1,
  showParanormalOverlay = true,
  flipHorizontal = false,
}) {
  if (!photoUri) throw new Error("No se recibió una foto para procesar.");
  if (filterId === "original" && !flipHorizontal) return photoUri;
  let skData, skImage, surface, srcRect, dstRect, rawSnapshot, rasterSnapshot;
  try {
    const filter = resolveFilter(getFilterById(filterId), intensity);
    const shouldOverlay = showParanormalOverlay && filterId !== "original";
    const [loadedData, handImg] = await Promise.all([
      readSkDataFromUri(photoUri),
      shouldOverlay ? getGhostHandprintSkImage() : Promise.resolve(null),
    ]);
    skData = loadedData;
    skImage = Skia.Image.MakeImageFromEncoded(skData);
    if (!skImage) throw new Error("No se pudo procesar el filtro de la foto.");
    const srcW = skImage.width();
    const srcH = skImage.height();
    const scale = Math.min(1, 2048 / Math.max(srcW, srcH));
    const outW = Math.max(1, Math.round(srcW * scale));
    const outH = Math.max(1, Math.round(srcH * scale));
    surface =
      Skia.Surface.Make(outW, outH) ?? Skia.Surface.MakeOffscreen(outW, outH);
    if (!surface) throw new Error("No se pudo procesar el filtro de la foto.");
    const canvas = surface.getCanvas();
    srcRect = Skia.XYWHRect(0, 0, srcW, srcH);
    dstRect = Skia.XYWHRect(0, 0, outW, outH);
    drawPhotoFilter({
      canvas,
      skImage,
      srcRect,
      dstRect,
      outW,
      outH,
      filter,
      source: flipHorizontal
        ? { width: srcW, height: srcH, rotation: 0, mirrored: true }
        : null,
    });
    if (shouldOverlay && handImg)
      drawParanormalOverlay(canvas, handImg, outW, outH);
    surface.flush(true);
    rawSnapshot = surface.makeImageSnapshot();
    rasterSnapshot = rawSnapshot.makeNonTextureImage() ?? rawSnapshot;
    const encoded = rasterSnapshot.encodeToBytes(ImageFormat.JPEG, 92);
    if (!encoded?.length)
      throw new Error("No se pudo procesar el filtro de la foto.");
    const outFile = new File(
      Paths.cache,
      `dark_${filter.id}_${Date.now()}.jpg`,
    );
    outFile.create({ intermediates: true, overwrite: true });
    await outFile.write(encoded);
    return outFile.uri;
  } finally {
    if (rasterSnapshot && rasterSnapshot !== rawSnapshot)
      rasterSnapshot.dispose();
    [rawSnapshot, dstRect, srcRect, surface, skImage, skData].forEach((r) =>
      r?.dispose(),
    );
  }
}
