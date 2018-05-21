import ls from 'local-storage';
import { message } from 'antd';
const POKE = 'ls_saved_poke'

export function savePoke(name) {
  let stringedPoke = ls.get(POKE);
  if (stringedPoke) {
    let saved = JSON.parse(stringedPoke);
    let index = saved.indexOf(name);
    if (index === -1) {
      saved.push(name);
    } else {
      saved.splice(index, 1);
    }
    stringedPoke = JSON.stringify(saved);
  } else {
    stringedPoke = JSON.stringify([name]);
  }
  try {
    ls.set(POKE, stringedPoke);
  } catch (e) {
    message.error('Error while saving to store');
  }
}

export function getPokes() {
  var pokes = null;
  try {
    pokes = JSON.parse(ls.get(POKE));
  } catch {
    message.error('Error while loading from storage');
  }

  return pokes;
}