import React from 'react';
import { WordSection, State as WordSectionState } from './WordSection';

export type State = {
    initial: WordSectionState,
    middle: WordSectionState,
    final: WordSectionState,
}

export enum Msg {
    UpdatedInitial = "updated initial word section",
    UpdatedMiddle = "updated middle word section",
    UpdatedFinal = "updated final word section",
}

type Action =
    | [Msg.UpdatedInitial, WordSectionState]
    | [Msg.UpdatedMiddle, WordSectionState]
    | [Msg.UpdatedFinal, WordSectionState]

export function reducer(state: State, action: Action): State
{
    let [msg, payload] = action
    console.log(`<${msg}>:`, payload)
    state = {...state}
    switch (msg) {
        case Msg.UpdatedInitial:
            state.initial = payload as WordSectionState
            break
        case Msg.UpdatedMiddle:
            state.middle = payload as WordSectionState
            break
        case Msg.UpdatedFinal:
            state.final = payload as WordSectionState
            break
    }
    return state
}

export type WordSectionsProps = {
    state: State,
    updated: (s: State) => void
}



export function WordSections(props: WordSectionsProps)
{
    let [state, dispatch] = React.useReducer(reducer, props.state)

    React.useEffect(() => {
        console.log("Raising state from <WordSections>")
    }, [state])

    return (
        <div className='phonemes'>
            <WordSection 
                title='Initial'
                state={ props.state.initial }
                updated={ state => dispatch([Msg.UpdatedInitial, state]) } />
            <WordSection 
                title='Middle' 
                state={ props.state.middle }
                updated={ state => dispatch([Msg.UpdatedMiddle, state]) } />
            <WordSection 
                title='Final' 
                state={ props.state.final }
                updated={ state => dispatch([Msg.UpdatedFinal, state]) } />
        </div>
    )
}