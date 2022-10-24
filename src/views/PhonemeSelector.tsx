import React from 'react';
import { Phoneme } from '../models/Phoneme';
import { PhonemeToggleButton } from './PhonemeToggleButton';

export type PhonemeSelection = {
    phoneme: Phoneme, 
    selected: boolean,
}

export type PhonemeSelectorProps = {
    title: string,
    count: number,
    phoneme_selections: PhonemeSelection[],
    display: boolean,
    selected_phonemes_updater: (phoneme_selections: PhonemeSelection[]) => void
}

export function PhonemeSelector(props: PhonemeSelectorProps): JSX.Element
{
    let [phoneme_selections, set_phoneme_selections] = React.useState(props.phoneme_selections)

    function update_selected_phoneme(phoneme: Phoneme, selected: boolean) {
        let new_list = phoneme_selections.map(phs => {
            if (phs.phoneme === phoneme) {
                return {
                    phoneme: phoneme,
                    selected: selected,
                }
            } 
            return phs
        })
        set_phoneme_selections(new_list)
    }

    React.useEffect(() => {
        props.selected_phonemes_updater(phoneme_selections)
    }, [phoneme_selections])

    if (props.display) {
        let phoneme_toggles = phoneme_selections.map(
            (ph_selection) => 
                <PhonemeToggleButton  
                    key={ ph_selection.phoneme } 
                    phoneme={ ph_selection.phoneme }
                    selected={ ph_selection.selected }
                    selection_updater={ update_selected_phoneme } />
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
