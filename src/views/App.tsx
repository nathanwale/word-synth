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
import { PhonemeSelection } from './PhonemeSelector'

function create_phoneme_selections(all: Phoneme[], selected: Phoneme[]): PhonemeSelection[]
{
    return all.map((ph) => ({
        phoneme: ph,
        selected: selected.includes(ph),
    }))
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
                simple_vowels={ create_phoneme_selections(Vowels.simple, simple_vowels) }
                complex_vowels={ create_phoneme_selections(Vowels.complex, complex_vowels) }
                simple_consonants={ create_phoneme_selections(Consonants.simple, simple_consonants) }
                complex_consonants={ create_phoneme_selections(Consonants.complex, complex_consonants) } 
                vowels_updater={ update_language_pool_vowels }
                consonants_updater={ update_language_pool_cons } />
            <div className='phonemes'>
                <WordSection 
                    title='Initial' 
                    vowels={ initial_vowels }
                    consonants={ create_phoneme_selections(lang_pool_cons, lang_pool_cons) } />
                <WordSection 
                    title='Middle' 
                    vowels={ create_phoneme_selections(lang_pool_vowels, lang_pool_vowels) }
                    consonants={ create_phoneme_selections(lang_pool_cons, lang_pool_cons) } />
                <WordSection 
                    title='Final' 
                    vowels={ create_phoneme_selections(lang_pool_vowels, lang_pool_vowels) }
                    consonants={ create_phoneme_selections(lang_pool_cons, lang_pool_cons) } />
            </div>
            <GeneratedWords generator={ generator } wordcount={ 100 } />
        </div>
    );
}

export default App;
