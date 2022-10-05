// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	interface Locals {
		user?: string
	}
	// interface PageData {}
	// interface Platform {}
}

//https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error
declare namespace svelte.JSX {
	interface HTMLAttributes<T> {
		outclick?: () => void;
	}
}