import React from "react";
import { Text } from "react-native";

function ParagraphImpl({
  className = "text-bone-400 text-xs",
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

export const Paragraph = React.memo(ParagraphImpl);
