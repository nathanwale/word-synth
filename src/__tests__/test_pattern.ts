import { expect, test } from '@jest/globals'

import { fill } from '../models/Pattern'
import { Voicing } from '../models/Voicing'

const vowels = ["a", "oo"]
const consonants = ["b", "th"]

test('Empty pattern returns empty string', () => {
    const pattern: Voicing[] = []
    expect(fill(pattern, vowels, consonants)).toEqual("")
})

test('Pattern [V] should be "a" or "oo"', () => {
    const pattern = [Voicing.Vowel]

    expect(["a", "oo"]).toContain(fill(pattern, vowels, consonants))
})

test('Pattern [C] should be "b" or "th"', () => {
    const pattern = [Voicing.Consonant]

    expect(["b", "th"]).toContain(fill(pattern, vowels, consonants))
})

test('Pattern [VC] should be one of [ab, ath, oob, ooth]', () => {
    const pattern = [Voicing.Vowel, Voicing.Consonant]
    expect(['ab', 'ath', 'oob', 'ooth']).toContain(fill(pattern, vowels, consonants))
})

test('Pattern [CV] should be one of [ba, tha, boo, thoo]', () => {
    const pattern = [Voicing.Vowel, Voicing.Consonant]
    expect(['ab', 'ath', 'oob', 'ooth']).toContain(fill(pattern, vowels, consonants))
})

test('Pattern [VCV] should be one of [aba, atha, aboo, athoo, ooba, ootha, ooboo, oothoo]', () => {
    const pattern = [Voicing.Vowel, Voicing.Consonant, Voicing.Vowel]
    expect(['aba', 'atha', 'aboo', 'athoo', 'ooba', 'ootha', 'ooboo', 'oothoo']).toContain(fill(pattern, vowels, consonants))
})