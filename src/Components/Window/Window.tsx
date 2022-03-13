import { createSignal, PropsWithChildren, useContext } from "solid-js";
import { useApps } from "../../Contexts/AppsContext";
import { useMouse } from "../../Contexts/MouseContext";
import { MockApp } from "../../types";
import SVG from "../SVG/SVG";
import "./_window.scss";

function Window({ children, x = 32, y = 32, width = 300, height = 200, appID }: PropsWithChildren<{ x?: number, y?: number, width?: number, height?: number, appID: string }>) {
    const [windowPosition, setWindowPosition] = createSignal<{ x: number, y: number }>({ x: x, y: y });
    const [dragOffset, setDragOffset] = createSignal<{ x: number, y: number }>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = createSignal(false);
    const [isMaximized, setIsMaximized] = createSignal(false);
    const [isTouch, setIsTouch] = createSignal(false);

    // @ts-ignore
    const [apps, activeApps, activeWindow, { focus, open, close }] = useApps();

    // @ts-ignore
    const [position, touchPosition] = useMouse();

    document.addEventListener('mouseup', endDragging);

    function startDragging(e: MouseEvent | TouchEvent) {
        if (isMaximized()) return;
        if (e instanceof MouseEvent) {
            setIsTouch(false);
            setDragOffset({ x: e.pageX - windowPosition().x, y: e.pageY - windowPosition().y });
        }
        else {
            setIsTouch(true);
            setDragOffset({ x: e.touches[0].pageX - windowPosition().x, y: e.touches[0].pageY - windowPosition().y });
        }
        setIsDragging(true);
        requestAnimationFrame(drag)
    }

    function drag() {
        if (!isTouch()) {
            const mouseXY = position();
            setWindowPosition({ x: mouseXY.x - dragOffset().x, y: mouseXY.y - dragOffset().y });
        }
        else {
            const touchXY = touchPosition();
            setWindowPosition({ x: touchXY.x - dragOffset().x, y: touchXY.y - dragOffset().y });
        }
        if (isDragging()) requestAnimationFrame(drag);
    }

    function endDragging(e: MouseEvent | TouchEvent) {
        setIsDragging(false);
    }

    function maximize() {
        setIsMaximized(!isMaximized());
    }

    return (
        <div class={`c-window${isMaximized() ? ' c-window--maximized' : ''}${activeWindow() === appID ? ' c-window--active' : ''}`} style={`inset: ${windowPosition().y}px ${document.body.offsetWidth - width - windowPosition().x}px ${document.body.offsetHeight - document.querySelector<HTMLElement>('.c-appbar').offsetHeight - height - windowPosition().y}px ${windowPosition().x}px;`}
            onMouseDown={() => focus(appID)}>
            <div class="c-window__header">
                <div class="c-window__title" onMouseDown={startDragging} onMouseUp={endDragging} onTouchStart={startDragging} onTouchEnd={endDragging} onDblClick={maximize}>
                    {apps()[appID].name}
                </div>
                <div class="c-window__controls">
                    <div class="c-window__control">
                        <SVG.ChevronDownIcon></SVG.ChevronDownIcon>
                    </div>
                    <div class="c-window__control" onClick={maximize}>
                        <SVG.ChevronUpIcon></SVG.ChevronUpIcon>
                    </div>
                    <div class="c-window__control" onClick={() => close(appID)}>
                        <SVG.XIcon></SVG.XIcon>
                    </div>
                </div>
            </div>
            {children}
        </div>
    )
}

export default Window;