import { Accessor, Context, createContext, createSignal, onMount, useContext } from "solid-js"

const WindowContext: Context<{ bodySize: Accessor<{ x: number; y: number; }>; }> = createContext();

export function WindowProvider(props) {
    const [bodySize, setBodySize] = createSignal({ x: document.body.offsetWidth, y: document.body.offsetHeight }),
        store = {
            bodySize,
        };

    onMount(() => {
        window.addEventListener('resize', e => setBodySize({ x: document.body.offsetWidth, y: document.body.offsetHeight }));
    });

    return (
        <WindowContext.Provider value={store}>
            {props.children}
        </WindowContext.Provider>
    );
}

export function useWindow() { return useContext(WindowContext); }