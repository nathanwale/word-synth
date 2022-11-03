import React from 'react';
import { PhonemePool } from './PhonemePool';
import { PhonemeSelection } from '../models/PhonemeSelection'

export type State = {
    vowels: PhonemeSelection[],
    consonants: PhonemeSelection[],
}

// export enum Msg {
//     SelectVowels = "select vowels",
//     SelectConsonants = "select consonants",
// }

// type Action =
//     | [Msg.SelectVowels, PhonemeSelection[]]
//     | [Msg.SelectConsonants, PhonemeSelection[]]

// export function reducer(state: State, action: Action): State
// {
//     let [msg, payload] = action
//     console.log(`<${msg}>:`, payload)
//     state = {...state}
//     switch (msg) {
//         case Msg.SelectVowels:
//             state.vowels = payload as PhonemeSelection[]
//             break
//         case Msg.SelectConsonants:
//             state.consonants = payload as PhonemeSelection[]
//             break
//     }
//     return state
// }

export type WordSectionProps = {
    title: string,
    state: State,
    updated_vowels: (phs: PhonemeSelection[]) => void
    updated_consonants: (phs: PhonemeSelection[]) => void
}

export function WordSection(props: WordSectionProps)
{
    // let [state, dispatch] = React.useReducer(reducer, {...props.state})


    // function updater(phoneme_selections: PhonemeSelection[], phoneme: Phoneme, selected: boolean, msg: Msg) {
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
        <div className='word-section'>
            <header>{ props.title }</header>
            <PhonemePool 
                title='Vowels' 
                phoneme_selections={ props.state.vowels } 
                selected_phonemes_updater={ phs  => props.updated_vowels(props.state.vowels) } />
            <PhonemePool 
                title='Consonants' 
                phoneme_selections={ props.state.consonants } 
                selected_phonemes_updater={ phs  => props.updated_consonants(props.state.consonants) } />
        </div>
    )
}