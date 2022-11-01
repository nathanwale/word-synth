import * as Vowels from '../defaults/vowels'
import * as Consonants from '../defaults/consonants'
import * as Generator from '../models/Generator'
import { Template } from '../models/Template'
import * as Random from '../random'

import React from 'react';
import { GeneratedWords } from './GeneratedWords';
import './style/App.scss';
import { WordSection } from './WordSection'
import { LanguagePool } from './LanguagePool'
import { Phoneme } from '../models/Phoneme'
import { PhonemeSelection, create_phoneme_selections } from '../models/PhonemeSelection'


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

function App() 
{
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
