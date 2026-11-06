const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const withAndroidBuildOptimizations = require('../plugins/withAndroidBuildOptimizations');

test('withAndroidBuildOptimizations registers expected Expo config plugin mods and eas.json overrides', () => {
  assert.equal(typeof withAndroidBuildOptimizations, 'function');

  const pluginSource = fs.readFileSync(
    path.join(__dirname, '..', 'plugins', 'withAndroidBuildOptimizations.js'),
    'utf8'
  );
  assert.match(pluginSource, /reactNativeArchitectures/);
  assert.match(pluginSource, /CMAKE_JOB_POOLS=compile=/);
  assert.match(pluginSource, /CMAKE_JOB_POOL_LINK=link/);
  assert.match(pluginSource, /cppFlags\s*\(?\s*"-g0"/);

  const easConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'eas.json'), 'utf8')
  );
  for (const profileName of ['development', 'preview']) {
    const env = easConfig.build[profileName].env;
    assert.equal(env.REACT_NATIVE_ARCHITECTURES, 'arm64-v8a');
    assert.equal(env.GRADLE_MAX_WORKERS, '1');
    assert.match(env.GRADLE_OPTS, /-Dorg\.gradle\.parallel=false/);
    assert.match(env.GRADLE_OPTS, /-Dorg\.gradle\.workers\.max=1/);
    assert.match(env.GRADLE_OPTS, /-Xmx2560m/);
  }
});

