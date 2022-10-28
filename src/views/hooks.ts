import React, { Dispatch, SetStateAction } from 'react'

/*
** Hook used for pop up components
**     takes `initial_visibillity`: `true` or `false` specifies whether popup is shown by default
*/
export function usePopup(initial_visibility: boolean): 
    [React.RefObject<HTMLDivElement>, 
     boolean, 
     Dispatch<SetStateAction<boolean>>]
{
    const [visibility, set_visibility] = React.useState(initial_visibility)
    const ref = React.useRef<HTMLDivElement>(null)

    function click_outside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
            set_visibility(false)
        }
    }

    React.useEffect(() => {
        document.addEventListener('click', click_outside, true)
        return () => document.removeEventListener('click', click_outside, true)
    }, [])
    return [ref, visibility, set_visibility]
}