// this class exists purely to save the lore page for reloading
export class LoreStore {
    constructor() {
        if (!LoreStore.instance) {
            this.lore = [];
            LoreStore.instance = this;
        }

        return LoreStore.instance;
    }

    rebirth() {
        this.lore = [];
    }

    addLore(text) {
        this.lore.push(text);
    }

    save() {
        var saveObj = {
            lore: this.lore
        }

        return saveObj;
    }
    load(saveObj) {
        this.lore = saveObj.lore;
    }
}