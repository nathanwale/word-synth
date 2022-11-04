import React from 'react';
import { PhonemePool } from './PhonemePool';
import { PhonemeSelection } from '../models/PhonemeSelection'

/*
** State
*/

export type State = {
    vowels: PhonemeSelection[],
    consonants: PhonemeSelection[],
}


/*
** Props
*/

export type WordSectionProps = {
    title: string,
    state: State,
    updated_vowels: (phs: PhonemeSelection[]) => void
    updated_consonants: (phs: PhonemeSelection[]) => void
}


/*
** View
*/

export function WordSection(props: WordSectionProps)
{
    return (
        <div className='word-section'>
            <header>{ props.title }</header>
            <PhonemePool 
                title='Vowels' 
                phoneme_selections={ props.state.vowels } 
                selected_phonemes_updater={ phs => props.updated_vowels(phs) } />
            <PhonemePool 
                title='Consonants' 
                phoneme_selections={ props.state.consonants } 
                selected_phonemes_updater={ phs => props.updated_consonants(phs) } />
        </div>
    )
}