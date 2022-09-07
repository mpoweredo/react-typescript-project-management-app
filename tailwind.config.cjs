const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {},
		screens: {
			'xs': '475px',
			...defaultTheme.screens,
		},
	},
	plugins: [
		require('@tailwindcss/forms')({
			strategy: 'class', // only generate classes
		}),
	],
};
