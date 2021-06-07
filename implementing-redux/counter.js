import Dedux from './dedux.js'
const { createStore } = Dedux

const INITIAL_STATE = {
  count: 0
}

export const upAction = () => {
  return { type: 'up' }
}
  
export const downAction = () => {
  return { type: 'down' }
}

export const resetAction = () => {
  return { type: 'reset'}
}
  
const reducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case 'up':
      return { ...state, count: state.count + 1, };
    case 'down':
      return { ...state, count: state.count - 1, };
    case 'reset':
      return { ...state, count: 0 };
    default:
      return state;
  }
}

const store = createStore(reducer)

store.subscribe((state) =>{
  document.getElementById('count').innerHTML = state.count
})
document.getElementById('up').addEventListener('click', () => {store.dispatch(upAction())})
document.getElementById('down').addEventListener('click', () => {store.dispatch(downAction())})
document.getElementById('reset').addEventListener('click', () => {store.dispatch(resetAction())})