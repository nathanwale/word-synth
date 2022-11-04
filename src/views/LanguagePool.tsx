import { PhonemePool } from './PhonemePool';
import { PhonemeSelection } from '../models/PhonemeSelection'
import * as context from './context'
import { Msg } from './reducer'

/*
** State
*/

export type State = {
    vowels: {
        simple: PhonemeSelection[],
        complex: PhonemeSelection[],
    },
    consonants: {
        simple: PhonemeSelection[],
        complex: PhonemeSelection[],
    },
}


/*
** View
*/

export function LanguagePool()
{
    let state = context.useStateContext().language_pool
    let dispatch = context.useDispatchContext()

    return (
        <div className='language-pool'>
            <header>Language<br />Phonemes</header>
            <PhonemePool 
                title='Simple vowels' 
                phoneme_selections={ state.vowels.simple } 
                selected_phonemes_updater={ phs => dispatch([Msg.SelectLangSimpleVowels, phs]) } />
            <PhonemePool 
                title='Complex vowels' 
                phoneme_selections={ state.vowels.complex }
                selected_phonemes_updater={ phs => dispatch([Msg.SelectLangComplexVowels, phs]) } />
            <PhonemePool 
                title='Simple consonants' 
                phoneme_selections={ state.consonants.simple }
                selected_phonemes_updater={ phs => dispatch([Msg.SelectLangSimpleConsonants, phs]) } />
            <PhonemePool 
                title='Complex consonants' 
                phoneme_selections={ state.consonants.complex }
                selected_phonemes_updater={ phs => dispatch([Msg.SelectLangComplexConsonants, phs]) } />
        </div>
    )
}