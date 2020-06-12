import { SceneUIBase } from "./SceneUIBase";
import { ProgressionStore } from "../data/ProgressionStore";
import { LoreLabel } from "../ui/LoreLabel";
import { TextButton } from "../ui/TextButton";
import { LoreStore } from "../data/LoreStore";

export class LoreScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.labels = [];
        this.internalScroll = 0;
        this.scrollDirection = 0;
        this.maxScroll = 0;
        this.loreStore = new LoreStore();
    }

    relativeX(val) {
        return super.relativeX(val) + 1000;
    }

    rebirth() {
        this.cameras.getCamera("loreBox").scrollY = this.relativeY(0) + this.internalScroll;
        this.internalScroll = 0;
        this.scrollDirection = 0;
        this.maxScroll = 0;
        for (var i = 0; i < this.labels.length; i++) {
            this.labels[i].destroy();
        }
        this.labels = [];
    }

    create() {
        this.cameras.add(super.relativeX(0), this.relativeY(30), 900, 670, false, "loreBox");
        this.cameras.getCamera("loreBox").scrollX = this.relativeX(0);
        this.cameras.getCamera("loreBox").scrollY = this.relativeY(0);
        //background
        this.add.rectangle(super.relativeX(0), this.relativeY(0), 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();
        
        this.progresion = new ProgressionStore();
        this.progresion.addOnUnlockHandler((a, b, c) => { this._handleProgressionEvents(a, b, c)});

        this.upButton = new TextButton(this, super.relativeX(20), this.relativeY(5), 60, 20, 'up');
        this.upButton.onClickHandler(() => { this._scrollUp(); });
        this.upButton.onPointerOutHandler(() => { this._endScrolling(); });
        this.upButton.onPointerUpHandler(() => { this._endScrolling(); });
        this.downButton = new TextButton(this, super.relativeX(80), this.relativeY(5), 60, 20, 'down');
        this.downButton.onClickHandler(() => { this._scrollDown(); });
        this.downButton.onPointerOutHandler(() => { this._endScrolling(); });
        this.downButton.onPointerUpHandler(() => { this._endScrolling(); });

        for (var i = 0; i < this.loreStore.lore.length; i++) {
            this.addText(this.loreStore.lore[i], false);
        }
    }

    _scrollUp() {
        this.scrollDirection = -1;
    }

    _endScrolling() {
        this.scrollDirection = 0;
    }

    _scrollDown() {
        this.scrollDirection = 1;
    }

    _handleProgressionEvents(_type, _count, text) {
        if (text !== undefined && text !== "") {
            this.addText(text);
        }
    }

    addText(text, addToStore = true) {
        // to prevent infinite lore adding
        if (addToStore === true) {
            this.loreStore.addLore(text);
        }
        var x = this.relativeX(10);
        var y = this.relativeY(10);
        if (this.labels.length !== 0) {
            x = this.labels[this.labels.length - 1].getPosX();
            y = this.labels[this.labels.length - 1].getHeight();
        }
        this.labels.push(new LoreLabel(this, x, y, text, 85, "courier20", 20));
        this.maxScroll = Math.max(0, this.labels[this.labels.length - 1].getHeight() - this.relativeY(30) - 500);
    }

    update(__time, delta) {
        var change = delta * this.scrollDirection * 0.3;
        this.internalScroll = Math.min(this.maxScroll, Math.max(this.internalScroll + change, 0));
        this.cameras.getCamera("loreBox").scrollY = this.relativeY(0) + this.internalScroll;
    }
}