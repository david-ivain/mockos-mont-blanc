const SVG = {
    MenuIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="pointer-events: none;">
                <title>Menu icon</title>
                <circle cx="30%" cy="30%" r="12.5%" stroke="black" stroke-width="0" fill="currentColor" />
                <circle cx="70%" cy="70%" r="12.5%" stroke="black" stroke-width="0" fill="currentColor" />
                <circle cx="30%" cy="70%" r="12.5%" stroke="black" stroke-width="0" fill="currentColor" />
                <circle cx="70%" cy="30%" r="12.5%" stroke="black" stroke-width="0" fill="currentColor" />
            </svg>
        )
    },
    BatteryIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-battery">
                <rect x="1" y="6" width="18" height="12" rx="2" ry="2"></rect>
                <rect x="4" y="9" width="9" height="6" fill="black"></rect>
                <line x1="23" y1="13" x2="23" y2="11"></line>
            </svg>
        )
    },
    WifiIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-wifi">
                <path d="M5 12.55a11 11 0 0 1 14.08 0"></path>
                <path d="M1.42 9a16 16 0 0 1 21.16 0"></path>
                <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
                <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>
        )
    },
    BluetoothIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bluetooth">
                <polyline points="6.5 6.5 17.5 17.5 12 23 12 1 17.5 6.5 6.5 17.5"></polyline>
            </svg>
        )
    }
    ,
    ChevronUpIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        )
    },
    GlobeIcon() {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-globe">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
            </svg>
        )
    },
    MessageIcon({ fill = false }: { fill?: boolean }) {
        return (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-message-square">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" fill={fill ? 'currentColor' : 'transparent'}></path>
            </svg>
        )
    }
}

export default SVG;