import React from 'react'

/*
** Hook used for pop up components
**     takes `initial_visibillity`: `true` or `false` specifies whether popup is shown by default
*/
export function usePopup(initial_visibility: boolean): 
    [React.RefObject<HTMLDivElement>,
     boolean, 
     (b: boolean) => void]
{
    const [visibility, set_visibility] = React.useState(initial_visibility)
    const overlay_ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        function click_outside(event: MouseEvent) {
            if (overlay_ref.current 
                && !overlay_ref.current.contains(event.target as HTMLElement)) {
                set_visibility(false)
            }
        }
        document.addEventListener('click', click_outside, true)
        return () => document.removeEventListener('click', click_outside, true)
    }, [visibility])

    return [overlay_ref, visibility, set_visibility]
}