import { onMount, PropsWithChildren } from "solid-js";
import "./_desktop.scss";

function Desktop({ children }: PropsWithChildren) {
    return (
        <div class="c-desktop">
            <div class="c-desktop__watermark">
                Wallpaper: <a href="https://commons.wikimedia.org/wiki/File:Mont_Blanc_depuis_Valmorel_2.jpg">Matthieu Riegler, CC-by</a>, <a href="https://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>, via Wikimedia Commons<br />
                Icons: <a href="https://feathericons.com/">Feather</a>
            </div>
            {children}
        </div>
    )
}

export default Desktop;