import { Action, SAVE_POKE } from '.'

export const savePoke = (name) => Action(SAVE_POKE, name)