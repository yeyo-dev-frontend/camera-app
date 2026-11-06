import React from "react";

import { Box } from "../../atoms";
import { HudCenterReticle } from "../../molecules/hud-guides/HudCenterReticle";
import { HudCornerBracket } from "../../molecules/hud-guides/HudCornerBracket";

function ViewfinderHudImpl({ showGuides = true }) {
  if (!showGuides) return null;

  return (
    <Box className="absolute inset-0" pointerEvents="none">
      <HudCornerBracket position="tl" className="top-[14px] left-[14px]" />
      <HudCornerBracket position="tr" className="top-[14px] right-[14px]" />
      <HudCornerBracket position="bl" className="bottom-[14px] left-[14px]" />
      <HudCornerBracket position="br" className="bottom-[14px] right-[14px]" />
      <HudCenterReticle />
    </Box>
  );
}

export const ViewfinderHud = React.memo(ViewfinderHudImpl);
