import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				brand: "#5865F2",
				gray: {
					50: "#ECEDEE",
					100: "#DCDDDE",
					200: "#B9BBBE",
					300: "#8E9297",
					400: "#72767D",
					500: "#5C6067",
					600: "#464950",
					700: "#36393F",
					800: "#2F3136",
					900: "#202225",
				},
			},
		},
	},
	plugins: [],
};
export default config;
