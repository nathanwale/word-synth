import React from 'react';
import * as Vowels from '../defaults/vowels';
import * as Consonants from '../defaults/consonants';
import { Phoneme } from '../models/Phoneme';
import { PhonemePool } from './PhonemePool';
import { PhonemeSelector, PhonemeSelection } from './PhonemeSelector';

export type LanguagePoolProps = {
    simple_vowels: PhonemeSelection[],
    complex_vowels: PhonemeSelection[], 
    simple_consonants: PhonemeSelection[],
    complex_consonants: PhonemeSelection[],
}

export function LanguagePool(props: LanguagePoolProps)
{

    return (
        <div className='language-pool'>
            <header>Language<br />Phonemes</header>
            <PhonemePool 
                title='Simple vowels' 
                phoneme_selections={ props.simple_vowels } />
            <PhonemePool 
                title='Complex vowels' 
                phoneme_selections={ props.complex_vowels } />
            <PhonemePool 
                title='Simple consonants' 
                phoneme_selections={ props.simple_consonants } />
            <PhonemePool 
                title='Complex consonants' 
                phoneme_selections={ props.complex_consonants } />
        </div>
    )
}