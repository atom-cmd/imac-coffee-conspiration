import "./random-screen.scss";
import template from "./random-screen.ejs";
import { environment } from "../../../../environment.js";

export class RandomScreen extends HTMLElement {

    constructor() {
        // Always call super first in constructor
        super();

        let i = 0;
        for (const item of this.children) {
            if (i != 0) {
                (item as HTMLElement).hidden = true;
            } else {
                (item as HTMLElement).hidden = false;
            }
            i++;
        }
    }

    public connectedCallback() {
        window.setInterval(this.incrementVisible, 990);
    }

    // public disconnectedCallback() {}

    private incrementVisible = () => {
        let i = 0;
        let visibleIndex = null;

        for (const item of this.children) {
            if (!(item as HTMLElement).hidden) {
                (item as HTMLElement).hidden = true;
                visibleIndex = i + 1;
            }
            if (i === visibleIndex) {
                (item as HTMLElement).hidden = false;
            }
            if (visibleIndex === this.childElementCount) {
                let firstChild = this.firstElementChild as HTMLElement;
                firstChild.hidden = false;
            }
            i++;
        }
    }

}

customElements.define("app-random-screen", RandomScreen);
