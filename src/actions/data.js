import { bindActionCreators } from 'redux';
import { Action, LOAD_POKE} from '.'
import store from './../store';

export default bindActionCreators({
    loadPoke: (limit = 10, offset = 10) => Action(LOAD_POKE, {offset, limit}),
}, store.dispatch);