export const LOAD_POKE = 'load_poke';
export const POKE_LOADED = 'poke_loaded';

export function Action( type, payload = null ) {
	return { type, payload };
}