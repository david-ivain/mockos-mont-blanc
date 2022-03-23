import { createMemo, JSX, PropsWithChildren } from "solid-js";
import { useApps } from "../../Contexts/AppsContext";
import { MockApp } from "../../types";
import "./_appbar.scss";

function AppBar({ children }) {
    return (
        <div class="c-appbar">
            <AppBar.AppIcon appID="menu"></AppBar.AppIcon>
            <AppBar.Separator></AppBar.Separator>
            {children}
        </div>
    )
}

AppBar.Element = function ({ children }: PropsWithChildren) {
    return (
        <div class="c-appbar__element">
            {children}
        </div>
    )
}

AppBar.Group = function ({ children, expand = false }: PropsWithChildren<{ expand?: boolean }>) {
    let className = 'c-appbar__group';
    if (expand) className += ' c-appbar__group--expand';

    return (
        <div class={className}>
            {children}
        </div>
    )
}

AppBar.Separator = function () {
    return (
        <AppBar.Element>
            <div class="c-appbar__separator"></div>
        </AppBar.Element>
    )
}

interface AppIconProps {
    /**
     * The app object.
     */
    appID: string
}

AppBar.AppIcon = function ({ appID }: AppIconProps) {
    const appsContext = useApps();
    const apps = appsContext.apps,
        activeApps = appsContext.activeApps,
        open = appsContext.methods.open;
    let app = apps()[appID];

    const className = createMemo(() => {
        return `c-appbar__app-icon${activeApps().includes(appID) ? ' c-appbar__app-icon--active' : ''}`;
    });

    return (
        <AppBar.Element>
            <button class={className()} title={app.name} style={`color: ${app.iconColor}`} onClick={() => open(appID)}>
                {
                    typeof app.icon === 'string'
                        ? <img src={app.icon} alt={`${app.name} icon`} />
                        : app.icon
                }
            </button>
        </AppBar.Element>
    )
}

AppBar.SystemTray = function ({ children }: PropsWithChildren) {
    return (
        <AppBar.Element>
            <div class="c-appbar__systemtray">
                <div class="c-appbar__systemtray-icons">
                    {children}
                </div>
                <button class="c-appbar__systemtray-date">
                    3:00AM<br />
                    3/12/2022
                </button>
            </div>
        </AppBar.Element>
    )
}

AppBar.SystemTrayIcon = function ({ icon }: { icon: JSX.Element }) {
    return (
        <button class="c-appbar__systemtray-icon">
            {icon}
        </button>
    )
}

export default AppBar;