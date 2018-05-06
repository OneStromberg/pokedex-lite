import { call, fork, all, put, select, takeEvery, take } from 'redux-saga/effects';
import { storedPokes, storedPokesList } from '../reducers/data';
import { eventChannel } from 'redux-saga';
import * as Actions from '../actions';
import Api from '../api';
import * as Storage from '../storage';

const { Action } = Actions;

function* getPokeList({ payload: { limit, offset } }) {
  const pokeList = yield select(storedPokesList);
  const result = yield call(Api.getPokemonsList, { limit, offset: pokeList.length });
  yield put(Action(Actions.POKE_LIST_LOADED, result));
}

function* savePoke({ payload: name }) {
  yield call(Storage.savePoke, name);
}

function* getPoke({ payload: name }) {
  const pokes = yield select(storedPokes);
  const poke = pokes[name];
  if (!poke) {
    const result = yield call(Api.getPokemonByName, name);
    yield put(Action(Actions.POKE_LOADED, result));
  }
}
function* init() {
  let savedPokes = yield call(Storage.getPokes);
  yield put(Action(Actions.POKE_LOADED_FROM_STORAGE, savedPokes));
}

export default function* root() {
  yield fork(init);
  yield takeEvery(Actions.LOAD_POKE_LIST, getPokeList);
  yield takeEvery(Actions.LOAD_POKE, getPoke);
  yield takeEvery(Actions.SAVE_POKE, savePoke);
}
