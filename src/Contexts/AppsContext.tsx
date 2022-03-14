import { createContext, createSignal, onMount, useContext } from "solid-js"
import SVG from "../Components/SVG/SVG";
import { MockApp } from "../types";

const AppsContext = createContext();

export function AppsProvider(props) {
    const [apps, setApps] = createSignal<{ [name: string]: MockApp }>({
        'menu': new MockApp('Menu', SVG.MenuIcon, '#333'),
        'ex1': new MockApp('Example 1', SVG.GlobeIcon, '#00BFFF', '#009CCC'),
        'ex2': new MockApp('Example 2', <SVG.MessageIcon fill={true}></SVG.MessageIcon>, '#8FBC8F'),
    }),
        [activeApps, setActiveApps] = createSignal<string[]>([]),
        [activeWindow, setActiveWindow] = createSignal<string>(),
        store = [
            apps,
            activeApps,
            activeWindow,
            {
                focus(id: string) {
                    setActiveWindow(id);
                },
                open(id: string) {
                    if (!activeApps().includes(id)) {
                        setActiveApps([...activeApps(), id]);
                    }
                    setActiveWindow(id);
                },
                close(id: string) {
                    if (activeApps().includes(id)) setActiveApps(activeApps().filter(a => a !== id));
                }
            }
        ];

    return (
        <AppsContext.Provider value={store}>
            {props.children}
        </AppsContext.Provider>
    );
}

export function useApps() { return useContext(AppsContext); }