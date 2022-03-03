import React, {createContext, useReducer} from 'react'
import {textState, textReducer, commentTriggerReducer, commentTriggerState} from "./genericReducer"

const ReduceReducers =(...reducers) => (prevState, value, ...args) =>
  reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState
  )

const CombinedReducers = ReduceReducers(
  textReducer, commentTriggerReducer
)

const InitialState={
  ...textState,
  ...commentTriggerState,
}

const store = createContext({})

const {Provider} = store

const StateProvider = ({children}) => {
  const [state, dispatch] = useReducer(CombinedReducers,InitialState)

  return <Provider value={{state, dispatch}}>{children}</Provider>
}

export {store, StateProvider}
