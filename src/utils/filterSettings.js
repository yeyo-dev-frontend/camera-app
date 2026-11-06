export const IDENTITY_COLOR_MATRIX = [
  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
];

export function clampIntensity(value) {
  return Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 1;
}

function scaleAlpha(color, intensity) {
  if (color === "transparent" || intensity === 1) return color;
  return color.replace(/rgba\(([^)]+)\)/, (_, channels) => {
    const [r, g, b, alpha] = channels.split(",").map(Number);
    return `rgba(${r}, ${g}, ${b}, ${alpha * intensity})`;
  });
}

// One definition drives both the GPU camera preview and the saved photo.
export function resolveFilter(filter, value = 1) {
  const intensity = filter.id === "original" ? 0 : clampIntensity(value);
  const chromaticShift = filter.chromaticShift * intensity;
  const grainOpacity = filter.grainOpacity * intensity;
  const scanlineOpacity = 0.24 * intensity;
  const colorMatrix =
    intensity === 0
      ? IDENTITY_COLOR_MATRIX.slice()
      : intensity === 1
        ? filter.colorMatrix.slice()
        : filter.colorMatrix.map(
            (c, i) =>
              IDENTITY_COLOR_MATRIX[i] +
              (c - IDENTITY_COLOR_MATRIX[i]) * intensity,
          );

  return {
    ...filter,
    intensity,
    colorMatrix,
    edgeColors: filter.edgeColors.map((c) => scaleAlpha(c, intensity)),
    vignetteColor: scaleAlpha(filter.vignetteColor, intensity),
    chromaticShift,
    chromaticRedMatrix:
      chromaticShift > 0
        ? [
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
            0.32 * intensity,
            0,
          ]
        : null,
    chromaticCyanMatrix:
      chromaticShift > 0
        ? [
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
            0.3 * intensity,
            0,
          ]
        : null,
    grainOpacity,
    grainMatrix:
      grainOpacity > 0
        ? [
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
            grainOpacity * 0.55,
            0,
          ]
        : null,
    scanlines: Boolean(filter.scanlines && intensity > 0),
    scanlineOpacity,
    scanlineColor: `rgba(0, 0, 0, ${scanlineOpacity})`,
  };
}
