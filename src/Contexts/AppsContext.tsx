import { Accessor, Context, createContext, createSignal, onMount, useContext } from "solid-js"
import Welcome from "../Components/Apps/Welcome";
import SVG from "../Components/SVG/SVG";
import { MockApp } from "../types";

const AppsContext: Context<{
    apps: Accessor<{ [name: string]: MockApp; }>;
    activeApps: Accessor<string[]>;
    activeWindow: Accessor<string>;
    methods: { focus(id: string): void; open(id: string): void; close(id: string): void; };
}> = createContext();

export function AppsProvider(props) {
    const [apps, setApps] = createSignal<{ [name: string]: MockApp }>({
        'menu': new MockApp({ name: 'Menu', icon: SVG.MenuIcon, iconColor: '#333', frameless: true, defaultPosition: { x: 8, y: 8, alignX: "left", alignY: "bottom" } }),
        'ex1': new MockApp({ name: 'Example 1', icon: SVG.GlobeIcon, iconColor: '#00BFFF', windowColor: '#009CCC', content: Welcome }),
        'ex2': new MockApp({ name: 'Example 2', icon: <SVG.MessageIcon fill={true}></SVG.MessageIcon>, iconColor: '#8FBC8F' }),
    }),
        [activeApps, setActiveApps] = createSignal<string[]>([]),
        [activeWindow, setActiveWindow] = createSignal<string>(),
        store = {
            apps,
            activeApps,
            activeWindow,
            methods: {
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
        };

    return (
        <AppsContext.Provider value={store}>
            {props.children}
        </AppsContext.Provider>
    );
}

export function useApps() { return useContext(AppsContext); }