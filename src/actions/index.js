export const LOAD_POKE_LIST = 'load_poke_list';
export const LOAD_POKE = 'load_poke';

export const POKE_LIST_LOADED = 'poke_list_loaded';
export const POKE_LOADED = 'poke_loaded';

export const POKE_LOADED_FROM_STORAGE = 'poke_loaded_from_storage';
export const SAVE_POKE = 'save_poke';

export function Action(type, payload = null) {
  return { type, payload };
}
