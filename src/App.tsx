import { Component, createSignal, For } from 'solid-js';
import './App.scss';
import AppBar from './Components/AppBar/AppBar';
import Desktop from './Components/Desktop/Desktop';
import { MockApp } from './types';

import SVG from './Components/SVG/SVG';

const App: Component = () => {
  const menu: MockApp = { name: 'Menu', icon: SVG.MenuIcon, iconColor: '#333' };

  const apps: { [name: string]: MockApp } = {
    'ex1': { name: 'Example 1', icon: SVG.GlobeIcon, iconColor: '#00BFFF' },
    'ex2': { name: 'Example 2', icon: <SVG.MessageIcon fill={true}></SVG.MessageIcon>, iconColor: '#8FBC8F' }
  }

  let pinnedApps = [
    'ex1',
    'ex2',
  ];

  let activeApps = ['ex1'];

  return (
    <>
      <Desktop>
      </Desktop>
      <AppBar>
        <AppBar.AppIcon app={menu}></AppBar.AppIcon>
        <AppBar.Separator></AppBar.Separator>
        <AppBar.Group expand={true}>
          <For each={pinnedApps}>
            {(pinnedApp, index) => <AppBar.AppIcon app={apps[pinnedApp]} active={activeApps.includes(pinnedApp)}></AppBar.AppIcon>}
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
