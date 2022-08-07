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
        consonants: consonants,
        pattern: [Voicing.Vowel]
    }
    expect(fill(template)).toEqual("")
})

test('Template with min & max = 3 should be aaa', () => {
    const template: Template = {
        min: 3,
        max: 3,
        vowels: vowels,
        consonants: consonants,
        pattern: [Voicing.Vowel]
    }
    expect(fill(template)).toEqual("aaa")
})

test('Template with min=2 & max=3 should be aa or aaa', () => {
    const template: Template = {
        min: 2,
        max: 3,
        vowels: vowels,
        consonants: consonants,
        pattern: [Voicing.Vowel]
    }
    expect(["aa", "aaa"]).toContain(fill(template))
})

test('Template with pattern VC and min=2 & max=3 should be abab or ababab', () => {
    const template: Template = {
        min: 2,
        max: 3,
        vowels: vowels,
        consonants: consonants,
        pattern: [Voicing.Vowel, Voicing.Consonant]
    }
    expect(["abab", "ababab"]).toContain(fill(template))
})
