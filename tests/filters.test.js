import assert from 'node:assert/strict';
import test from 'node:test';

import { CAMERA_FILTERS, DEFAULT_FILTER_ID, getFilterById } from '../src/constants/filters.js';
import { clampIntensity, IDENTITY_COLOR_MATRIX, resolveFilter } from '../src/utils/filterSettings.js';

test('zero intensity removes grading and textures for every preset', () => {
  for (const preset of CAMERA_FILTERS) {
    const filter = resolveFilter(preset, 0);
    assert.deepEqual(filter.colorMatrix, IDENTITY_COLOR_MATRIX);
    assert.equal(filter.grainOpacity, 0);
    assert.equal(filter.chromaticShift, 0);
    assert.equal(filter.scanlines, false);
    assert.equal(filter.scanlineOpacity, 0);
    for (const color of [...filter.edgeColors, filter.vignetteColor]) {
      assert.ok(color === 'transparent' || color.endsWith(', 0)'));
    }
  }
});

test('NOIR produces equal RGB values and preserves alpha', () => {
  const { colorMatrix: matrix } = resolveFilter(getFilterById('noir'));
  assert.deepEqual(matrix.slice(0, 5), matrix.slice(5, 10));
  assert.deepEqual(matrix.slice(5, 10), matrix.slice(10, 15));
  assert.deepEqual(matrix.slice(15), [0, 0, 0, 1, 0]);
});

test('half intensity interpolates color grading without mutating presets', () => {
  const preset = getFilterById('vhs');
  const before = JSON.stringify(preset);
  const filter = resolveFilter(preset, 0.5);
  filter.colorMatrix.forEach((value, index) => {
    assert.equal(value, IDENTITY_COLOR_MATRIX[index] + (preset.colorMatrix[index] - IDENTITY_COLOR_MATRIX[index]) / 2);
  });
  assert.equal(filter.chromaticShift, preset.chromaticShift / 2);
  assert.equal(filter.grainOpacity, preset.grainOpacity / 2);
  assert.equal(JSON.stringify(preset), before);
});

test('invalid input is bounded and unknown filters keep the original default', () => {
  assert.equal(clampIntensity(-1), 0);
  assert.equal(clampIntensity(2), 1);
  assert.equal(clampIntensity(NaN), 1);
  assert.equal(clampIntensity(Infinity), 1);
  assert.equal(getFilterById('missing').id, DEFAULT_FILTER_ID);
  assert.deepEqual(resolveFilter(getFilterById('original'), 1).colorMatrix, IDENTITY_COLOR_MATRIX);
});
