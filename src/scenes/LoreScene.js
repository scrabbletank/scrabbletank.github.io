import { SceneUIBase } from "./SceneUIBase";
import { ProgressionStore } from "../data/ProgressionStore";
import { LoreLabel } from "../ui/LoreLabel";
import { TextButton } from "../ui/TextButton";
import { LoreStore } from "../data/LoreStore";

export class LoreScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.labels = [];
        this.labelIndex = 0;
        this.loreStore = new LoreStore();
        this.labelCount = undefined;
    }

    relativeX(val) {
        return super.relativeX(val) + 1000;
    }

    rebirth() {
        this.cameras.getCamera("loreBox").scrollY = this.relativeY(0);
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
        this.progresion.addOnUnlockHandler((a, b, c) => { this._handleProgressionEvents(a, b, c) });

        this.upButton = new TextButton(this, super.relativeX(20), this.relativeY(5), 60, 20, 'up');
        this.upButton.onClickHandler(() => { this._scrollUp(); });
        this.downButton = new TextButton(this, super.relativeX(80), this.relativeY(5), 60, 20, 'down');
        this.downButton.onClickHandler(() => { this._scrollDown(); });

        for (var i = 0; i < this.loreStore.lore.length; i++) {
            this.addText(this.loreStore.lore[i], false);
        }
        this._scrollTo(this.labels.length - 1);

        this.labelCount = this.add.bitmapText(super.relativeX(170), this.relativeY(5), "courier20", (this.labelIndex + 1) + "/" + this.labels.length);
    }

    _scrollUp() {
        if (this.labelIndex > 0) {
            this.labelIndex -= 1;
        }
        this._scrollTo(this.labelIndex);
    }

    _scrollDown() {
        if (this.labelIndex < this.labels.length - 1) {
            this.labelIndex += 1;
        }
        this._scrollTo(this.labelIndex);
    }

    _scrollTo(index) {
        if (index < 0 || index >= this.labels.length) {
            return;
        }
        this.labelIndex = index;
        this.cameras.getCamera("loreBox").scrollY = this.labels[this.labelIndex].getPosY() - 10;
        if (this.labelCount !== undefined) {
            this.labelCount.setText((this.labelIndex + 1) + "/" + this.labels.length);
        }
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
        if (this.labelCount !== undefined) {
            this.labelCount.setText((this.labelIndex + 1) + "/" + this.labels.length);
        }
    }
}