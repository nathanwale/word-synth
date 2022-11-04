
import { GeneratedWords } from './GeneratedWords';
import './style/App.scss';
import { LanguagePool, State as LanguagePoolState } from './LanguagePool'
import { WordSectionGroup, State as WordSectionGroupState } from './WordSectionGroup'
import * as context from './context'

/*
** State
*/

export type State = {
    language_pool: LanguagePoolState,
    word_sections: WordSectionGroupState,
    generated_words: {
        words: string[],
        count: number,
    }
}


/*
** View
*/

function App() 
{
    return (
        <context.StateProvider>
            <div className="App">
                <header className="nameplate">
                    WordSynth
                </header>
                <LanguagePool />
                <WordSectionGroup />
                <GeneratedWords />
            </div>
        </context.StateProvider>
    );
}

export default App;
