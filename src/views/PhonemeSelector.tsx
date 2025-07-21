import { Phoneme } from '../models/Phoneme';
import { PhonemeToggleButton } from './PhonemeToggleButton';
import { PhonemeSelection } from '../models/PhonemeSelection';
import { usePopup } from './hooks'; 
import { JSX } from 'react/jsx-runtime';


/*
** Props
*/

export type PhonemeSelectorProps = {
    title: string,
    count: number,
    phoneme_selections: PhonemeSelection[],
    selected_phonemes_updater: (phs: PhonemeSelection[]) => void
}


/*
** View
*/

export function PhonemeSelector(props: PhonemeSelectorProps): JSX.Element
{
    const [overlay_ref, displayed, set_displayed] = usePopup(false)
    const size_style = (props.phoneme_selections.length > 50 ? "large" : "small")

    function updater(phoneme: Phoneme, selected: boolean) {
        let new_list = props.phoneme_selections.map(phs => {
            if (phs.phoneme === phoneme) {
                return {
                    phoneme: phoneme,
                    selected: selected,
                }
            } 
            return phs
        })
        props.selected_phonemes_updater(new_list)
    }

    function close_display() {
        set_displayed(false)
    }

    function open_display() {
        set_displayed(true)
    }

    let container

    if (displayed) {
        let phoneme_toggles = props.phoneme_selections.map(
            (ph_selection) => 
                <PhonemeToggleButton  
                    key={ ph_selection.phoneme } 
                    phoneme={ ph_selection.phoneme }
                    selected={ ph_selection.selected }
                    selection_updater={ updater } />
        )
        container = (
            <div>
                <div ref={ overlay_ref }>
                <button 
                    className='toggle-display opened'
                    onClick={ close_display }>
                    select
                </button>
                </div>
                <div className={ `phoneme-selector ${size_style}` } ref={ overlay_ref }>
                    <header>{ props.title }</header>
                    { phoneme_toggles }
                </div>
            </div>
        )
    } else {
        container = <div>
            <button 
                className='toggle-display closed'
                onClick={ open_display }>
                select
            </button>
        </div>
    }
    
    return container
}
