import * as Haptics from "expo-haptics";

export const hapticsService = {
  selection() {
    Haptics.selectionAsync().catch(() => {});
  },
  lightImpact() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
  },
  mediumImpact() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
  },
  heavyImpact() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
  },
};
