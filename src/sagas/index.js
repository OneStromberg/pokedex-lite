import { call, fork, put, select, takeEvery } from 'redux-saga/effects';
import { storedPokes, storedPokesList } from '../reducers/data';
import { message } from 'antd';
import * as Actions from '../actions';
import Api from '../api';
import * as Storage from '../storage';

const { Action } = Actions;

function* getPokeList({ payload: { limit, offset } }) {
  const pokeList = yield select(storedPokesList);
  var result = null;
  
  try {
    result = yield call(Api.getPokemonsList, { limit, offset: pokeList.length });
  } catch(err) {
    message.error('Catched error at `getPokeList`:', err);
  } finally {
    yield put(Action(Actions.POKE_LIST_LOADED, result));
  }
}

function* savePoke({ payload: name }) {
  if (name) {
    yield call(Storage.savePoke, name);
  }
}

function* getPoke({ payload: name }) {
  if (name) {
    const pokes = yield select(storedPokes);
    const poke = pokes[name];
    var result = null;
    if (!poke) {
      try {
        result = yield call(Api.getPokemonByName, name);
      } catch (err) {
        message.error('Catched error at `getPoke`:', err);
      }
      yield put(Action(Actions.POKE_LOADED, result));
    }
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
