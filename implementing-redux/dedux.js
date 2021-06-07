export default {
  createStore,
  applyMiddleware,
}

function createStore(reducer) {

  if (typeof reducer !== 'function') {
    throw new Error('Reducer is of invalid')
  }
  
  let initialState = new Object(reducer())

  /** Store containing getState, dispatch, subscribe methods */
  const store = {}
  let state = initialState;
  const listeners = []

  /** Returns state */
  store.getState = () => state

  /** Dispatches state change actions*/
  store.dispatch = (action) => {

    if (typeof action.type !== 'string') {
      throw new Error('Action type is not string type')
    }

    state = reducer(state, action)
    listeners.forEach(listener => listener(state))
  }

  /** Subscribes to state changes and returns unsubscribe function */
  store.subscribe = (listener) => {

    listeners.push(listener)
    
    return () => {
      let listenerIndex = listeners.indexOf(listener)
      listeners.splice(listenerIndex, 1)
    }
  }

  return store
}

function applyMiddleware(store, middlewares) {
  let dispatch = store.dispatch
  middlewares.forEach(middleware => {
    dispatch = middleware(store)(dispatch)
  })
  store.dispatch = dispatch
  return store
}
