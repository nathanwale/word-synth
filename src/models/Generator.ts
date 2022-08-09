import * as Random from '../random'
import * as Template from './Template'
import { Voicing } from './Voicing'
/*
** Represents a word generated from the system
*/
export type Word = string

/*
** Represents the initial parameters to generate a word
*/
export type Generator = { 
    templates: Template.Template[]
}

export function generate(generator: Generator, start_voicing: Voicing): Word
{
    let next_voicing = start_voicing
    return generator.templates.map(
        (t) => {
            let template_result: Template.TemplateResult = Template.fill(t, next_voicing)
            next_voicing = template_result.next_voicing
            return template_result.text
        }).join('')
}

export function generate_many(generator: Generator, n: number): Word[]
{
    let words = []
    for (let i = 0; i < n; i++) {
        words.push(generate(generator, Random.pick([Voicing.Consonant, Voicing.Vowel])))
    }
    return words
}