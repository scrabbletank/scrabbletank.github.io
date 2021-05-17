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

    static numberString(x) {
        var ret = new Intl.NumberFormat('en-US').format(x);
        if (ret.length >= 18) {
            ret = ret.substr(0, ret.length - 16) + "T";
        } else if (ret.length >= 14) {
            ret = ret.substr(0, ret.length - 12) + "B";
        } else if (ret.length >= 10) {
            ret = ret.substr(0, ret.length - 8) + "M";
        } else if (ret.length >= 6) {
            ret = ret.substr(0, ret.length - 4) + "K";
        }
        return ret;
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
        var min = Common.getDistance(x, y, list[0].x, list[0].y);

        for (var i = 1; i < list.length; i++) {
            var dist = Common.getDistance(x, y, list[i].x, list[i].y);
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