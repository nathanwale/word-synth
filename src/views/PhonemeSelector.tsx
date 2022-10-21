import React from 'react';
import { Phoneme } from '../models/Phoneme';
import { PhonemeToggleButton } from './PhonemeToggleButton';

export type PhonemeSelectorProps = {
    title: string,
    count: number,
    available_phonemes: Phoneme[],
    selected_phonemes: Phoneme[],
    display: boolean
}

export function PhonemeSelector(props: PhonemeSelectorProps): JSX.Element
{
    if (props.display) {
        let phoneme_toggles = props.available_phonemes.map(
            (ph) => 
                <PhonemeToggleButton  
                    key={ ph } phoneme={ ph }
                    selected={ props.selected_phonemes.includes(ph) } />
        )
        return (
            <div className='phoneme-selector'>
                <header>{ props.title }</header>
                { phoneme_toggles }
            </div>
        )
    } else {
        return <></>
    }
}
