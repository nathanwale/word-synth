import React from 'react';
import { Phoneme } from '../models/Phoneme';
import { PhonemePool } from './PhonemePool';

export type WordSectionProps = {
    title: string,
    vowels: Phoneme[],
    consonants: Phoneme[],
}

export function WordSection(props: WordSectionProps)
{
    return (
        <div className='word-section'>
            <header>{ props.title }</header>
            <PhonemePool title='Vowels' phonemes={ props.vowels } />
            <PhonemePool title='Consonants' phonemes={ props.consonants } />
        </div>
    )
}