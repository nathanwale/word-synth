import React from 'react';
import * as Generator from  '../models/Generator';

type GeneratedWordsProps = {
    generator: Generator.Generator,
    wordcount: number
}

type WordListProps = {
    words: string[]
}

function WordList(props: WordListProps)
{
    const list = props.words.map((w, i) => <li key={w+'-'+i}> { w } </li>)
    return (
        <ol>
            { list }
        </ol>
    )
}

export function GeneratedWords(props: GeneratedWordsProps)
{
    let [words, set_words] = React.useState(new_words())

    function update_words() {
        set_words(new_words())
    }

    function new_words() {
        return Generator.generate_many(props.generator, props.wordcount)
    }


    return (
        <div className='generated-words'>
            <button onClick={ update_words }>Regenerate</button>
            <WordList words={ words } />
        </div>
    )
}