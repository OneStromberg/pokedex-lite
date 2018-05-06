import { bindActionCreators } from 'redux';
import { Action, LOAD_POKE_LIST, LOAD_POKE} from '.'
import store from './../store';

export default bindActionCreators({
    loadPokeList: (limit = 10, offset = 10) => Action(LOAD_POKE_LIST, {offset, limit}),
    loadPoke: (name) => Action(LOAD_POKE, name),
}, store.dispatch);