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
			'red': '#dc2626',
			'darker-red': '#b01e1e',
			'blue': '#009cfd',
			'darker-blue': '#0076fd',
			},
			borderRadius: {
				DEFAULT: '10px',
			},
			spacing: {
				19: '4.75rem',
			},
			gridTemplateColumns: {
				20: 'repeat(20, minmax(0, 1fr))',
			},
			keyframes: {
				ping2: {
				  '75%, 100%': { transform: 'scale(1.2)', opacity: '0' },
				}
			},
		},
	plugins: []
	}};

module.exports = config;
