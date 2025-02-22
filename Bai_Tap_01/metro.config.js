const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
// add nice web support with optimizing compiler + CSS extraction
const { withTamagui } = require("@tamagui/metro-plugin");

const config = getDefaultConfig(__dirname, {
  // [Web-only]: Enables CSS support in Metro.
  isCSSEnabled: true,
});

config.resolver.sourceExts.push("mjs");

module.exports = withNativeWind(config, { input: "./global.css" });

// module.exports = withTamagui(config, {
//   components: ["tamagui"],
//   config: "./tamagui.config.ts",
//   outputCSS: "./tamagui-web.css",
// });
