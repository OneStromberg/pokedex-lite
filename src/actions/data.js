import { Action, LOAD_POKE_LIST, LOAD_POKE} from '.'

export const loadPokeList = (limit = 10, offset = 10) => Action(LOAD_POKE_LIST, {offset, limit});
export const loadPoke = (name) => Action(LOAD_POKE, name);