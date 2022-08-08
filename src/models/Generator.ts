import * as Template from './Template'
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

export function generate(generator: Generator): Word
{
    return generator.templates.map(
        (t) => Template.fill(t)).join("")
}

export function generate_many(generator: Generator, n: number): Word[]
{
    let words = []
    for (let i = 0; i < n; i++) {
        words.push(generate(generator))
    }
    return words
}