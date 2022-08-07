import * as Template from './Template'
/*
** Represents a word generated from the system
*/
export type Word = String

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