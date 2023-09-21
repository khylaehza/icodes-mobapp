//gluestack-ui.config.ts

import { createConfig, config as defaultConfig } from '@gluestack-ui/themed';
const config = createConfig({
	...defaultConfig.theme,
	tokens: {
		...defaultConfig.theme.tokens,
		colors: {
			...defaultConfig.theme.tokens.colors,
			white100: '#F5F5F5',
			white200: '#EEE',
			white300: '#FFF',
			blue100: '#C2CDD9',
			blue200: '#B4C4D6',
			blue250: '#8695A6',
			blue300: '#0A2542',
			red100: '#B91E23',
			gray100: '#D0D0D0',
			yellow100: '#FFC739',
		},
	},
});

export { config };

type ConfigType = typeof config;

declare module '@gluestack-style/react' {
	interface ICustomConfig extends ConfigType {}
}
