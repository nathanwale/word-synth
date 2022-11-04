import * as reducer from './reducer'
import * as context from './context'

type GeneratedWordsProps = {
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
    const words = context.useStateContext().generated_words
    const dispatch = context.useDispatchContext()

    


    return (
        <div className='generated-words'>
            <button onClick={ () => dispatch([reducer.Msg.GenerateWords, props.wordcount]) }>Regenerate</button>
            <WordList words={ words } />
        </div>
    )
}