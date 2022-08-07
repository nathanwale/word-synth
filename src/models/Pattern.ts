import { Voicing } from './Voicing'
import { Phoneme } from './Phoneme'
import * as Random from '../random'

/*
** Patterns to generate parts of words
*/

export type Pattern = Voicing[]

/*
** Fill out the pattern given a list of vowels and consonants
*/
export function fill(pattern: Pattern, vowels: Phoneme[], consonants: Phoneme[]): String
{
    return pattern.map(
        (voicing) => {
            if (voicing === Voicing.Vowel) {
                return Random.pick(vowels)
            } else {
                return Random.pick(consonants)
            }
        }).join("")
}