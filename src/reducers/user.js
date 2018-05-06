import { POKE_LOADED_FROM_STORAGE, SAVE_POKE } from './../actions';

const initialState = {
    savedPokes: []
};

export default function user(state = initialState, action) {
    const { type, payload } = action;
    let { savedPokes } = state;
    switch (type) {
        case SAVE_POKE: 
            if (payload) {
                var index = savedPokes.indexOf(payload);
                if (index === -1) {
                    savedPokes = [...savedPokes, payload];
                } else {
                    savedPokes.splice(index, 1);
                }
                return { ...state, savedPokes: [...savedPokes] }
            }
            return state;
        case POKE_LOADED_FROM_STORAGE:
            if (payload && Array.isArray(payload)){
                savedPokes = savedPokes.concat(payload);
            }
            return { ...state, savedPokes }
        default:
            return state;
    }
}