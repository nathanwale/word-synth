import React from 'react';
import { PhonemeSelector, PhonemeSelection } from './PhonemeSelector';

export type PhonemePoolProps = {
    title: string,
    phoneme_selections: PhonemeSelection[],
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
    let [display_selector, set_display_selector] = React.useState(false)
    let [phoneme_selections, set_phoneme_selections] = React.useState(props.phoneme_selections)

    const buttons = phoneme_selections
        .filter(phs => phs.selected)
        .map((phs, i) => {
        return <PhonemeButton 
            label={phs.phoneme} 
            key={phs.phoneme+'-'+i} />
    })


    function update_phoneme_selection(phoneme_selections: PhonemeSelection[]) {
        set_phoneme_selections(phoneme_selections)
    }

    return (
        <div className='phoneme-pool'>
            <header>{ props.title }</header>
            <div className='buttons'>
                { buttons }
                <button 
                    className='toggle-display'
                    onClick={ () => set_display_selector(!display_selector) }>
                    ∓
                </button>
            </div>
            <PhonemeSelector 
                title={ props.title }
                phoneme_selections={ props.phoneme_selections }
                selected_phonemes_updater={ update_phoneme_selection }
                count={ 5 }
                display={ display_selector } />
        </div>
    )
}