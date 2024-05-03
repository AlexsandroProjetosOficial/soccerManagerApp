import { colors } from './src/styles/colors';
import { fonts } from './src/styles/fonts';
import { sizing } from './src/styles/sizing';

/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {
			colors,
			fontFamily: fonts,
			sizing
		},
	},
	plugins: []
}
