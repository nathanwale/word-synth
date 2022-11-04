import * as context from './context'
import * as Random from '../random'
import * as Vowels from '../defaults/vowels'
import * as Consonants from '../defaults/consonants'
import * as Generator from '../models/Generator'
import { Template } from '../models/Template'
import { PhonemeSelection, create_phoneme_selections, only_selected, selected_phonemes } from '../models/PhonemeSelection'
import { State as WordSectionGroupState } from './WordSectionGroup'


export function init_state(): context.State {
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

export function combine_phonemes(a: PhonemeSelection[], b: PhonemeSelection[]): PhonemeSelection[]
{
    return [...only_selected(a), ...only_selected(b)]
}

export function new_words(word_sections: WordSectionGroupState, wordcount: number): string[] {
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