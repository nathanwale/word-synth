import React from 'react';
import { PhonemePool } from './PhonemePool';
import { PhonemeSelection } from '../models/PhonemeSelection'
import { Phoneme } from '../models/Phoneme';
import * as context from './context'

export type State = {
    vowels: {
        simple: PhonemeSelection[],
        complex: PhonemeSelection[],
    },
    consonants: {
        simple: PhonemeSelection[],
        complex: PhonemeSelection[],
    },
}

// export enum Msg {
//     SelectSimpleVowels = "select simple vowels",
//     SelectComplexVowels = "select complex vowels",
//     SelectSimpleConsonants = "select simple consonants",
//     SelectComplexConsonants = "select complex consonants",
// }

// type Action =
//     | [Msg.SelectSimpleVowels, PhonemeSelection[]]
//     | [Msg.SelectComplexVowels, PhonemeSelection[]]
//     | [Msg.SelectSimpleConsonants, PhonemeSelection[]]
//     | [Msg.SelectComplexConsonants, PhonemeSelection[]]

// export function reducer(state: State, action: Action): State
// {
//     let [msg, payload] = action
//     console.log(`<${msg}>:`, payload)
//     state = {...state}
//     switch (msg) {
//         case Msg.SelectSimpleVowels:
//             state.vowels.simple = payload as PhonemeSelection[]
//             break
//         case Msg.SelectComplexVowels:
//             state.vowels.complex = payload as PhonemeSelection[]
//             break
//         case Msg.SelectSimpleConsonants:
//             state.consonants.simple = payload as PhonemeSelection[]
//             break
//         case Msg.SelectComplexConsonants:
//             state.consonants.complex = payload as PhonemeSelection[]
//             break
//     }
//     return state
// }

export type LanguagePoolProps = {
    state: State,
}



export function LanguagePool(props: LanguagePoolProps)
{
    // let [state, dispatch] = React.useReducer(reducer, props.state)
    let state = context.useStateContext().language_pool
    let dispatch = context.useDispatchContext()

    // React.useEffect(() => {
    //     console.log("Raising state from <LanguagePool>", state)
    //     props.updated(state)
    // }, [state])

    // function updater(phoneme_selections: PhonemeSelection[], phoneme: Phoneme, selected: boolean, msg: context.Msg) {
    //     let new_list = phoneme_selections.map(phs => {
    //         if (phs.phoneme === phoneme) {
    //             return {
    //                 phoneme: phoneme,
    //                 selected: selected,
    //             }
    //         } 
    //         return phs
    //     })
    //     dispatch([msg, new_list])
    // }

    return (
        <div className='language-pool'>
            <header>Language<br />Phonemes</header>
            <PhonemePool 
                title='Simple vowels' 
                phoneme_selections={ state.vowels.simple } 
                selected_phonemes_updater={ phs => dispatch([context.Msg.SelectLangSimpleVowels, phs]) } />
            <PhonemePool 
                title='Complex vowels' 
                phoneme_selections={ state.vowels.complex }
                selected_phonemes_updater={ phs => dispatch([context.Msg.SelectLangComplexVowels, phs]) } />
            <PhonemePool 
                title='Simple consonants' 
                phoneme_selections={ state.consonants.simple }
                selected_phonemes_updater={ phs => dispatch([context.Msg.SelectLangSimpleConsonants, phs]) } />
            <PhonemePool 
                title='Complex consonants' 
                phoneme_selections={ state.consonants.complex }
                selected_phonemes_updater={ phs => dispatch([context.Msg.SelectLangComplexConsonants, phs]) } />
        </div>
    )
}