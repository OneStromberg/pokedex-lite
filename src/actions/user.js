import { bindActionCreators } from 'redux';
import { Action, SAVE_POKE } from '.'
import store from './../store';

export default bindActionCreators({
    savePoke: (name) => Action(SAVE_POKE, name),
}, store.dispatch);