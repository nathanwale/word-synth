import React from 'react';
import { WordSection, State as WordSectionState } from './WordSection';
import * as context from './context'

export type State = {
    initial: WordSectionState,
    middle: WordSectionState,
    final: WordSectionState,
}

// export enum Msg {
//     UpdatedInitial = "updated initial word section",
//     UpdatedMiddle = "updated middle word section",
//     UpdatedFinal = "updated final word section",
// }

// type Action =
//     | [Msg.UpdatedInitial, WordSectionState]
//     | [Msg.UpdatedMiddle, WordSectionState]
//     | [Msg.UpdatedFinal, WordSectionState]

// export function reducer(state: State, action: Action): State
// {
//     let [msg, payload] = action
//     console.log(`<${msg}>:`, payload)
//     state = {...state}
//     switch (msg) {
//         case Msg.UpdatedInitial:
//             state.initial = payload as WordSectionState
//             break
//         case Msg.UpdatedMiddle:
//             state.middle = payload as WordSectionState
//             break
//         case Msg.UpdatedFinal:
//             state.final = payload as WordSectionState
//             break
//     }
//     return state
// }

export type WordSectionGroupProps = {
    state: State,
}



export function WordSectionGroup(props: WordSectionGroupProps)
{
    // let [state, dispatch] = React.useReducer(reducer, {...props.state})
    let state = context.useStateContext().word_sections
    let dispatch = context.useDispatchContext()

    // React.useEffect(() => {
    //     console.log("Raising state from <WordSections>")
    // }, [state])

    // React.useEffect(() => {

    // })

    return (
        <div className='phonemes'>
            <WordSection 
                title='Initial'
                state={ state.initial }
                updated_vowels={ phs => dispatch([context.Msg.UpdatedInitialVowels, phs]) }
                updated_consonants={ phs => dispatch([context.Msg.UpdatedInitialConsonants, phs]) } />
            <WordSection 
                title='Middle' 
                state={ state.middle }
                updated_vowels={ phs => dispatch([context.Msg.UpdatedMiddleVowels, phs]) }
                updated_consonants={ phs => dispatch([context.Msg.UpdatedMiddleConsonants, phs]) } />
            <WordSection 
                title='Final' 
                state={ state.final }
                updated_vowels={ phs => dispatch([context.Msg.UpdatedFinalVowels, phs]) }
                updated_consonants={ phs => dispatch([context.Msg.UpdatedFinalConsonants, phs]) } />
        </div>
    )
}