import { environment } from "../../../../environment.js";

export class SnoopaVision {
    constructor() {
        this._container = document.createElement("div");
    }

    /* Getters */
    get container(): HTMLDivElement { return this._container; }
    get position(): ClientRect | DOMRect { return this._position; }

    /* Setters */
    set opacity(pourcent: number) { this._container.style.opacity = pourcent.toString(); }

    /* Public methods */
    init() {
        this._container.className = "snoopa-vision";
        this._container.innerHTML = `<img src=${environment.assetsUrl}images/snoopa-vision-glitch.gif>`;
        this._container.style.cursor = "pointer";
        this._image = this._container.firstElementChild as HTMLImageElement;
        this.placeAtRandom();
        this._container.style.opacity = "0";
        document.body.appendChild(this._container);
        this._position = this._container.getBoundingClientRect();
    }
    
    reveal = () => {
        this._container.innerHTML = `<img src=${environment.assetsUrl}images/snoopa-vision.png>`;
        this._container.style.cursor = "unset";
        const audio = new Audio(environment.assetsUrl + "/audio/snoopa-vision.mp3");
        audio.play();
        this._container.style.opacity = "100";
    }

    /* Private methods */
    private placeAtRandom() {
        this._container.style.position = "absolute";
        this._container.style.width = "150px";
        this._image.style.width = "150px";
        this._image.style.maxHeight = "200px";
        const posX = Math.floor(Math.random() * Math.floor(window.innerWidth - 150));
        let posY = Math.floor(Math.random() * Math.floor(window.innerHeight - 200));

        // If in the center of the screen, put on top
        if (posY > (window.innerHeight / 2) - 50 && posY < ((window.innerHeight / 2) + 50)) {
            posY = 0;
        }

        this._container.style.left = posX.toString() + "px";
        this._container.style.top = posY.toString() + "px";
    }

    /* Private members */
    private _container: HTMLDivElement;
    private _image: HTMLImageElement;
    private _position: ClientRect | DOMRect;
}