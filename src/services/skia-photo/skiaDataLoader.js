import { Skia } from "@shopify/react-native-skia";
import { Asset } from "expo-asset";
import { File } from "expo-file-system";

import { HORROR_ASSETS } from "../../constants/theme";

let cachedHandprintImage = null;
let handprintLoadPromise = null;

export async function readSkDataFromUri(uri) {
  try {
    const data = await Skia.Data.fromURI(uri);
    if (data) return data;
  } catch {}
  if (uri.startsWith("file://")) {
    return Skia.Data.fromBytes(await new File(uri).bytes());
  }
  throw new Error("No se pudo leer el archivo de imagen.");
}

export async function getGhostHandprintSkImage() {
  if (cachedHandprintImage) return cachedHandprintImage;
  if (handprintLoadPromise) return handprintLoadPromise;
  handprintLoadPromise = (async () => {
    let data = null;
    try {
      const asset = Asset.fromModule(HORROR_ASSETS.ghostHandprint);
      if (!asset.localUri) await asset.downloadAsync();
      const targetUri = asset.localUri || asset.uri;
      if (!targetUri) return null;
      data = await readSkDataFromUri(targetUri);
      cachedHandprintImage = Skia.Image.MakeImageFromEncoded(data);
      return cachedHandprintImage;
    } catch {
      return null;
    } finally {
      data?.dispose();
      handprintLoadPromise = null;
    }
  })();
  return handprintLoadPromise;
}

export function deleteTempFileQuietly(uri) {
  if (!uri || !uri.startsWith("file://")) return;
  try {
    const file = new File(uri);
    if (file.exists) file.delete();
  } catch {}
}
