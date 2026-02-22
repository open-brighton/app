const {
  withAndroidManifest,
  AndroidConfig,
} = require("expo/config-plugins");

const { getMainActivityOrThrow } = AndroidConfig.Manifest;

/**
 * Sets android:launchMode="singleTask" on the main activity so deep links
 * are handled in one place and the "linking in multiple places" error is avoided.
 */
function withAndroidLaunchModeSingleTask(config) {
  return withAndroidManifest(config, (config) => {
    const mainActivity = getMainActivityOrThrow(config.modResults);
    if (mainActivity?.$) {
      mainActivity.$["android:launchMode"] = "singleTask";
    }
    return config;
  });
}

module.exports = withAndroidLaunchModeSingleTask;
