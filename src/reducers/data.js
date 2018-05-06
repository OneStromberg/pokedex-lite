import { POKE_LOADED } from './../actions';

const initialState = {
    total: 0,
    list: []
};

export default function data(state = initialState, action) {
    const {type, payload} = action;

    switch (type) {
        case POKE_LOADED: 
            let { list } = state;
            const { results, count } = payload;
            list = list.concat(results.map(i => i.name));
            return { ...state, list, total: count };
        default:
            return state;
    }
}