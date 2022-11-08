export function Usage() {
    return (
        <div className="usage">
            <p className='intro'>
                Create random words for World building,
                RPGs or just for fun. Tune the settings
                to get the sort of language you want.
            </p>
            <ol>
                <li>Choose the vowels and consonants you want to see in your words.</li>
                <li>Choose which vowels and consonants you want at the start, middle or end of your words.</li>
                <li>Click <strong>regenerate</strong> to get a new set of words. Do this if you've changed the settings.</li>
            </ol>
            <p className='attribution'>
                Created by Nathan Wale with Typescript and React.
                My website is <a href='https://looploopbreak.netlify.app/'>Loop Loop Break.</a>
                You can see the code <a href="https://github.com/nathanwale/word-synth">on GitHub.</a>
            </p>
        </div>
    )
}