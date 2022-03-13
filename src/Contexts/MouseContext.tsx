import { createContext, createSignal, onMount, useContext } from "solid-js"

/////

const MouseContext = createContext();

export function MouseProvider(props) {
    const [position, setPosition] = createSignal({ x: 0, y: 0 }),
        store = [
            position
        ];

    onMount(() => document.addEventListener('mousemove', e => setPosition({ x: e.pageX, y: e.pageY })));

    return (
        <MouseContext.Provider value={store}>
            {props.children}
        </MouseContext.Provider>
    );
}

export function useMouse() { return useContext(MouseContext); }