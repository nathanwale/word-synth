import React from 'react';
import * as Vowels from '../defaults/vowels';
import * as Consonants from '../defaults/consonants';
import { Phoneme } from '../models/Phoneme';
import { PhonemePool } from './PhonemePool';
import { PhonemeSelector } from './PhonemeSelector';

export type LanguagePoolProps = {
    simple_vowels: Phoneme[],
    complex_vowels: Phoneme[], 
    simple_consonants: Phoneme[],
    complex_consonants: Phoneme[],
}

export function LanguagePool(props: LanguagePoolProps)
{

    return (
        <div className='language-pool'>
            <header>Language<br />Phonemes</header>
            <PhonemePool 
                title='Simple vowels' 
                available_phonemes={ Vowels.simple }
                selected_phonemes={ props.simple_vowels } />
            <PhonemePool 
                title='Complex vowels' 
                available_phonemes={ Vowels.complex }
                selected_phonemes={ props.complex_vowels } />
            <PhonemePool 
                title='Simple consonants' 
                available_phonemes={ Consonants.simple }
                selected_phonemes={ props.simple_consonants } />
            <PhonemePool 
                title='Complex consonants' 
                available_phonemes={ Consonants.complex }
                selected_phonemes={ props.complex_consonants } />
        </div>
    )
}