import * as reducer from './reducer'
import * as context from './context'


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

export function GeneratedWords()
{
    const {words, count} = context.useStateContext().generated_words
    const dispatch = context.useDispatchContext()

    


    return (
        <div className='generated-words'>
            <button onClick={ () => dispatch([reducer.Msg.GenerateWords, count]) }>Regenerate</button>
            <WordList words={ words } />
        </div>
    )
}