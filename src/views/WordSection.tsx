import React from 'react';
import { PhonemePool } from './PhonemePool';
import { PhonemeSelection } from './PhonemeSelector'

export type WordSectionProps = {
    title: string,
    vowels: PhonemeSelection[],
    consonants: PhonemeSelection[],
}

export function WordSection(props: WordSectionProps)
{
    // selected_phonemes_updater: (phoneme_selections: PhonemeSelection[]) => void
    function update_vowels(new_phoneme_selections: PhonemeSelection[]) {

    }

    function update_consonants(new_phoneme_selections: PhonemeSelection[]) {

    }

    return (
        <div className='word-section'>
            <header>{ props.title }</header>
            <PhonemePool 
                title='Vowels' 
                phoneme_selections={ props.vowels } 
                selected_phonemes_updater={ update_vowels } />
            <PhonemePool 
                title='Consonants' 
                phoneme_selections={ props.consonants } 
                selected_phonemes_updater={ update_consonants } />
        </div>
    )
}