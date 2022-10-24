import React from 'react'
import { Phoneme } from '../models/Phoneme';

type Props = {
    phoneme: Phoneme,
    selected: boolean,
    selection_updater: (phoneme: Phoneme, selected: boolean) => void,
}

export function PhonemeToggleButton(props: Props)
{
    let [selected, set_selected] = React.useState(props.selected)
    let class_name = `phoneme-toggle ${ selected ? 'selected' : 'unselected'}`

    function toggle_selected() {
        set_selected(!selected)
    }

    React.useEffect(() => {
        props.selection_updater(props.phoneme, selected)
    }, [props, selected])

    return (
        <button className={ class_name } onClick={ toggle_selected }>
            { props.phoneme }
        </button>
    )
}