import React, { PropsWithChildren } from 'react'
import { State as LanguagePoolState } from './LanguagePool'
import { State as WordSectionGroupState } from './WordSectionGroup'
import { PhonemeSelection } from '../models/PhonemeSelection'
import * as init from './init'


/*
** State and Dispatch context consts
*/
export const StateContext = React.createContext<State | null>(null)
export const DispatchContext = React.createContext<React.Dispatch<Action> | null>(null)

export const StateProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        reducer,
        init.init_state()
    )

    return (
        <StateContext.Provider value={ state }>
            <DispatchContext.Provider value={ dispatch }>
                { children }
            </DispatchContext.Provider>
        </StateContext.Provider>
    )
}

export function useStateContext(): State {
    return React.useContext(StateContext)!
}

export function useDispatchContext(): React.Dispatch<Action> {
    return React.useContext(DispatchContext)!
}

/*
** State
*/

export type State = {
    language_pool: LanguagePoolState,
    word_sections: WordSectionGroupState,
    generated_words: string[],
}

/*
** Messages
*/

export enum Msg {
    GenerateWords = "generate words",
    SelectLangSimpleVowels = "select lang simple vowels",
    SelectLangComplexVowels = "select lang complex vowels",
    SelectLangSimpleConsonants = "select lang simple consonants",
    SelectLangComplexConsonants = "select lang complex consonants",
    UpdatedInitialVowels = "updated initial word vowels",
    UpdatedInitialConsonants = "updated initial word consonants",
    UpdatedMiddleVowels = "updated middle word vowels",
    UpdatedMiddleConsonants = "updated middle word consonants",
    UpdatedFinalVowels = "updated final word vowels",
    UpdatedFinalConsonants = "updated final word consonants",
}

/*
** Messages
*/

type Action =
    | [Msg.SelectLangSimpleVowels, PhonemeSelection[]]
    | [Msg.SelectLangComplexVowels, PhonemeSelection[]]
    | [Msg.SelectLangSimpleConsonants, PhonemeSelection[]]
    | [Msg.SelectLangComplexConsonants, PhonemeSelection[]]
    | [Msg.UpdatedInitialVowels, PhonemeSelection[]]
    | [Msg.UpdatedInitialConsonants, PhonemeSelection[]]
    | [Msg.UpdatedMiddleVowels, PhonemeSelection[]]
    | [Msg.UpdatedMiddleConsonants, PhonemeSelection[]]
    | [Msg.UpdatedFinalVowels, PhonemeSelection[]]
    | [Msg.UpdatedFinalConsonants, PhonemeSelection[]]
    | [Msg.GenerateWords, number]


/*
** Reducer
*/

export function reducer(new_state: State, action: Action): State
{
    const [msg, payload]: [Msg, PhonemeSelection[] | number] = action
    let state = {...new_state}
    console.log(`<${msg}>:`, payload)
    switch (msg) {
        case Msg.SelectLangSimpleVowels:
            state.language_pool.vowels.simple = payload as PhonemeSelection[]
            state.word_sections = word_section_updater(state.word_sections, payload as PhonemeSelection[], state.language_pool,"vowels", "simple")
            break
        case Msg.SelectLangComplexVowels:
            state.language_pool.vowels.complex = payload as PhonemeSelection[]
            state.word_sections = word_section_updater(state.word_sections, payload as PhonemeSelection[], state.language_pool, "vowels", "complex")
            break
        case Msg.SelectLangSimpleConsonants:
            state.language_pool.consonants.simple = payload as PhonemeSelection[]
            state.word_sections = word_section_updater(state.word_sections, payload as PhonemeSelection[], state.language_pool, "consonants", "simple")
            break
        case Msg.SelectLangComplexConsonants:
            state.language_pool.consonants.complex = payload as PhonemeSelection[]
            state.word_sections = word_section_updater(state.word_sections, payload as PhonemeSelection[], state.language_pool, "consonants", "complex")
            break
        case Msg.UpdatedInitialVowels:
            state.word_sections.initial.vowels = payload as PhonemeSelection[]
            break
        case Msg.UpdatedInitialConsonants:
            state.word_sections.initial.consonants = payload as PhonemeSelection[]
            break
        case Msg.UpdatedMiddleVowels:
            state.word_sections.middle.vowels = payload as PhonemeSelection[]
            break
        case Msg.UpdatedMiddleConsonants:
            state.word_sections.middle.consonants = payload as PhonemeSelection[]
            break
        case Msg.UpdatedFinalVowels:
            state.word_sections.final.vowels = payload as PhonemeSelection[]
            break
        case Msg.UpdatedFinalConsonants:
            state.word_sections.final.consonants = payload as PhonemeSelection[]
            break
        case Msg.GenerateWords:
            let wordcount = payload as number
            state.generated_words = init.new_words(state.word_sections, wordcount)
            break
    }
    return state
}

function word_section_updater(
    old_state: WordSectionGroupState, phoneme_selections: PhonemeSelection[], 
    lang_pool: LanguagePoolState,
    voicing: "vowels" | "consonants", complexity: "simple" | "complex"): WordSectionGroupState
{
    const other_complexity = complexity === "complex" ? "simple" : "complex"
    const state = {...old_state}
    const combined = init.combine_phonemes(phoneme_selections, lang_pool[voicing][other_complexity])
    state.initial[voicing] = combined
    state.middle[voicing] = combined
    state.final[voicing] = combined
    return state    
}