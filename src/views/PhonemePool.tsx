import React from 'react';
import { PhonemeSelector, PhonemeSelection } from './PhonemeSelector';

export type PhonemePoolProps = {
    title: string,
    phoneme_selections: PhonemeSelection[],
    selected_phonemes_updater: (phoneme_selections: PhonemeSelection[]) => void,
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
    let [phoneme_selections, set_phoneme_selections] = React.useState(props.phoneme_selections)

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

    React.useEffect(() => {
        props.selected_phonemes_updater(phoneme_selections)
    }, [phoneme_selections])

    function update_phoneme_selection(phoneme_selections: PhonemeSelection[]) {
        set_phoneme_selections(phoneme_selections)
    }

    return (
        <div className='phoneme-pool'>
            <header>{ props.title }</header>
            <div className='buttons'>
                { buttons }
            </div>
            <PhonemeSelector 
                title={ props.title }
                phoneme_selections={ props.phoneme_selections }
                selected_phonemes_updater={ update_phoneme_selection }
                count={ 5 } />
        </div>
    )
}