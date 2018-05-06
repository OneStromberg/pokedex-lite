import { POKE_LOADED_FROM_STORAGE, SAVE_POKE } from './../actions';

const initialState = {
    savedPokes: []
};

export default function user(state = initialState, action) {
    const { type, payload } = action;
    let { savedPokes } = state;
    switch (type) {
        case SAVE_POKE: 
            var index = savedPokes.indexOf(payload);
            if (index === -1) {
                savedPokes = [...savedPokes, payload];
            } else {
                savedPokes.splice(index, 1);
            }
            return { ...state, savedPokes: [...savedPokes] }
        case POKE_LOADED_FROM_STORAGE:
            savedPokes = savedPokes.concat(payload);
            return { ...state, savedPokes }
        default:
            return state;
    }
}