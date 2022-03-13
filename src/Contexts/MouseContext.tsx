import { createContext, createSignal, onMount, useContext } from "solid-js"

/////

const MouseContext = createContext();

export function MouseProvider(props) {
    const [position, setPosition] = createSignal({ x: 0, y: 0 }),
        [touchPosition, setTouchPosition] = createSignal({ x: 0, y: 0 }),
        store = [
            position,
            touchPosition
        ];

    onMount(() => {
        document.addEventListener('mousemove', e => setPosition({ x: e.pageX, y: e.pageY }));
        document.addEventListener('touchstart', e => setTouchPosition({ x: e.touches[0].pageX, y: e.touches[0].pageY }));
        document.addEventListener('touchmove', e => setTouchPosition({ x: e.touches[0].pageX, y: e.touches[0].pageY }));
    });

    return (
        <MouseContext.Provider value={store}>
            {props.children}
        </MouseContext.Provider>
    );
}

export function useMouse() { return useContext(MouseContext); }