import * as Pattern from './Pattern'
import { Phoneme } from './Phoneme'
import * as Random from '../random'
import { Voicing } from './Voicing'

/*
** Represents the parameters to generate part of a word
*/

export type Template = {
    min: number, 
    max: number
    vowels: Phoneme[], 
    consonants: Phoneme[]
}

export type TemplateResult = {
    text: string,
    next_voicing: Voicing
}

export function fill (template: Template, start_voicing: Voicing): TemplateResult
{
    const times = Random.randnum(template.min, template.max)
    let result = ""
    let next_voicing = start_voicing
    for (let i=0; i<times; i++) {
        if (next_voicing === Voicing.Vowel) {
            result += Random.pick(template.vowels)
            next_voicing = Voicing.Consonant
        } else {
            result += Random.pick(template.consonants)
            next_voicing = Voicing.Vowel
        }
        
    }
    return { text: result, next_voicing: next_voicing }
}