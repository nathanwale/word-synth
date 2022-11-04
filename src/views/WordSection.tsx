import { PhonemePool } from './PhonemePool';
import { PhonemeSelection } from '../models/PhonemeSelection'


/*
** Props
*/

export type WordSectionProps = {
    title: string,
    vowels: PhonemeSelection[],
    consonants: PhonemeSelection[],
    updated_vowels: (phs: PhonemeSelection[]) => void
    updated_consonants: (phs: PhonemeSelection[]) => void
}


/*
** Word Section View
*/

export function WordSection(props: WordSectionProps)
{
    return (
        <div className='word-section'>
            <header>{ props.title }</header>
            <PhonemePool 
                title='Vowels' 
                phoneme_selections={ props.vowels } 
                selected_phonemes_updater={ phs => props.updated_vowels(phs) } />
            <PhonemePool 
                title='Consonants' 
                phoneme_selections={ props.consonants } 
                selected_phonemes_updater={ phs => props.updated_consonants(phs) } />
        </div>
    )
}