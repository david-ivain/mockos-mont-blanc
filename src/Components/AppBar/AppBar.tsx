import { JSX, PropsWithChildren } from "solid-js";
import { MockApp } from "../../types";
import "./_appbar.scss";

function AppBar({ children }) {
    return (
        <div class="c-appbar">
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
    app: MockApp
    /**
     * Is the app open
     */
    active?: boolean
}

AppBar.AppIcon = function ({ app, active = false }: AppIconProps) {
    let className = 'c-appbar__app-icon';
    if (active) className += ' c-appbar__app-icon--active';

    return (
        <AppBar.Element>
            <button class={className} title={app.name} style={`color: ${app.iconColor}`}>
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
                <div class="c-appbar__systemtray-date">
                    3:00AM<br />
                    3/12/2022
                </div>
            </div>
        </AppBar.Element>
    )
}

AppBar.SystemTrayIcon = function ({ icon }: { icon: JSX.Element }) {
    return (
        <div class="c-appbar__systemtray-icon">
            {icon}
        </div>
    )
}

export default AppBar;