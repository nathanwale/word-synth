import * as Vowels from '../defaults/vowels'
import * as Consonants from '../defaults/consonants'
import * as Generator from '../models/Generator'
import { Template } from '../models/Template'
import * as Random from '../random'

import React from 'react';
import { GeneratedWords } from './GeneratedWords';
import './style/App.scss';
import { LanguagePool, State as LanguagePoolState } from './LanguagePool'
import { Phoneme } from '../models/Phoneme'
import { create_phoneme_selections } from '../models/PhonemeSelection'
import { WordSections, State as WordSectionsState } from './WordSections'

export type State = {
    language_pool: LanguagePoolState,
    word_sections: WordSectionsState,
    generated_words: string[],
}

export enum Msg {
    UpdateLanguagePool = "update language pool",
    UpdateWordSections = "update word sections",
    GenerateWords = "generate words",
}

type Action =
    | [Msg.UpdateLanguagePool, LanguagePoolState]
    | [Msg.UpdateWordSections, WordSectionsState]
    | [Msg.GenerateWords, []]

export function reducer(state: State, action: Action): State
{
    let [msg, payload] = action
    console.log(`<${msg}>:`, payload)
    switch (msg) {
        case Msg.UpdateLanguagePool:
            payload = payload as LanguagePoolState
            return {
                ...state,
                word_sections: {
                    initial: {
                        vowels: [...payload.vowels.simple, ...payload.vowels.complex],
                        consonants: [...payload.consonants.simple, ...payload.consonants.complex],
                    },
                    middle: {
                        vowels: [...payload.vowels.simple, ...payload.vowels.complex],
                        consonants: [...payload.consonants.simple, ...payload.consonants.complex],
                    },
                    final: {
                        vowels: [...payload.vowels.simple, ...payload.vowels.complex],
                        consonants: [...payload.consonants.simple, ...payload.consonants.complex],
                    },
                }
            }
        case Msg.UpdateWordSections:
            return {
                ...state,
                word_sections: payload as WordSectionsState
            }
        case Msg.GenerateWords:
            return {
                ...state,
                generated_words: payload as string[]
            }
    }
    throw new Error(`Message <${msg}> not handled`)
}


const simple_vowels = Random.take(Vowels.simple, 5)
const complex_vowels = Random.take(Vowels.complex, 5)
const lang_vowels = simple_vowels.concat(complex_vowels)

const simple_consonants = Random.take(Consonants.simple, 5)
const complex_consonants = Random.take(Consonants.complex, 5)
const lang_consonants = simple_consonants.concat(complex_vowels)

const temp_init: Template = {
    min: 1,
    max: 1,
    vowels: Random.take(lang_vowels, 7),
    consonants: Random.take(Consonants.initial, 15)
}

const temp_mid: Template = {
    min: 0,
    max: 2,
    vowels: Random.take(lang_vowels, 7),
    consonants: Random.take(lang_consonants, 15)
}

const temp_final: Template = {
    min: 1,
    max: 1,
    vowels: Random.take(lang_vowels, 7),
    consonants: Random.take(Consonants.final, 15)
}

function init_state(): State {
    let s = {
        language_pool: {
            vowels: {
                simple: create_phoneme_selections(Vowels.simple, simple_vowels),
                complex: create_phoneme_selections(Vowels.complex, complex_vowels),
            },
            consonants: {
                simple: create_phoneme_selections(Consonants.simple, simple_consonants),
                complex: create_phoneme_selections(Consonants.complex, complex_consonants),
            }
        },
        word_sections: {
            initial: {vowels: [], consonants: []},
            middle: {vowels: [], consonants: []},
            final: {vowels: [], consonants: []},
        },
        generated_words: []
    }

    console.log("init state:", s)
    return s
}


function App() 
{

    let [state, dispatch] = React.useReducer(reducer, init_state())
    let Context = React.createContext(null)
    let [lang_pool_vowels, set_lang_pool_vowels] = React.useState(lang_vowels)
    let [lang_pool_cons, set_lang_pool_cons] = React.useState(lang_consonants)
    let [initial_vowels, set_initial_vowels] = React.useState(create_phoneme_selections(lang_pool_vowels, lang_pool_vowels))

    let generator: Generator.Generator = {
        templates: [temp_init, temp_mid, temp_final]
    }

    function update_language_pool_vowels(vowels: Phoneme[]) {
        set_lang_pool_vowels(vowels)
        console.log(`<App> new vowels: ${vowels}`)
    }

    function update_language_pool_cons(cons: Phoneme[]) {
        set_lang_pool_cons(cons)
        console.log(`<App> new cons: ${cons}`)
    }

    React.useEffect(() => {
        set_initial_vowels(() => create_phoneme_selections(lang_pool_vowels, lang_pool_vowels))
        console.log(`<App> new initial_vowels: ${lang_pool_vowels}`)
    }, [lang_pool_vowels])

    React.useEffect(() => {
        console.log(`<App> state updated`, state)
    }, [state])

    return (
        <div className="App">
            <header className="nameplate">
                WordSynth
            </header>
            <LanguagePool
                state={ state.language_pool }
                updated={ state => dispatch([Msg.UpdateLanguagePool, state])} />
            <WordSections
                state={ state.word_sections }
                updated={ state => dispatch([Msg.UpdateWordSections, state])}
                />
            <GeneratedWords generator={ generator } wordcount={ 100 } />
        </div>
    );
}

export default App;
