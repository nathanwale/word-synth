import React from 'react';
import { PhonemePool } from './PhonemePool';
import { PhonemeSelection, selected_phonemes } from './PhonemeSelector';
import { Phoneme } from '../models/Phoneme'

export type LanguagePoolProps = {
    simple_vowels: PhonemeSelection[],
    complex_vowels: PhonemeSelection[], 
    simple_consonants: PhonemeSelection[],
    complex_consonants: PhonemeSelection[],
    vowels_updater: (vowels: Phoneme[]) => void,
    consonants_updater: (vowels: Phoneme[]) => void,
}



export function LanguagePool(props: LanguagePoolProps)
{
    function concat_phoneme_selections(phs1: PhonemeSelection[], phs2: PhonemeSelection[]): Phoneme[] {
        return selected_phonemes(phs1)
            .concat(selected_phonemes(phs2))
    }

    function update_simple_vowels(new_phoneme_selections: PhonemeSelection[]) {
        let new_phons = selected_phonemes(new_phoneme_selections)
        props.vowels_updater(new_phons)
        console.log(`<LanguagePool> new simple vowels: ${new_phons}`)
    }

    function update_complex_vowels(new_phoneme_selections: PhonemeSelection[]) {
        let new_phons = selected_phonemes(new_phoneme_selections)
        props.vowels_updater(new_phons)
        console.log(`<LanguagePool> new complex vowels: ${new_phons}`)
    }

    function update_simple_consonants(new_phoneme_selections: PhonemeSelection[]) {
        let new_phons = selected_phonemes(new_phoneme_selections)
        props.vowels_updater(new_phons)
        console.log(`<LanguagePool> new simple cons: ${new_phons}`)
    }   

    function update_complex_consonants(new_phoneme_selections: PhonemeSelection[]) {
        let new_phons = selected_phonemes(new_phoneme_selections)
        props.vowels_updater(new_phons)
        console.log(`<LanguagePool> new complex cons: ${new_phons}`)
    }

    return (
        <div className='language-pool'>
            <header>Language<br />Phonemes</header>
            <PhonemePool 
                title='Simple vowels' 
                phoneme_selections={ props.simple_vowels } 
                selected_phonemes_updater={ update_simple_vowels } />
            <PhonemePool 
                title='Complex vowels' 
                phoneme_selections={ props.complex_vowels }
                selected_phonemes_updater={ update_complex_vowels }  />
            <PhonemePool 
                title='Simple consonants' 
                phoneme_selections={ props.simple_consonants }
                selected_phonemes_updater={ update_simple_consonants }  />
            <PhonemePool 
                title='Complex consonants' 
                phoneme_selections={ props.complex_consonants }
                selected_phonemes_updater={ update_complex_consonants }  />
        </div>
    )
}