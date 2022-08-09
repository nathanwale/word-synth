import { expect, test } from '@jest/globals'
import { generate, generate_many, Generator } from '../models/Generator'

import { Template } from '../models/Template'
import { Voicing } from '../models/Voicing'


const temp_init: Template = {
    min: 1,
    max: 1,
    vowels: ["a"],
    consonants: ["b"]
}

const temp_mid: Template = {
    min: 0,
    max: 2,
    vowels: ["e"],
    consonants: ["c"]
}

const temp_final: Template = {
    min: 1,
    max: 1,
    vowels: ["i"],
    consonants: ["d"]
}

test("Should generate one of: [ab, aci, aced]", () => {
    const gen: Generator = {
        templates: [temp_init, temp_mid, temp_final]
    }
    expect(['ab', 'aci', 'aced']).toContain(generate(gen, Voicing.Vowel))
})

test("generate_many(gen, 10) should produce an array of length 10", () => {
    const gen: Generator = {
        templates: [temp_init, temp_mid, temp_final]
    }
    const words = generate_many(gen, 10)
    expect(words).toHaveLength(10)
})

