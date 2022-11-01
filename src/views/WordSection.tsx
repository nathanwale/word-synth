import React from 'react';
import { PhonemePool } from './PhonemePool';
import { PhonemeSelection } from '../models/PhonemeSelection'

export type State = {
    vowels: PhonemeSelection[],
    consonants: PhonemeSelection[],
}

export enum Msg {
    SelectVowels = "select vowels",
    SelectConsonants = "select consonants",
}

type Action =
    | [Msg.SelectVowels, PhonemeSelection[]]
    | [Msg.SelectConsonants, PhonemeSelection[]]

export function reducer(state: State, action: Action): State
{
    let [msg, payload] = action
    console.log(`<${msg}>:`, payload)
    state = {...state}
    switch (msg) {
        case Msg.SelectVowels:
            state.vowels = payload as PhonemeSelection[]
            break
        case Msg.SelectConsonants:
            state.consonants = payload as PhonemeSelection[]
            break
    }
    return state
}

export type WordSectionProps = {
    title: string,
    state: State,
    updated: (s: State) => void,
}

export function WordSection(props: WordSectionProps)
{
    let [state, dispatch] = React.useReducer(reducer, {...props.state})

    React.useEffect(() => {
        console.log("Raising state from <WordSection>", props.state)
    }, [state])

    return (
        <div className='word-section'>
            <header>{ props.title }</header>
            <PhonemePool 
                title='Vowels' 
                phoneme_selections={ props.state.vowels } 
                selected_phonemes_updater={ state => dispatch([Msg.SelectVowels, state]) } />
            <PhonemePool 
                title='Consonants' 
                phoneme_selections={ props.state.consonants } 
                selected_phonemes_updater={ state => dispatch([Msg.SelectConsonants, state]) } />
        </div>
    )
}