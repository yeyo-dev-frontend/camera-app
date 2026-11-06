import {
  BlendMode,
  FilterMode,
  MipmapMode,
  Skia,
  TileMode,
} from "@shopify/react-native-skia";

export function drawPhotoFilter({
  canvas,
  skImage,
  srcRect,
  dstRect,
  outW,
  outH,
  filter,
  source = null,
}) {
  "worklet";
  const drawImg = (rect, paint) => {
    "worklet";
    if (!source)
      return canvas.drawImageRectOptions(
        skImage,
        srcRect,
        rect,
        FilterMode.Linear,
        MipmapMode.None,
        paint,
      );
    canvas.save();
    canvas.translate(rect.x + rect.width / 2, rect.y + rect.height / 2);
    canvas.scale(
      (rect.width / source.width) * (source.mirrored ? -1 : 1),
      rect.height / source.height,
    );
    canvas.rotate(source.rotation, 0, 0);
    canvas.translate(-srcRect.width / 2, -srcRect.height / 2);
    canvas.drawImageRectOptions(
      skImage,
      srcRect,
      srcRect,
      FilterMode.Linear,
      MipmapMode.None,
      paint,
    );
    canvas.restore();
  };
  const passthrough = filter.id === "original" || filter.intensity <= 0;
  const paint = Skia.Paint(),
    baseCf = passthrough
      ? null
      : Skia.ColorFilter.MakeMatrix(filter.colorMatrix);
  if (baseCf) paint.setColorFilter(baseCf);
  drawImg(dstRect, paint);
  baseCf?.dispose();
  if (passthrough) return paint.dispose();
  const rect = Skia.XYWHRect(0, 0, outW, outH);
  const drawMat = (x, mat) => {
    const cf = Skia.ColorFilter.MakeMatrix(mat);
    paint.setColorFilter(cf);
    rect.setXYWH(x, 0, outW, outH);
    drawImg(rect, paint);
    cf.dispose();
  };
  if (filter.chromaticShift > 0) {
    const s = Math.max(0, Math.round((outW / 1080) * filter.chromaticShift));
    paint.setBlendMode(BlendMode.Screen);
    drawMat(
      s,
      filter.chromaticRedMatrix ?? [
        0.95,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0.32 * filter.intensity,
        0,
      ],
    );
    drawMat(
      -s,
      filter.chromaticCyanMatrix ?? [
        0,
        0,
        0,
        0,
        0,
        0,
        0.32,
        0,
        0,
        0,
        0,
        0,
        0.95,
        0,
        0,
        0,
        0,
        0,
        0.3 * filter.intensity,
        0,
      ],
    );
  }
  if (filter.grainOpacity > 0) {
    try {
      const ns = (globalThis.__darkNoiseShader ??= Skia.Shader.MakeFractalNoise(
        0.65,
        0.65,
        2,
        13,
        0,
        0,
      ));
      if (ns) {
        const gcf = Skia.ColorFilter.MakeMatrix(
          filter.grainMatrix ?? [
            0.33,
            0.33,
            0.33,
            0,
            0,
            0.33,
            0.33,
            0.33,
            0,
            0,
            0.33,
            0.33,
            0.33,
            0,
            0,
            0,
            0,
            0,
            filter.grainOpacity * 0.55,
            0,
          ],
        );
        paint.setShader(ns);
        paint.setBlendMode(BlendMode.Overlay);
        paint.setColorFilter(gcf);
        canvas.drawRect(dstRect, paint);
        gcf.dispose();
        paint.setShader(null);
      }
    } catch {}
  }
  paint.reset();
  if (filter.scanlines) {
    const step = Math.max(4, Math.round(outH / 260)),
      th = Math.max(1, Math.round(step * 0.42));
    paint.setColor(
      Skia.Color(
        filter.scanlineColor ?? `rgba(0, 0, 0, ${filter.scanlineOpacity})`,
      ),
    );
    for (let y = 0; y < outH; y += step) {
      rect.setXYWH(0, y, outW, th);
      canvas.drawRect(rect, paint);
    }
  }
  const clear = Skia.Color("transparent"),
    midY = outH * 0.5,
    drawGrad = (sh, x, w) => {
      paint.setShader(sh);
      rect.setXYWH(x, 0, w, outH);
      canvas.drawRect(rect, paint);
      sh.dispose();
    };
  if (filter.edgeColors?.length === 3) {
    const lw = Math.round(outW * 0.14),
      rw = Math.round(outW * 0.16);
    drawGrad(
      Skia.Shader.MakeLinearGradient(
        Skia.Point(0, midY),
        Skia.Point(lw, midY),
        [Skia.Color(filter.edgeColors[0]), clear],
        [0, 1],
        TileMode.Clamp,
      ),
      0,
      lw,
    );
    drawGrad(
      Skia.Shader.MakeLinearGradient(
        Skia.Point(outW - rw, midY),
        Skia.Point(outW, midY),
        [clear, Skia.Color(filter.edgeColors[2])],
        [0, 1],
        TileMode.Clamp,
      ),
      outW - rw,
      rw,
    );
  }
  drawGrad(
    Skia.Shader.MakeRadialGradient(
      Skia.Point(outW * 0.5, midY),
      Math.max(outW, outH) * 0.68,
      [clear, Skia.Color(filter.vignetteColor)],
      [0.42, 1],
      TileMode.Clamp,
    ),
    0,
    outW,
  );
  rect.dispose();
  paint.dispose();
}
export function drawParanormalOverlay(canvas, image, width, height) {
  "worklet";
  if (!image) return;
  const handW = Math.round(width * 0.34),
    handH = Math.round((handW * image.height()) / Math.max(1, image.width())),
    paint = Skia.Paint(),
    src = Skia.XYWHRect(0, 0, image.width(), image.height()),
    dst = Skia.XYWHRect(
      Math.round(width - handW * 0.91),
      Math.round(height * 0.25),
      handW,
      handH,
    );
  paint.setAlphaf(0.62);
  canvas.drawImageRectOptions(
    image,
    src,
    dst,
    FilterMode.Linear,
    MipmapMode.None,
    paint,
  );
  src.dispose();
  dst.dispose();
  paint.dispose();
}
