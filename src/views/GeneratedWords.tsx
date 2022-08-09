import React from 'react';
import * as Generator from  '../models/Generator';

type GeneratedWordsProps = {
    generator: Generator.Generator
}

type WordListProps = {
    words: string[],
    wordcount: number
}

function WordList(props: WordListProps)
{
    const list = props.words.slice(0, props.wordcount).map((w, i) => <li key={w+'-'+i}> { w } </li>)
    return (
        <ol>
            { list }
        </ol>
    )
}

export function GeneratedWords(props: GeneratedWordsProps)
{
    let [wordcount, set_wordcount] = React.useState(10)
    let [words, set_words] = React.useState(new_words())

    function update_wordcount(event: React.ChangeEvent<HTMLInputElement>) {
        set_wordcount(parseInt(event.target.value));
    }

    function update_words() {
        set_words(new_words())
    }

    function new_words() {
        return Generator.generate_many(props.generator, 100)
    }


    return (
        <div className='generated-words'>
            <p>Generate <strong>{wordcount}</strong> words</p>
            <button onClick={ update_words }>Regenerate</button>
            <input 
                type='range' min='1' max='50' 
                value={ wordcount }
                onChange={ update_wordcount } />
            <WordList words={ words } wordcount = { wordcount } />
        </div>
    )
}