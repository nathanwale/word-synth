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
    consonants: Random.take(Consonants.complex, 15)
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
                simple_vowels={ simple_vowels }
                complex_vowels={ complex_vowels }
                simple_consonants={ simple_consonants}
                complex_consonants={ complex_consonants} />
            <div className='phonemes'>
                <WordSection 
                    title='Initial' 
                    vowels={ temp_init.vowels }
                    consonants={ temp_init.consonants } />
                <WordSection 
                    title='Middle' 
                    vowels={ temp_mid.vowels }
                    consonants={ temp_mid.consonants } />
                <WordSection 
                    title='Final' 
                    vowels={ temp_final.vowels }
                    consonants={ temp_final.consonants } />
            </div>
            <GeneratedWords generator={ generator } />
        </div>
    );
}

export default App;
