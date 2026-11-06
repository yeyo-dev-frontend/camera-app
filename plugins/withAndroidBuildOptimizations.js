const {
  withAppBuildGradle,
  withGradleProperties,
  withProjectBuildGradle,
} = require('expo/config-plugins');

function setGradleProperty(modResults, key, value) {
  const existing = modResults.find(
    (item) => item.type === 'property' && item.key === key
  );
  if (existing) {
    existing.value = value;
  } else {
    modResults.push({ type: 'property', key, value });
  }
}

const APP_CMAKE_MARKER = '// [withAndroidBuildOptimizations] app cmake pools';
const ROOT_CMAKE_MARKER = '// [withAndroidBuildOptimizations] subprojects cmake pools';

module.exports = function withAndroidBuildOptimizations(config, options = {}) {
  const architectures =
    process.env.REACT_NATIVE_ARCHITECTURES ||
    options.architectures ||
    'arm64-v8a';
  const maxWorkers =
    process.env.GRADLE_MAX_WORKERS || String(options.maxWorkers || 1);
  const compileJobs = Number(process.env.CMAKE_COMPILE_JOBS || 2);

  config = withGradleProperties(config, (gradleConfig) => {
    setGradleProperty(
      gradleConfig.modResults,
      'reactNativeArchitectures',
      architectures
    );
    setGradleProperty(
      gradleConfig.modResults,
      'org.gradle.jvmargs',
      '-Xmx2560m -XX:MaxMetaspaceSize=512m -Dfile.encoding=UTF-8'
    );
    setGradleProperty(
      gradleConfig.modResults,
      'kotlin.daemon.jvmargs',
      '-Xmx1024m'
    );
    setGradleProperty(gradleConfig.modResults, 'org.gradle.parallel', 'false');
    setGradleProperty(
      gradleConfig.modResults,
      'org.gradle.workers.max',
      maxWorkers
    );
    return gradleConfig;
  });

  config = withAppBuildGradle(config, (appGradleConfig) => {
    if (
      appGradleConfig.modResults.language === 'groovy' &&
      !appGradleConfig.modResults.contents.includes(APP_CMAKE_MARKER)
    ) {
      const snippet = `
        ${APP_CMAKE_MARKER}
        externalNativeBuild {
            cmake {
                cppFlags "-g0"
                arguments "-DCMAKE_JOB_POOLS=compile=${compileJobs};link=1",
                          "-DCMAKE_JOB_POOL_COMPILE=compile",
                          "-DCMAKE_JOB_POOL_LINK=link"
            }
        }`;

      appGradleConfig.modResults.contents =
        appGradleConfig.modResults.contents.replace(
          /defaultConfig\s*\{/,
          (match) => `${match}${snippet}`
        );
    }
    return appGradleConfig;
  });

  config = withProjectBuildGradle(config, (projectGradleConfig) => {
    if (
      projectGradleConfig.modResults.language === 'groovy' &&
      !projectGradleConfig.modResults.contents.includes(ROOT_CMAKE_MARKER)
    ) {
      const subprojectsBlock = `
${ROOT_CMAKE_MARKER}
subprojects { subproject ->
  def limitNativeJobs = {
    try {
      def androidExt = subproject.extensions.findByName("android")
      if (androidExt != null) {
        androidExt.defaultConfig.externalNativeBuild.cmake.arguments(
          "-DCMAKE_JOB_POOLS=compile=${compileJobs};link=1",
          "-DCMAKE_JOB_POOL_COMPILE=compile",
          "-DCMAKE_JOB_POOL_LINK=link"
        )
        androidExt.defaultConfig.externalNativeBuild.cmake.cppFlags("-g0")
      }
    } catch (Throwable ignored) {}
  }
  subproject.plugins.withId("com.android.library", limitNativeJobs)
}
`;
      projectGradleConfig.modResults.contents += `\n${subprojectsBlock}`;
    }
    return projectGradleConfig;
  });

  return config;
};
