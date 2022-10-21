import React from 'react';
import * as Consonants from '../defaults/consonants'
import * as Vowels from '../defaults/vowels'
import { Phoneme } from '../models/Phoneme';
import { PhonemeSelector } from './PhonemeSelector';

export type PhonemePoolProps = {
    title: string,
    available_phonemes: Phoneme[],
    selected_phonemes: Phoneme[],
}

type PhonemeButtonProps = {
    label: string,
    key: React.Key
}

function PhonemeButton(props: PhonemeButtonProps)
{
    return (
        <button>{ props.label }</button>
    )
}

export function PhonemePool(props: PhonemePoolProps)
{
    const buttons = props.selected_phonemes.map((ph, i) => <PhonemeButton label={ph} key={ph+'-'+i} />)
    let [display_selector, set_display_selector] = React.useState(false)
    return (
        <div className='phoneme-pool'>
            <header>{ props.title }</header>
            <div className='buttons'>
                { buttons }
                <button 
                    className='toggle-display'
                    onClick={ () => set_display_selector(!display_selector) }>
                    ⋯
                </button>
            </div>
            <PhonemeSelector 
                title={ props.title }
                available_phonemes={ props.available_phonemes }
                selected_phonemes={ props.selected_phonemes }
                count={ 5 }
                display={ display_selector } />
        </div>
    )
}