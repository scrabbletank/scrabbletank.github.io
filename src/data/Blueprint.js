export class Blueprint {
    constructor() {
        this.map = [];

        for (var y = 0; y < 13; y++) {
            var layer = [];
            for (var x = 0; x < 11; x++) {
                layer.push(0);
            }
            this.map.push(layer);
        }

        //mark the town location
        //Math.floor(this.width / 2), this.height - 3
        this.map[10][5] = "town";
    }

    save() {
        var saveObj = {
            map: this.map
        }

        return saveObj;
    }

    static loadFromFile(saveObj, ver) {
        var bp = new Blueprint();
        bp.map = saveObj.map;

        return bp;
    }
}