import React from 'react';
import { Phoneme } from '../models/Phoneme';

type Props = {
    phoneme: Phoneme,
    selected: boolean,
}

export function PhonemeToggleButton(props: Props)
{
    let class_name = `phoneme-toggle ${ props.selected ? 'selected' : 'unselected'}`
    return (
        <button className={ class_name }>
            { props.phoneme }
        </button>
    )
}