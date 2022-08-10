import * as Vowels from '../defaults/vowels'
import * as Consonants from '../defaults/consonants'
import * as Generator from '../models/Generator'
import { Template } from '../models/Template'
import * as Random from '../random'

import React from 'react';
import { GeneratedWords } from './GeneratedWords';
import './style/App.css';
import { WordSection } from './WordSection'

const lang_vowels = Random.take(Vowels.global, 10)

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
    consonants: Random.take(Consonants.middle, 15)
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
