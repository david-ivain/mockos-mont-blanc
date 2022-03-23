import { Component, createSignal, For } from 'solid-js';
import './App.scss';
import AppBar from './Components/AppBar/AppBar';
import Desktop from './Components/Desktop/Desktop';
import SVG from './Components/SVG/SVG';
import Window from './Components/Window/Window';
import { useApps } from './Contexts/AppsContext';
import { MouseProvider } from './Contexts/MouseContext';
import { MockApp } from './types';


const App: Component = () => {
  const appsContext = useApps();
  const apps = appsContext.apps, activeApps = appsContext.activeApps;

  let pinnedApps = [
    'ex1',
    'ex2',
  ];

  return (
    <div id="mockos">
      <Desktop>
        <For each={activeApps()}>
          {(app, index) => <Window appID={app} x={apps()[app].defaultPosition.x || (index() + 1) * 32} y={apps()[app].defaultPosition.y || (index() + 1) * 32}>{apps()[app].content()}</Window>}
        </For>
      </Desktop>
      <AppBar>
        <AppBar.Group expand={true}>
          <For each={pinnedApps}>
            {(pinnedApp, index) => <AppBar.AppIcon appID={pinnedApp}></AppBar.AppIcon>}
          </For>
        </AppBar.Group>
        <AppBar.Separator></AppBar.Separator>
        <AppBar.Group>
          <AppBar.SystemTray>
            <AppBar.SystemTrayIcon icon={SVG.ChevronUpIcon}></AppBar.SystemTrayIcon>
            <AppBar.SystemTrayIcon icon={SVG.WifiIcon}></AppBar.SystemTrayIcon>
            <AppBar.SystemTrayIcon icon={SVG.BluetoothIcon}></AppBar.SystemTrayIcon>
            <AppBar.SystemTrayIcon icon={SVG.BatteryIcon}></AppBar.SystemTrayIcon>
          </AppBar.SystemTray>
        </AppBar.Group>
      </AppBar>
    </div>
  );
};

export default App;
