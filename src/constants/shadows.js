import { Platform } from "react-native";

export const GLOW_SHADOWS = {
  control: {
    shadowColor: "#ff1a1a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.85,
    shadowRadius: 10,
    elevation: 8,
  },
  toast: {
    shadowColor: "#ff1a1a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.75,
    shadowRadius: 8,
    elevation: 6,
  },
  thumb: {
    shadowColor: "#ff1a1a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 5,
  },
  sheet: {
    shadowColor: "#ff1a1a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    elevation: 12,
  },
  modal: {
    shadowColor: "#ff1a1a",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius: 18,
    elevation: 14,
  },
};

export const TEXT_GLOW_SHADOW = {
  textShadowColor: "#000",
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 4,
};
export const MONO_FONT_STYLE = {
  fontFamily: Platform.select({ ios: "Menlo", default: "monospace" }),
  textShadowColor: "#000",
  textShadowOffset: { width: 1, height: 1 },
  textShadowRadius: 2,
};
