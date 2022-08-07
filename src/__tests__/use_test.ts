import { expect, test } from '@jest/globals'
import * as Vowels from '../defaults/vowels'
import * as Consonants from '../defaults/consonants'
import * as Generator from '../models/Generator'
import { Template } from '../models/Template'
import { Voicing } from '../models/Voicing'
import * as Random from '../random'


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

const generator: Generator.Generator = {
    templates: [temp_init, temp_mid, temp_final]
}

test("Generator doesn't produce empty strings", () => {
    const word = Generator.generate(generator)
    expect(word).not.toEqual("")
})