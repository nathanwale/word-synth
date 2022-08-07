import * as Pattern from './Pattern'
import { Phoneme } from './Phoneme'
import * as Random from '../random'

/*
** Represents the parameters to generate part of a word
*/

export type Template = {
    min: number, 
    max: number, 
    pattern: Pattern.Pattern, 
    vowels: Phoneme[], 
    consonants: Phoneme[]
}

export function fill (template: Template): String
{
    const times = Random.randnum(template.min, template.max)
    let result = ""
    for (let i=0; i<times; i++) {
        result += Pattern.fill(template.pattern, template.vowels, template.consonants)
    }
    return result
}