import assert from 'node:assert/strict';
import test from 'node:test';
import { saveRecordedVideo } from '../src/services/video/saveRecordedVideo.js';

function setup(overrides = {}) {
  const events = [];
  return {
    events,
    deps: {
      exportNightshot: async (uri) => { events.push(['export', uri]); return 'file://green.mp4'; },
      saveMedia: async (uri) => { events.push(['save', uri]); },
      deleteTemp: (uri) => events.push(['delete', uri]),
      ...overrides,
    },
  };
}

test('Nightshot saves the processed file before deleting either source', async () => {
  const { events, deps } = setup();
  assert.equal((await saveRecordedVideo('file://original.mp4', 'night', deps)).filterError, null);
  assert.deepEqual(events, [
    ['export', 'file://original.mp4'], ['save', 'file://green.mp4'],
    ['delete', 'file://green.mp4'], ['delete', 'file://original.mp4'],
  ]);
});

test('VHS retains the existing recording without transcoding', async () => {
  const { events, deps } = setup();
  await saveRecordedVideo('file://original.mp4', 'vhs', deps);
  assert.deepEqual(events, [['save', 'file://original.mp4'], ['delete', 'file://original.mp4']]);
});

test('export failure preserves the recording in the gallery and reports degraded output', async () => {
  const error = new Error('encoder unavailable');
  const { events, deps } = setup({ exportNightshot: async () => { throw error; } });
  assert.equal((await saveRecordedVideo('file://original.mp4', 'night', deps)).filterError, error);
  assert.deepEqual(events, [['save', 'file://original.mp4'], ['delete', 'file://original.mp4']]);
});

test('gallery failure keeps the original file for recovery', async () => {
  const { events, deps } = setup({ saveMedia: async () => { throw new Error('gallery full'); } });
  await assert.rejects(saveRecordedVideo('file://original.mp4', 'night', deps), /gallery full/);
  assert.deepEqual(events, [['export', 'file://original.mp4'], ['delete', 'file://green.mp4']]);
});
