import React from 'react';
import * as Consonants from '../defaults/consonants'
import * as Vowels from '../defaults/vowels'
import { Phoneme } from '../models/Phoneme';

export type PhonemePoolProps = {
    title: string,
    phonemes: Phoneme[]
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
    const buttons = props.phonemes.map((ph, i) => <PhonemeButton label={ph} key={ph+'-'+i} />)
    return (
        <div className='phoneme-pool'>
            <header>{ props.title }</header>
            <div className='buttons'>
                { buttons }
            </div>
        </div>
    )
}