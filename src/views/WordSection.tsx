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
    return (
        <div className='word-section'>
            <header>{ props.title }</header>
            <PhonemePool 
                title='Vowels' 
                phoneme_selections={ props.vowels } />
            <PhonemePool 
                title='Consonants' 
                phoneme_selections={ props.consonants } />
        </div>
    )
}