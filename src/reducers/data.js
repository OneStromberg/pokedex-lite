import { POKE_LIST_LOADED, POKE_LOADED } from './../actions';

const initialState = {
  total: 0,
  list: [],
  pokes: {},
};

export default function data(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case POKE_LOADED:
      let { pokes } = state;
      const { name } = payload;
      pokes = { ...pokes, [name]: payload };
      return { ...state, pokes };
    case POKE_LIST_LOADED:
      let { list } = state;
      const { results, count } = payload;
      list = list.concat(results.map(i => i.name));
      return { ...state, list, total: count };
    default:
      return state;
  }
}

export const storedPokes = state => state.data.pokes;
export const storedPokesList = state => state.data.list;