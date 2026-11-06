import { requireOptionalNativeModule } from "expo";

/** @type {{ exportAsync: (uri: string) => Promise<string> } | null} */
const nightshot = requireOptionalNativeModule("Nightshot");

export function ensureNightshotAvailable() {
  if (!nightshot) {
    throw new Error("NIGHTSHOT REQUIERE INSTALAR LA NUEVA COMPILACIÓN");
  }
}

export async function exportNightshot(uri) {
  ensureNightshotAvailable();
  return nightshot.exportAsync(uri);
}
