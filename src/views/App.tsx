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
    let generator: Generator.Generator = {
        templates: [temp_init, temp_mid, temp_final]
    }
    return (
        <div className="App">
            <header className="nameplate">
                WordSynth
            </header>
            <LanguagePool
                simple_vowels={ create_phoneme_selections(Vowels.simple, simple_vowels) }
                complex_vowels={ create_phoneme_selections(Vowels.complex, complex_vowels) }
                simple_consonants={ create_phoneme_selections(Consonants.simple, simple_consonants) }
                complex_consonants={ create_phoneme_selections(Consonants.complex, complex_consonants) } />
            <div className='phonemes'>
                <WordSection 
                    title='Initial' 
                    vowels={ create_phoneme_selections(temp_init.vowels, lang_vowels) }
                    consonants={ create_phoneme_selections(temp_init.consonants, Consonants.initial) } />
                <WordSection 
                    title='Middle' 
                    vowels={ create_phoneme_selections(temp_mid.vowels, lang_vowels) }
                    consonants={ create_phoneme_selections(temp_mid.consonants, lang_consonants) } />
                <WordSection 
                    title='Final' 
                    vowels={ create_phoneme_selections(temp_final.vowels, lang_vowels) }
                    consonants={ create_phoneme_selections(temp_final.consonants, Consonants.final) } />
            </div>
            <GeneratedWords generator={ generator } wordcount={ 100 } />
        </div>
    );
}

export default App;
