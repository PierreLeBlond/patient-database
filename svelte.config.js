import adapter from '@sveltejs/adapter-node';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		postcss: true
	}),

	kit: {
		adapter: adapter({
		}),
		// https://www.npmjs.com/package/@sveltejs/adapter-static
		trailingSlash: 'always'
	},

	prerender: {
		// This can be false if you're using a fallback (i.e. SPA mode)
		default: true
	},

	paths: {
		base: process.env.NODE_ENV === 'development' ? '' : '/patient-database',
	},

	// Override http methods in the Todo forms
	methodOverride: {
		allowed: ['PATCH', 'DELETE']
	}
};

export default config;
