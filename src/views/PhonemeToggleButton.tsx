import React from 'react'
import { Phoneme } from '../models/Phoneme';

type Props = {
    phoneme: Phoneme,
    selected: boolean,
    selection_updater: (phoneme: Phoneme, selected: boolean) => void,
}

export function PhonemeToggleButton(props: Props)
{
    const selection_updater = props.selection_updater
    const phoneme = props.phoneme
    const [selected, set_selected] = React.useState(props.selected)
    const class_name = `phoneme-toggle ${ selected ? 'selected' : 'unselected'}`

    function toggle_selected() {
        set_selected(!selected)
    }

    React.useEffect(() => {
        selection_updater(phoneme, selected)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected, phoneme])

    return (
        <button className={ class_name } onClick={ toggle_selected }>
            { phoneme }
        </button>
    )
}