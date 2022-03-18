const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		borderColor: ({ theme }) => ({
			...theme('colors'),
			DEFAULT: theme('colors.frame-border', 'currentColor'),
		}),
		extend: {		
			colors: {
			'background': '#FAFAFA',
			'frame-border': '#d8d8d8',
			'hover-field': '#f0f0f0',
			'hover-frame-border': '#a3a3a3',
			},
			borderRadius: {
				DEFAULT: '10px',
			},
			spacing: {
				19: '4.75rem',
			},
		},
	plugins: []
	}};

module.exports = config;
