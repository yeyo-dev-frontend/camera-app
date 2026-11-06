import React from "react";
import { View } from "react-native";

function BoxImpl({
  className = "",
  style = undefined,
  children = undefined,
  ...props
}) {
  return (
    <View className={className} style={style} {...props}>
      {children}
    </View>
  );
}

export const Box = React.memo(BoxImpl);
