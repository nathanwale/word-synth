import React, { PropsWithChildren } from 'react'
import { Action } from './reducer'
import * as init from './init'
import { reducer } from './reducer'
import * as state from './state'


/*
** State and Dispatch context consts
*/
export const StateContext = React.createContext<state.App | null>(null)
export const DispatchContext = React.createContext<React.Dispatch<Action> | null>(null)

export const StateProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        reducer,
        init.init_state()
    )

    return (
        <StateContext.Provider value={ state }>
            <DispatchContext.Provider value={ dispatch }>
                { children }
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export function useStateContext(): state.App {
    return React.useContext(StateContext)!
}

export function useDispatchContext(): React.Dispatch<Action> {
    return React.useContext(DispatchContext)!
}


