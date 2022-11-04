import { WordSection, State as WordSectionState } from './WordSection';
import * as context from './context'
import { Msg } from './reducer'


/*
** State
*/

export type State = {
    initial: WordSectionState,
    middle: WordSectionState,
    final: WordSectionState,
}


/*
** View
*/

export function WordSectionGroup()
{
    let state = context.useStateContext().word_sections
    let dispatch = context.useDispatchContext()

    return (
        <div className='phonemes'>
            <WordSection 
                title='Initial'
                vowels={ state.initial.vowels }
                consonants={ state.initial.consonants }
                updated_vowels={ phs => dispatch([Msg.UpdatedInitialVowels, phs]) }
                updated_consonants={ phs => dispatch([Msg.UpdatedInitialConsonants, phs]) } />
            <WordSection 
                title='Middle' 
                vowels={ state.middle.vowels }
                consonants={ state.middle.consonants }
                updated_vowels={ phs => dispatch([Msg.UpdatedMiddleVowels, phs]) }
                updated_consonants={ phs => dispatch([Msg.UpdatedMiddleConsonants, phs]) } />
            <WordSection 
                title='Final' 
                vowels={ state.final.vowels }
                consonants={ state.final.consonants }
                updated_vowels={ phs => dispatch([Msg.UpdatedFinalVowels, phs]) }
                updated_consonants={ phs => dispatch([Msg.UpdatedFinalConsonants, phs]) } />
        </div>
    )
}