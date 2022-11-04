import * as reducer from './reducer'
import * as context from './context'


/*
** List of words view
*/

type WordListProps = {
    words: string[]
}

function WordList({words}: WordListProps)
{
    const list = words.map((w, i) => <li key={w+'-'+i}> { w } </li>)
    return (
        <ol>
            { list }
        </ol>
    )
}


/*
** Generated words view
*/
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