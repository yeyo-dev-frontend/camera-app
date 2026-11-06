import { LinearGradient } from "expo-linear-gradient";
import React from "react";

import { HORROR_ASSETS } from "../../../constants/theme";
import { ArcaneSigilSvg, Box, GothicCrossSvg, Img } from "../../atoms";

function HorrorBackdropImpl({ showSigils = true }) {
  return (
    <>
      <Img
        source={HORROR_ASSETS.topBanner}
        className="absolute top-0 left-0 right-0 w-full h-[195px] opacity-90"
        pointerEvents="none"
      />
      {showSigils && (
        <>
          <Box className="absolute top-[6px] left-[27%]" pointerEvents="none">
            <ArcaneSigilSvg size={136} />
          </Box>
          <Box className="absolute top-0 left-[17%]" pointerEvents="none">
            <GothicCrossSvg width={54} height={88} opacity={0.2} />
          </Box>
        </>
      )}
      <Img
        source={HORROR_ASSETS.bottomBanner}
        className="absolute bottom-0 left-0 right-0 w-full h-[235px] opacity-95"
        pointerEvents="none"
      />
      <LinearGradient
        pointerEvents="none"
        colors={["transparent", "rgba(65, 0, 7, 0.24)", "rgba(0, 0, 0, 0.7)"]}
        className="absolute bottom-0 left-0 right-0 h-[235px]"
      />
      {showSigils && (
        <Box className="absolute bottom-[72px] right-3" pointerEvents="none">
          <GothicCrossSvg width={58} height={96} opacity={0.22} />
        </Box>
      )}
    </>
  );
}

export const HorrorBackdrop = React.memo(HorrorBackdropImpl);
