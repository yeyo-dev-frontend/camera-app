// Keep the original until the gallery confirms a successful save.
export async function saveRecordedVideo(
  uri,
  effect,
  { exportNightshot, saveMedia, deleteTemp },
) {
  let outputUri = uri;
  let filterError = null;
  if (effect === "night") {
    try {
      outputUri = await exportNightshot(uri);
      if (!outputUri || outputUri === uri)
        throw new Error("Nightshot no generó un vídeo nuevo.");
    } catch (error) {
      filterError = error;
      outputUri = uri;
    }
  }
  try {
    await saveMedia(outputUri);
  } catch (error) {
    if (outputUri !== uri) deleteTemp(outputUri);
    throw error;
  }
  if (outputUri !== uri) deleteTemp(outputUri);
  deleteTemp(uri);
  return { filterError };
}
