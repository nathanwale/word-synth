import * as Vowels from '../defaults/vowels'
import * as Consonants from '../defaults/consonants'
import * as Generator from '../models/Generator'
import { Template } from '../models/Template'
import { Voicing } from '../models/Voicing'
import * as Random from '../random'

import React from 'react';
import { GeneratedWords } from './GeneratedWords';
import './style/App.css';

const lang_vowels = Random.take(Vowels.global, 10)
const lang_consonants = Random.take(Consonants.global, 20)

const temp_init: Template = {
    min: 1,
    max: 1,
    vowels: Random.take(lang_vowels, 7),
    consonants: Random.take(lang_consonants, 15),
    pattern: [Voicing.Vowel, Voicing.Consonant]
}

const temp_mid: Template = {
    min: 0,
    max: 2,
    vowels: Random.take(lang_vowels, 7),
    consonants: Random.take(lang_consonants, 15),
    pattern: [Voicing.Vowel, Voicing.Consonant]
}

const temp_final: Template = {
    min: 1,
    max: 1,
    vowels: Random.take(lang_vowels, 7),
    consonants: Random.take(lang_consonants, 15),
    pattern: [Voicing.Vowel, Voicing.Consonant]
}

function App() 
{
    let generator: Generator.Generator = {
        templates: [temp_init, temp_mid, temp_final]
    }
    return (
        <div className="App">
            <header className="App-header">
                WordSynth
            </header>
            <GeneratedWords generator={ generator } />
        </div>
    );
}

export default App;
