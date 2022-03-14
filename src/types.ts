import { JSXElement } from "solid-js";
import { JSX } from "solid-js/jsx-runtime";

class Color {
    r: number
    g: number
    b: number

    constructor(r: number, g: number, b: number) {
        this.r = r
        this.g = g
        this.b = b
        console.log(this);

    }

    get luminance(): number {
        return (0.2126 * this.r + 0.7152 * this.g + 0.0722 * this.b) / 255;
    }

    darken(coef: number) {
        return new Color(Math.floor(this.r * coef), Math.floor(this.g * coef), Math.floor(this.b * coef));
    }

    get hex() {
        return `#${this.r.toString(16).padStart(2, '0')}${this.g.toString(16).padStart(2, '0')}${this.b.toString(16).padStart(2, '0')}`
    }
}

class MockApp {
    name: string
    icon: string | JSX.Element
    iconColorValue: Color
    windowColorValue: Color

    constructor(name: string, icon: string | JSXElement, iconColor: string, windowColor: string = '#fff') {
        this.name = name
        this.icon = icon
        this.iconColor = iconColor
        this.windowColor = windowColor
        console.log(this);

    }

    get iconColor(): string {
        return this.iconColorValue.hex;
    }

    set iconColor(hex: string) {
        this.iconColorValue = this.fromHex(hex)
    }

    get windowColor(): string {
        return this.windowColorValue.hex;
    }

    set windowColor(hex: string) {
        this.windowColorValue = this.fromHex(hex)
    }

    private fromHex(hex: string): Color {
        let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            || /^#?([a-f\d]{1})([a-f\d]{1})([a-f\d]{1})$/i.exec(hex).map(x => x + x);

        return result ? new Color(
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ) : new Color(0, 0, 0);
    }
}

export { Color, MockApp };