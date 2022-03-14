/* @refresh reload */
import { render } from 'solid-js/web';

import App from './App';
import { AppsProvider } from './Contexts/AppsContext';
import { MouseProvider } from './Contexts/MouseContext';
import { WindowProvider } from './Contexts/WindowContext';

render(() => (
    <WindowProvider>
        <MouseProvider position={{ x: 0, y: 0 }}>
            <AppsProvider>
                <App />
            </AppsProvider>
        </MouseProvider>
    </WindowProvider>
), document.getElementById('root') as HTMLElement);
