# Nightshot video export

Local Expo module, discovered automatically in `modules/`. No generated app
`android/` or `ios/` directory needs manual changes.

Android uses Media3 Transformer with an RGB luminance matrix; iOS uses
AVAssetExportSession and CIColorMatrix. Both export a green MP4 and retain the
input audio when present. Muted recordings remain silent. The preview tint is
an approximation; the export uses green luminance grading. HUD, scanlines and
vignette remain preview-only.

Install a fresh native build after adding/changing this module:

```sh
npx eas-cli@latest build --platform android --profile development
```

A Metro reload/OTA update cannot add the native exporter. Older binaries show a
message before recording Nightshot instead of silently saving normal colors.
VHS recording remains usable. If encoding fails on a device, the original is
saved with an explicit warning. The original is deleted only after gallery save
succeeds.

Validation still required on native builds: 10-second rear/front recordings,
portrait orientation, microphone on/off, export played from the gallery,
repeated exports, app interruption and low storage. JavaScript tests and
autolinking checks do not compile Kotlin/Swift or validate device codecs.
