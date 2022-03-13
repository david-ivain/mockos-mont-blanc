import { createContext, createSignal, onMount, useContext } from "solid-js"
import SVG from "../Components/SVG/SVG";
import { MockApp } from "../types";

const AppsContext = createContext();

export function AppsProvider(props) {
    const [apps, setApps] = createSignal<{ [name: string]: MockApp }>({
        'menu': { name: 'Menu', icon: SVG.MenuIcon, iconColor: '#333' },
        'ex1': { name: 'Example 1', icon: SVG.GlobeIcon, iconColor: '#00BFFF' },
        'ex2': { name: 'Example 2', icon: <SVG.MessageIcon fill={true}></SVG.MessageIcon>, iconColor: '#8FBC8F' }
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