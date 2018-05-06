import { call, fork, all, put, select, takeEvery, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as Actions from '../actions';
import Api from '../api';

function* init() {
}

export default function* root() {
	yield fork(init);
}