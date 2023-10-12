const { getDefaultConfig } = require('@expo/metro-config');

const defaultConfig = getDefaultConfig(__dirname);
defaultConfig.resolver.sourceExts.push('cjs');
defaultConfig.resolver.sourceExts.push('mjs');
defaultConfig.resolver.assetExts.push('glb');
defaultConfig.resolver.assetExts.push('gltf');
defaultConfig.resolver.assetExts.push('obj');
defaultConfig.resolver.assetExts.push('mtl');

module.exports = defaultConfig;

// module.exports = {
// 	resolvers: {
// 		sourceExts: ['js', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
// 		assetExts: ['glb', 'gltf', 'png', 'jpg', 'hdr'],
// 	},
// };
// module.exports = {
// 	resolver: {
// 		sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs'],
// 		assetExts: ['glb', 'gltf', 'png', 'jpg', 'hdr'],
// 	},
// };
