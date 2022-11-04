import React from 'react'
import { PhonemeSelector } from './PhonemeSelector'
import { PhonemeSelection } from '../models/PhonemeSelection'


/*
** Props
*/

export type PhonemePoolProps = {
    title: string,
    phoneme_selections: PhonemeSelection[],
    selected_phonemes_updater: (phs: PhonemeSelection[]) => void,
}

type PhonemeButtonProps = {
    label: string,
    key: React.Key
}

/*
** Individual buttons
*/

function PhonemeButton(props: PhonemeButtonProps)
{
    return (
        <button>{ props.label }</button>
    )
}

export function PhonemePool(props: PhonemePoolProps)
{
   let phoneme_selections = [...props.phoneme_selections]
    phoneme_selections.sort(
        (a, b) => {
            if (a.phoneme > b.phoneme) {
                return 1
            } else if (a.phoneme < b.phoneme) {
                return -1
            } else {
                return 0
            }
        }
    )
    const buttons = phoneme_selections
        .filter(phs => phs.selected)
        .map((phs, i) => {
        return <PhonemeButton 
            label={phs.phoneme} 
            key={phs.phoneme+'-'+i} />
    })

    return (
        <div className='phoneme-pool'>
            <header>{ props.title }</header>
            <div className='buttons'>
                { buttons }
            </div>
            <PhonemeSelector 
                title={ props.title }
                phoneme_selections={ phoneme_selections }
                selected_phonemes_updater={ props.selected_phonemes_updater }
                count={ 5 } />
        </div>
    )
}