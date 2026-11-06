import React from "react";
import { Text } from "react-native";

function TitleImpl({
  className = "text-bone-100 text-sm font-extrabold tracking-[2px]",
  style = undefined,
  children = undefined,
  ...props
}) {
  return (
    <Text className={className} style={style} {...props}>
      {children}
    </Text>
  );
}

export const Title = React.memo(TitleImpl);
