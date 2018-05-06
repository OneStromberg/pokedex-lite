import ls from 'local-storage';

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
  ls.set(POKE, stringedPoke);
}

export function getPokes() {
  return JSON.parse(ls.get(POKE));
}