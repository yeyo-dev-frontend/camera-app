import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import test from 'node:test';

import { CAMERA_FILTERS, getFilterById } from '../src/constants/filters.js';
import { resolveFilter } from '../src/utils/filterSettings.js';
import { getFrameGeometry } from '../src/utils/frameGeometry.js';

const require = createRequire(import.meta.url);
const CanvasKit = await require('canvaskit-wasm')();
const { JsiSkApi } = require('@shopify/react-native-skia/lib/commonjs/skia/web/JsiSkia');
const types = require('@shopify/react-native-skia/lib/commonjs/skia/types');
const Skia = JsiSkApi(CanvasKit);
// Use real Skia rasterization in Node, substituting only the native entry point.
const { code } = require('@babel/core').transformSync(
  readFileSync(new URL('../src/services/filterRenderer.js', import.meta.url), 'utf8'),
  { configFile: false, babelrc: false, plugins: ['@babel/plugin-transform-modules-commonjs'] },
);
const exports = {};
new Function('require', 'exports', code)(() => ({ ...types, Skia }), exports);
const { drawPhotoFilter, drawParanormalOverlay } = exports;

function fixture(width, height) {
  const surface = Skia.Surface.Make(width, height);
  const canvas = surface.getCanvas();
  const paint = Skia.Paint();
  for (const [x, y, color] of [[0, 0, '#d83271'], [width / 2, 0, '#267d53'],
    [0, height / 2, '#334bad'], [width / 2, height / 2, '#e8c789']]) {
    paint.setColor(Skia.Color(color));
    canvas.drawRect(Skia.XYWHRect(x, y, width / 2, height / 2), paint);
  }
  const image = surface.makeImageSnapshot();
  paint.dispose();
  surface.dispose();
  return image;
}

const sensor = fixture(80, 60);
function render(filter, geometry = null, image = sensor, overlay = false) {
  const width = geometry?.width ?? image.width();
  const height = geometry?.height ?? image.height();
  const surface = Skia.Surface.Make(width, height);
  drawPhotoFilter({ canvas: surface.getCanvas(), skImage: image,
    srcRect: Skia.XYWHRect(0, 0, image.width(), image.height()),
    dstRect: Skia.XYWHRect(0, 0, width, height), outW: width, outH: height,
    filter, source: geometry });
  if (overlay) drawParanormalOverlay(surface.getCanvas(), sensor, width, height);
  const result = surface.makeImageSnapshot();
  surface.dispose();
  return result;
}

test('live sensor processing matches saved-photo processing in every orientation and intensity', () => {
  for (const orientation of ['up', 'down', 'left', 'right']) {
    for (const mirrored of [false, true]) {
      const geometry = getFrameGeometry(80, 60, orientation, mirrored);
      const upright = render(resolveFilter(getFilterById('original')), geometry);
      for (const preset of CAMERA_FILTERS) {
        for (const intensity of [0, 0.35, 1]) {
          const filter = resolveFilter(preset, intensity);
          const live = render(filter, geometry, sensor, preset.id !== 'original');
          const saved = render(filter, null, upright, preset.id !== 'original');
          assert.deepEqual(live.readPixels(), saved.readPixels(), `${preset.id}/${intensity}/${orientation}/${mirrored}`);
          live.dispose();
          saved.dispose();
        }
      }
      upright.dispose();
    }
  }
});

test('NOIR is grayscale on actual pixels, zero intensity restores the source', () => {
  const noir = render(resolveFilter(getFilterById('noir')));
  const pixels = noir.readPixels();
  for (let i = 0; i < pixels.length; i += 4) {
    assert.equal(pixels[i], pixels[i + 1]);
    assert.equal(pixels[i + 1], pixels[i + 2]);
  }
  noir.dispose();
  for (const preset of CAMERA_FILTERS) {
    const zero = render(resolveFilter(preset, 0));
    assert.deepEqual(zero.readPixels(), sensor.readPixels(), preset.id);
    zero.dispose();
  }
});

test.after(() => sensor.dispose());
