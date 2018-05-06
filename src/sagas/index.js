import { call, fork, all, put, select, takeEvery, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as Actions from '../actions';
import Api from '../api';

const { Action } = Actions;

function* init() {
}

function* onUserDownload({ payload }) {
	const { limit, offset } = payload;
	const result = yield call(Api.getPokemonsList, { limit, offset });
	yield put(Action(Actions.POKE_LOADED, result));
}

export default function* root() {
	yield fork(init);
	yield takeEvery(Actions.LOAD_POKE, onUserDownload);
}