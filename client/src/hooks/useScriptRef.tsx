import { useEffect, useRef } from 'react'

const useScriptRef = () => {
    const scripted = useRef(true)

    useEffect(() => {
        scripted.current = true
    },[])

    return scripted
}

export default useScriptRef