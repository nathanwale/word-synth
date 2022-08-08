import React from 'react';
import * as Generator from  '../models/Generator';

type GeneratedWordsProps = {
    generator: Generator.Generator
}

type WordListProps = {
    words: string[]
}

function WordList(props: WordListProps)
{
    const list = props.words.map((w) => <li key={w}> { w } </li>)
    return (
        <ol>
            { list }
        </ol>
    )
}

export function GeneratedWords(props: GeneratedWordsProps)
{
    let [wordcount, set_wordcount] = React.useState(10)
    let [words, set_words] = React.useState([""])

    function update_wordcount(event: React.ChangeEvent<HTMLInputElement>) {
        set_wordcount((_prev) => parseInt(event.target.value));
    }

    React.useEffect(() => {
        set_words(Generator.generate_many(props.generator, wordcount))
    }, [props.generator, wordcount])

    return (
        <div className='generated-words'>
            <p>Generate <strong>{wordcount}</strong> words</p>
            <input 
                type='range' min='1' max='50' 
                value={ wordcount }
                onChange={ update_wordcount } />
            <WordList words={ words } />
        </div>
    )
}