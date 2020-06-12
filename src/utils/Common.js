export class Common {
    static getDistance(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    }

    static randint(a, b) {
        return Math.floor(a + Math.random() * (b - a));
    }

    static pointInList(x, y, list) {
        for (var i = 0; i < list.length; i++) {
            if (list[i].x === x && list[i].y === y) {
                return true;
            }
        }
        return false;
    }

    static nearestPointsInList(x, y, pointList, count) {
        var dists = [];
        for (var i = 0; i < pointList.length; i++) {
            dists.push([i, Common.getDistance(x, y, pointList[i].x, pointList[i].y)]);
        }
        dists.sort(function (a, b) { return a[1] - b[1] });
        return dists.slice(0, count);
    }

    static nearestPointInList(x, y, list, ignoreSelf = false) {
        var idx = 0;
        var min = this.getDistance(x, y, list[0].x, list[0].y);

        for (var i = 1; i < list.length; i++) {
            var dist = this.getDistance(x, y, list[i].x, list[i].y);
            // kind of hacky, but we shouldn't have cases points overlap
            if (dist < min) {
                if (ignoreSelf === true && dist === 0) {
                    continue;
                }
                idx = i;
                min = dist;
            }
        }
        return [idx, min];
    }

    static sumList(list) {
        var t = 0;
        for (var i = 0; i < list.length; i++) {
            t += list[i];
        }
        return t;
    }

    static canCraft(cost, inv) {
        for (var i = 0; i < inv.length; i++) {
            if (inv[i] < cost[i]) {
                return false;
            }
        }
        return true;
    }

    static getBonusText(prop, value) {
        switch (prop) {
            case "health":
                return "+ " + Math.floor(value) + " Health";
            case "damageMin":
                return "+ " + Math.floor(value) + " Min Damage";
            case "damageMax":
                return "+ " + Math.floor(value) + " Max Damage";
            case "strength":
                return "+ " + Math.floor(value) + " Strength";
            case "dexterity":
                return "+ " + Math.floor(value) + " Dexterity";
            case "agility":
                return "+ " + Math.floor(value) + " Agility";
            case "endurance":
                return "+ " + Math.floor(value) + " Endurance";
            case "recovery":
                return "+ " + Math.floor(value) + " Recovery";
            case "defense":
                return "+ " + Math.floor(value) + " Defense";
            case "accuracy":
                return "+ " + Math.floor(value) + " Accuracy";
            case "hit":
                return "+ " + Math.floor(value) + " Hit";
            case "evasion":
                return "+ " + Math.floor(value) + " Evasion";
            case "critDamage":
                return "+ " + Math.floor(value * 100) + "% Crit Damage";
            case "critChance":
                return "+ " + Math.floor(value * 100) + "% Crit Chance";
            case "healthRegen":
                return "+ " + Math.floor(value * 10) / 10 + "/s Health Regen";
            case "armor":
                return "+ " + Math.floor(value) + " Armor";
        }
    }

    static getCostText(type, value) {
        switch (type) {
            case 0:
                return Math.floor(value) + " Wood";
            case 1:
                return Math.floor(value) + " Leather";
            case 2:
                return Math.floor(value) + " Metal";
            case 3:
                return Math.floor(value) + " Fiber";
            case 4:
                return Math.floor(value) + " Stone";
            case 5:
                return Math.floor(value) + " Crystal";
        }
    }

    static processText(text, width) {
        var list = text.split('\n');
        var res = "";

        for (var i = 0; i < list.length; i++) {
            if (list[i].length < width) {
                res += list[i] + (i < list.length - 1 ? "\n" : "");
                continue;
            }
            var idxA = 0;
            var idxB = width;

            while (idxB < list[i].length) {
                while (idxB > idxA && list[i][idxB] !== ' ') {
                    idxB--;
                }
                res += list[i].substring(idxA, idxB) + "\n";
                idxA = idxB + 1;
                idxB = Math.min(idxA + width, list[i].length);
            }

            if (idxA < list[i].length) {
                res += list[i].substring(idxA, list[i].length);
            }

            if (i !== list.length - 1) {
                res += "\n";
            }
        }
        return res;
    }

    static colorLerp(clrA, clrB, lerp) {
        var a = Phaser.Display.Color.IntegerToRGB(clrA);
        var b = Phaser.Display.Color.IntegerToRGB(clrB);
        return Phaser.Display.Color.GetColor(
            a.r + (b.r - a.r) * lerp,
            a.g + (b.g - a.g) * lerp,
            a.b + (b.b - a.b) * lerp);
    }
}