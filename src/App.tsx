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
  // @ts-ignore
  const [apps, activeApps, activeWindow, { focus, open }]: [() => { [name: string]: MockApp }, () => string[], () => string] = useApps();

  let pinnedApps = [
    'ex1',
    'ex2',
  ];

  return (
    <>
      <Desktop>
        <For each={activeApps()}>
          {(app, index) => <Window appID={app} x={(index() + 1) * 32} y={(index() + 1) * 32}></Window>}
        </For>
      </Desktop>
      <AppBar>
        <AppBar.AppIcon appID={'menu'}></AppBar.AppIcon>
        <AppBar.Separator></AppBar.Separator>
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
    </>
  );
};

export default App;
