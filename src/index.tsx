/* @refresh reload */
import { render } from 'solid-js/web';

import App from './App';
import { AppsProvider } from './Contexts/AppsContext';
import { MouseProvider } from './Contexts/MouseContext';

document.addEventListener('dragover', e => e.preventDefault());

render(() => (
    <MouseProvider position={{ x: 0, y: 0 }}>
        <AppsProvider>
            <App />
        </AppsProvider>
    </MouseProvider>
), document.getElementById('root') as HTMLElement);
