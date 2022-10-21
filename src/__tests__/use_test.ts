import { expect, test } from '@jest/globals'
import * as Vowels from '../defaults/vowels'
import * as Consonants from '../defaults/consonants'
import * as Generator from '../models/Generator'
import { Template } from '../models/Template'
import { Voicing } from '../models/Voicing'
import * as Random from '../random'


const lang_vowels = Random.take(Vowels.simple, 10)



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

const generator: Generator.Generator = {
    templates: [temp_init, temp_mid, temp_final]
}

test("Generator doesn't produce empty strings", () => {
    const word = Generator.generate(generator, Voicing.Vowel)
    expect(word).not.toEqual("")
})