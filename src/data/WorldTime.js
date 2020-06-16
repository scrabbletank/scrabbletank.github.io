import { Statics } from "./Statics";

export class WorldTime {
    constructor(time = 0) {
        this.time = time;
        this.onDayEndHandlers = [],
            this.onWeekEndHandlers = []
    }

    getYears() { return Math.floor(this.time / Statics.TIME_PER_YEAR); }
    getMonths() { return Math.floor((this.time % Statics.TIME_PER_YEAR) / Statics.TIME_PER_MONTH); }
    getDays() { return Math.floor(((this.time % Statics.TIME_PER_YEAR) % Statics.TIME_PER_MONTH) / Statics.TIME_PER_DAY); }
    getHours() { return Math.floor((((this.time % Statics.TIME_PER_YEAR) % Statics.TIME_PER_MONTH) % Statics.TIME_PER_DAY) / Statics.TIME_PER_HOUR); }

    _onDayEnd() {
        for (var i = 0; i < this.onDayEndHandlers.length; i++) {
            this.onDayEndHandlers[i]();
        }
    }
    _onWeekEnd() {
        for (var i = 0; i < this.onWeekEndHandlers.length; i++) {
            this.onWeekEndHandlers[i]();
        }
    }

    registerEvent(event, callback) {
        if (event === "onDayEnd") {
            this.onDayEndHandlers.push(callback);
        } else if (event === "onWeekEnd") {
            this.onWeekEndHandlers.push(callback);
        }
    }

    update(delta) {
        var prevDay = this.getDays();
        this.time += delta;
        var curDay = this.getDays();
        if (prevDay !== curDay) {
            this._onDayEnd();
        }
        if (Math.floor(prevDay / 7) !== Math.floor(curDay / 7)) {
            this._onWeekEnd();
        }
    }

    getText() {
        return "Year " + (this.getYears() + 1) + ", " + Statics.MONTH_NAMES[this.getMonths()] + " " + (this.getDays() + 1) + ", " + this.getHours() + ":00";
    }

    save() {
        var saveObj = {
            time: this.time
        }

        return saveObj;
    }

    load(saveObj, ver) {
        this.time = saveObj.time;
    }
}