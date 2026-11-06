import React from "react";
import { Image } from "react-native";

function ImgImpl({
  source,
  className = "w-full h-full",
  style = undefined,
  resizeMode = /** @type {import('react-native').ImageResizeMode} */ ("cover"),
  ...props
}) {
  return (
    <Image
      source={source}
      className={className}
      style={style}
      resizeMode={resizeMode}
      {...props}
    />
  );
}

export const Img = React.memo(ImgImpl);
