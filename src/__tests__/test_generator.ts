import { expect, test } from '@jest/globals'
import { generate, Generator } from '../models/Generator'

import { Template } from '../models/Template'
import { Voicing } from '../models/Voicing'


const temp_init: Template = {
    min: 1,
    max: 1,
    vowels: ["a"],
    consonants: ["b"],
    pattern: [Voicing.Vowel]
}

const temp_mid: Template = {
    min: 0,
    max: 2,
    vowels: ["e"],
    consonants: ["c"],
    pattern: [Voicing.Consonant]
}

const temp_final: Template = {
    min: 1,
    max: 1,
    vowels: ["i"],
    consonants: ["d"],
    pattern: [Voicing.Vowel]
}

test("Should generate one of: [ai, aci, acci]", () => {
    const gen: Generator = {
        templates: [temp_init, temp_mid, temp_final]
    }
    expect(['ai', 'aci', 'acci']).toContain(generate(gen))
})

