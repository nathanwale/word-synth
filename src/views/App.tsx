
import { GeneratedWords } from './GeneratedWords';
import './style/App.scss';
import { LanguagePool } from './LanguagePool'
import { WordSectionGroup } from './WordSectionGroup'
import { Usage } from './Usage'
import * as context from './context'


/*
** Root App View
*/

function App() 
{
    return (
        <context.StateProvider>
            <div className="App">
                <header className="nameplate">
                    <h1>
                        WordSynth
                    </h1>
                    <Usage />
                </header>
                <LanguagePool />
                <WordSectionGroup />
                <GeneratedWords />
            </div>
        </context.StateProvider>
    );
}

export default App;
