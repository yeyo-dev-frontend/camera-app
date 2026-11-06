// Counter-rotation documented by VisionCamera. Keep effects in upright photo space.
export function getFrameGeometry(width, height, orientation, mirrored) {
  "worklet";
  const sideways = orientation === "left" || orientation === "right";
  return {
    width: sideways ? height : width,
    height: sideways ? width : height,
    rotation:
      orientation === "left"
        ? 90
        : orientation === "right"
          ? -90
          : orientation === "down"
            ? 180
            : 0,
    mirrored,
  };
}
