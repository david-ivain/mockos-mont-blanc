import { createDeferred, createMemo, createSignal, PropsWithChildren, useContext } from "solid-js";
import { useApps } from "../../Contexts/AppsContext";
import { useMouse } from "../../Contexts/MouseContext";
import { useWindow } from "../../Contexts/WindowContext";
import { MockApp } from "../../types";
import SVG from "../SVG/SVG";
import "./_window.scss";

function WindowResizer({ position, start, end }: { position: string, start: (e: MouseEvent | TouchEvent) => void, end: (e: MouseEvent | TouchEvent) => void }) {
    return (
        <div className="c-window__resize-area" data-position={position} onMouseDown={start} onMouseUp={end} onTouchStart={start} onTouchEnd={end}></div>
    );
}

function Window({ children, x = 32, y = 32, width = 300, height = 200, appID }: PropsWithChildren<{ x?: number, y?: number, width?: number, height?: number, appID: string }>) {
    const [windowPosition, setWindowPosition] = createSignal<{ x: number, y: number }>({ x: x, y: y });
    const [windowSize, setWindowSize] = createSignal({ width, height });
    const [isMaximized, setIsMaximized] = createSignal(false);

    const [dragOffset, setDragOffset] = createSignal<{ x: number, y: number }>({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = createSignal(false);
    const [isResizing, setIsResizing] = createSignal(false);

    const [isTouch, setIsTouch] = createSignal(false);

    let clickTime = 0;
    let dragAnimationFrame;
    let resizeAnimationFrame;
    let resizePositions = { top: false, right: false, bottom: false, left: false };

    const appsContext = useApps();
    const apps = appsContext.apps,
        activeWindow = appsContext.activeWindow,
        focus = appsContext.methods.focus,
        close = appsContext.methods.close;
    const app = createMemo(() => apps()[appID]);
    const darkenedColor = createMemo(() => app().windowColorValue.darken(0.8));

    const { position, touchPosition } = useMouse();

    document.addEventListener('mouseup', endDragging);
    document.addEventListener('mouseup', endResizing);

    function startDragging(e: MouseEvent | TouchEvent) {
        if (e instanceof MouseEvent) e.preventDefault();
        if (isMaximized()) return;
        clickTime = e.timeStamp;
        if (e instanceof MouseEvent) {
            setIsTouch(false);
            setDragOffset({ x: e.pageX - windowPosition().x, y: e.pageY - windowPosition().y });
        }
        else {
            setIsTouch(true);
            setDragOffset({ x: e.touches[0].pageX - windowPosition().x, y: e.touches[0].pageY - windowPosition().y });
        }
        //setIsDragging(true);
        dragAnimationFrame = requestAnimationFrame(drag)
    }

    function drag(time: number) {
        if (time - clickTime < 100) return dragAnimationFrame = requestAnimationFrame(drag);
        setIsDragging(true);
        if (!isTouch()) {
            const mouseXY = position();
            setWindowPosition({ x: mouseXY.x - dragOffset().x, y: mouseXY.y - dragOffset().y });
        }
        else {
            const touchXY = touchPosition();
            setWindowPosition({ x: touchXY.x - dragOffset().x, y: touchXY.y - dragOffset().y });
        }
        dragAnimationFrame = requestAnimationFrame(drag);
    }

    function endDragging(e: MouseEvent | TouchEvent) {
        cancelAnimationFrame(dragAnimationFrame);
        setIsDragging(false);
    }

    function startResizing(e: MouseEvent | TouchEvent) {
        if (e instanceof MouseEvent) e.preventDefault();
        if (isMaximized()) return;
        clickTime = e.timeStamp;
        let resizePosition = (e.currentTarget as HTMLElement).dataset.position;
        resizePositions.top = ["top", "top-left", "top-right"].includes(resizePosition);
        resizePositions.right = ["right", "top-right", "bottom-right"].includes(resizePosition);
        resizePositions.bottom = ["bottom", "bottom-left", "bottom-right"].includes(resizePosition);
        resizePositions.left = ["left", "top-left", "bottom-left"].includes(resizePosition);
        if (e instanceof MouseEvent) {
            setIsTouch(false);
            setDragOffset({ x: e.pageX - windowPosition().x, y: e.pageY - windowPosition().y });
        }
        else {
            setIsTouch(true);
            setDragOffset({ x: e.touches[0].pageX - windowPosition().x, y: e.touches[0].pageY - windowPosition().y });
        }
        //setIsDragging(true);
        resizeAnimationFrame = requestAnimationFrame(resize)
    }

    function resize(time: number) {
        setIsResizing(true);
        const mouseXY = !isTouch() ? position() : touchPosition();
        const wp = windowPosition();
        let newWindowPosition = { ...wp };
        let newWindowSize = windowSize();
        if (resizePositions.top) {
            newWindowPosition.y = mouseXY.y - dragOffset().y;
            newWindowSize.height -= newWindowPosition.y - wp.y;
        }
        if (resizePositions.right) newWindowSize.width = mouseXY.x - windowPosition().x;
        if (resizePositions.left) {
            newWindowPosition.x = mouseXY.x - dragOffset().x;
            newWindowSize.width -= newWindowPosition.x - wp.x;
        }
        if (resizePositions.bottom) newWindowSize.height = mouseXY.y - windowPosition().y;
        setWindowPosition({ ...newWindowPosition });
        setWindowSize({ ...newWindowSize });
        resizeAnimationFrame = requestAnimationFrame(resize);
    }

    function endResizing(e: MouseEvent | TouchEvent) {
        cancelAnimationFrame(resizeAnimationFrame);
        setIsResizing(false);
    }

    function maximize(e) {
        setIsMaximized(!isMaximized());
    }

    return (
        <div class={`c-window${isMaximized() ? ' c-window--maximized' : ''}${activeWindow() === appID ? ' c-window--active' : ''}`}
            style={`${app().defaultPosition.alignY}: ${isMaximized() ? 0 : windowPosition().y}px; width: ${isMaximized() ? '100vw' : `${windowSize().width}px`}; height: ${isMaximized() ? '100%' : `${windowSize().height}px`}; ${app().defaultPosition.alignX}: ${isMaximized() ? 0 : windowPosition().x}px;`}
            onMouseDown={() => focus(appID)}
            data-dragged={isDragging()}
            data-resizing={isResizing()}>
            {app().frameless ? <></>
                : (<div class={`c-window__header${app().windowColorValue.luminance < 0.5 ? ' c-window__header--dark' : ''}`} style={`background-color: ${app().windowColor};`}>
                    <div class="c-window__title" onMouseDown={startDragging} onMouseUp={endDragging} onTouchStart={startDragging} onTouchEnd={endDragging} onDblClick={maximize}>
                        {app().name}
                    </div>
                    <div class="c-window__controls">
                        <button class="c-window__control" style={`border-color: ${darkenedColor().hex};`}>
                            <SVG.ChevronDownIcon></SVG.ChevronDownIcon>
                        </button>
                        <button class="c-window__control" onClick={maximize} style={`border-color: ${darkenedColor().hex};`}>
                            <SVG.ChevronUpIcon></SVG.ChevronUpIcon>
                        </button>
                        <button class="c-window__control" onClick={() => close(appID)} style={`border-color: ${darkenedColor().hex};`}>
                            <SVG.XIcon></SVG.XIcon>
                        </button>
                    </div>
                </div>)
            }
            <div className="c-window__content">
                {children}
            </div>
            <WindowResizer position="top" start={startResizing} end={endResizing} />
            <WindowResizer position="right" start={startResizing} end={endResizing} />
            <WindowResizer position="bottom" start={startResizing} end={endResizing} />
            <WindowResizer position="left" start={startResizing} end={endResizing} />
            <WindowResizer position="top-left" start={startResizing} end={endResizing} />
            <WindowResizer position="top-right" start={startResizing} end={endResizing} />
            <WindowResizer position="bottom-right" start={startResizing} end={endResizing} />
            <WindowResizer position="bottom-left" start={startResizing} end={endResizing} />
        </div>
    )
}

export default Window;