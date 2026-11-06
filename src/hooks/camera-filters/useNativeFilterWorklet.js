import { Skia, useImage } from "@shopify/react-native-skia";
import { useCallback, useEffect, useMemo } from "react";
import { Platform } from "react-native";
import { createSynchronizable, scheduleOnRN } from "react-native-worklets";
import { HORROR_ASSETS } from "../../constants/theme";
import {
  drawParanormalOverlay,
  drawPhotoFilter,
} from "../../services/filterRenderer";
import { getFrameGeometry } from "../../utils/frameGeometry";

const isAndroid = Platform.OS === "android";

export function useNativeFilterWorklet({
  activeFilter,
  facing,
  mirrorFront,
  showParanormalOverlay,
  reportError,
}) {
  const handprint = useImage(HORROR_ASSETS.ghostHandprint);
  const renderConfig = useMemo(
    () =>
      createSynchronizable({
        activeFilter,
        facing,
        mirrorFront,
        showParanormalOverlay,
        handprint: null,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
  useEffect(() => {
    renderConfig.setBlocking({
      activeFilter,
      facing,
      mirrorFront,
      showParanormalOverlay,
      handprint,
    });
  }, [
    renderConfig,
    activeFilter,
    facing,
    mirrorFront,
    showParanormalOverlay,
    handprint,
  ]);
  return useCallback(
    (frame, render) => {
      "worklet";
      try {
        const cfg = renderConfig.getBlocking();
        render(({ canvas, frameTexture }) => {
          const geo = getFrameGeometry(
            frame.width,
            frame.height,
            frame.orientation,
            frame.isMirrored,
          );
          const scale = 2048 / Math.max(geo.width, geo.height);
          const outW = Math.round(geo.width * scale),
            outH = Math.round(geo.height * scale);
          const srcRect = Skia.XYWHRect(0, 0, frame.width, frame.height),
            dstRect = Skia.XYWHRect(0, 0, outW, outH);
          canvas.save();
          try {
            if (!isAndroid) {
              canvas.translate(frame.width / 2, frame.height / 2);
              canvas.rotate(-geo.rotation, 0, 0);
              if (frame.isMirrored) canvas.scale(-1, 1);
              canvas.translate(-geo.width / 2, -geo.height / 2);
            }
            canvas.scale(geo.width / outW, geo.height / outH);
            drawPhotoFilter({
              canvas,
              skImage: frameTexture,
              srcRect,
              dstRect,
              outW,
              outH,
              filter: cfg.activeFilter,
              source: {
                ...geo,
                mirrored:
                  frame.isMirrored !==
                  (cfg.facing === "front" && !cfg.mirrorFront),
              },
            });
            if (cfg.showParanormalOverlay && cfg.activeFilter.id !== "original")
              drawParanormalOverlay(canvas, cfg.handprint, outW, outH);
          } finally {
            canvas.restore();
            srcRect.dispose();
            dstRect.dispose();
          }
        });
      } catch (cause) {
        scheduleOnRN(reportError, String(cause));
      } finally {
        frame.dispose();
      }
    },
    [renderConfig, reportError],
  );
}
