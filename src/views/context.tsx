import React, { PropsWithChildren } from 'react'
import { State as LanguagePoolState } from './LanguagePool'
import { State as WordSectionGroupState } from './WordSectionGroup'
import { create_phoneme_selections } from '../models/PhonemeSelection'
import * as Vowels from '../defaults/vowels'
import * as Consonants from '../defaults/consonants'
import * as Random from '../random'
import { PhonemeSelection, only_selected, selected_phonemes } from '../models/PhonemeSelection'
import * as Generator from '../models/Generator'
import { Template } from '../models/Template'


/*
** State and Dispatch context consts
*/
export const StateContext = React.createContext<State | null>(null)
export const DispatchContext = React.createContext<React.Dispatch<Action> | null>(null)

export const StateProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = React.useReducer(
        reducer,
        init_state()
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
            state.generated_words = new_words(state.word_sections, wordcount)
            break
    }
    return state
}

export function init_state(): State {
    const generated_word_count = 50
    const simple_vowels = Random.take(Vowels.simple, 5)
    const complex_vowels = Random.take(Vowels.complex, 5)

    const simple_consonants = Random.take(Consonants.simple, 5)
    const complex_consonants = Random.take(Consonants.complex, 5)

    const language_pool = {
        vowels: {
            simple: create_phoneme_selections(Vowels.simple, simple_vowels),
            complex: create_phoneme_selections(Vowels.complex, complex_vowels),
        },
        consonants: {
            simple: create_phoneme_selections(Consonants.simple, simple_consonants),
            complex: create_phoneme_selections(Consonants.complex, complex_consonants),
        }
    }

    const combined_vowels = combine_phonemes(language_pool.vowels.simple, language_pool.vowels.complex) 
    const combined_consonants = combine_phonemes(language_pool.consonants.simple, language_pool.consonants.complex) 
    const word_sections = {
        initial: {
            vowels: combined_vowels, 
            consonants: combined_consonants
        },
        middle: {
            vowels: combined_vowels, 
            consonants: combined_consonants
        },
        final: {
            vowels: combined_vowels, 
            consonants: combined_consonants
        },
    }
        
    return {
        language_pool: language_pool,
        word_sections: word_sections,
        generated_words: new_words(word_sections, generated_word_count),
    }
}


function word_section_updater(
    old_state: WordSectionGroupState, phoneme_selections: PhonemeSelection[], 
    lang_pool: LanguagePoolState,
    voicing: "vowels" | "consonants", complexity: "simple" | "complex"): WordSectionGroupState
{
    const other_complexity = complexity === "complex" ? "simple" : "complex"
    const state = {...old_state}
    const combined = combine_phonemes(phoneme_selections, lang_pool[voicing][other_complexity])
    state.initial[voicing] = combined
    state.middle[voicing] = combined
    state.final[voicing] = combined
    return state    
}

function combine_phonemes(a: PhonemeSelection[], b: PhonemeSelection[]): PhonemeSelection[]
{
    return [...only_selected(a), ...only_selected(b)]
}

function new_words(word_sections: WordSectionGroupState, wordcount: number): string[] {
    const temp_init: Template = {
        min: 1,
        max: 1,
        vowels: take_random_phonemes(word_sections.initial.vowels, 7),
        consonants: take_random_phonemes(word_sections.initial.consonants, 15)
    }
    
    const temp_mid: Template = {
        min: 0,
        max: 2,
        vowels: take_random_phonemes(word_sections.middle.vowels, 7),
        consonants: take_random_phonemes(word_sections.middle.consonants, 15)
    }
    
    const temp_final: Template = {
        min: 1,
        max: 1,
        vowels: take_random_phonemes(word_sections.final.vowels, 7),
        consonants: take_random_phonemes(word_sections.final.consonants, 15)
    }

    let generator: Generator.Generator = {
        templates: [temp_init, temp_mid, temp_final]
    }

    return Generator.generate_many(generator, wordcount)
}

function take_random_phonemes(phs: PhonemeSelection[], count: number): string[]
{
    const phons = selected_phonemes(phs)
    return Random.take(phons, count)
}