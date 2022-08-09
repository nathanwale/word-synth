import { expect, test } from '@jest/globals'

import { fill, Template } from '../models/Template'
import { Voicing } from '../models/Voicing'

const vowels = ["a"]
const consonants = ["b"]

test('Empty template returns empty string', () => {
    const template: Template = {
        min: 0,
        max: 0,
        vowels: vowels,
        consonants: consonants
    }
    expect(fill(template, Voicing.Vowel).text).toEqual("")
})

test('Template with min & max = 3, starting with vowel, should be "aba"', () => {
    const template: Template = {
        min: 3,
        max: 3,
        vowels: vowels,
        consonants: consonants
    }
    expect(fill(template, Voicing.Vowel).text).toEqual("aba")
})

test('Template with min & max = 3, starting with consonant, should be "bab"', () => {
    const template: Template = {
        min: 3,
        max: 3,
        vowels: vowels,
        consonants: consonants
    }
    expect(fill(template, Voicing.Consonant).text).toEqual("bab")
})

test('Template with min=2 & max=3 should be ab or aba', () => {
    const template: Template = {
        min: 2,
        max: 3,
        vowels: vowels,
        consonants: consonants
    }
    expect(["ab", "aba"]).toContain(fill(template, Voicing.Vowel).text)
})

