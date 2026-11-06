import { CameraView } from "expo-camera";
import { LinearGradient } from "expo-linear-gradient";
import { cssInterop } from "nativewind";
import { SafeAreaView } from "react-native-safe-area-context";

cssInterop(LinearGradient, { className: "style" });
cssInterop(SafeAreaView, { className: "style" });
cssInterop(CameraView, { className: "style" });
