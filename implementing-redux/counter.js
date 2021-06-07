import Dedux from './dedux.js'
const { createStore } = Dedux


export const increaseAction = () => {
    return { type: "increase" }
}
  
export const decreaseAction = () => {
    return { type: "decrease" }
}
  
const reducer = (state, action = {}) => {
  switch (action.type) {
    case "increase":
      return { ...state, count: state.count + 1, };
    case "decrease":
      return { ...state, count: state.count - 1, };
    default:
      return state;
  }
}

const store = createStore(reducer)

export default store