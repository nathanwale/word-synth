import { PhonemeSelection } from "../models/PhonemeSelection"


/*
** App
*/

export type App = {
    language_pool: LanguagePool,
    word_sections: WordSectionGroup,
    generated_words: GenerateWords
}


/*
** Language pool
*/

export type LanguagePool = {
    vowels: {
        simple: PhonemeSelection[],
        complex: PhonemeSelection[],
    },
    consonants: {
        simple: PhonemeSelection[],
        complex: PhonemeSelection[],
    },
}


/*
** Word Section Group
*/

export type WordSectionGroup = {
    initial: WordSection,
    middle: WordSection,
    final: WordSection,
}


/*
** Word section
*/

export type WordSection = {
    vowels: PhonemeSelection[],
    consonants: PhonemeSelection[],
}


/*
** Generated words
*/

export type GenerateWords = {
    words: string[],
    count: number,
}

