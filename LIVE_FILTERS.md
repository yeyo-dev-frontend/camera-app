# Probar los filtros en vivo

El modo foto usa VisionCamera 5 y Skia para procesar los fotogramas antes de
mostrarlos. Comparte matrices de color, aberración cromática, grano, líneas,
viñeta y huella con la foto exportada. La intensidad cambia en pasos de 5 %.
El modo video conserva Expo Camera y guarda video sin filtros.

## Instalar en Android

Se necesita una compilación de desarrollo; Expo Go no contiene estos módulos.
El perfil `development` ya está definido en `eas.json`.

```sh
npx eas-cli@latest login
npx eas-cli@latest build --profile development --platform android
```

En la primera compilación, EAS solicitará vincular el proyecto y configurar su
identificador Android. Instala el APK que entregue EAS y luego inicia Metro:

```sh
npx expo start --dev-client
```

Para iOS, usa `--platform ios` y configura la firma/dispositivo mediante EAS.
Referencias: [development builds de Expo](https://docs.expo.dev/develop/development-builds/introduction/)
y [Skia en VisionCamera](https://visioncamera.margelo.com/docs/skia-frame-processors).

## Validación

```sh
npm run lint
npm run typecheck
npm test
```

Las pruebas usan Skia/CanvasKit real para comparar píxeles de ambas rutas de
renderizado, con cuatro orientaciones, espejo y distintas intensidades. No
sustituyen una prueba de cámara en Android/iOS ni miden FPS.

En un teléfono, revisar:

- NOIR completamente gris al 100 %, y color original al 0 % con la huella desactivada.
- Cambios de intensidad antes de capturar; comparar el visor con la foto guardada.
- VHS, IR nocturno y posición de la huella en ambas cámaras.
- Espejo frontal activado/desactivado, flash, linterna y regreso desde segundo plano.
- Cambio foto/video, grabación con audio y regreso al modo foto.
- Fluidez y temperatura durante varios minutos, especialmente con VHS.

El visor solicita fotogramas de 960 × 720 a 30 FPS, con texturas calculadas en
las coordenadas de exportación de 2048 px. Son objetivos, no mediciones de
rendimiento. El sensor puede negociar otras resoluciones. La exposición,
flash y procesamiento fotográfico del dispositivo pueden producir diferencias
respecto al video del visor aun usando el mismo filtro.
