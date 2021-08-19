import { Statics } from "./Statics";

export class WorldTime {
    constructor(time = 0) {
        this.time = time;
        this.offlineTime = 0;
        this.frameDelta = 0;
        this.delta = 0;
        this.timescale = 1;
        this.onDayEndHandlers = [];
        this.onWeekEndHandlers = [];
        this.pauseTimestamp = -1;
        this.fskip = 1;
    }

    getYears() { return Math.floor(this.time / Statics.TIME_PER_YEAR); }
    getMonths() { return Math.floor((this.time % Statics.TIME_PER_YEAR) / Statics.TIME_PER_MONTH); }
    getDays() { return Math.floor(((this.time % Statics.TIME_PER_YEAR) % Statics.TIME_PER_MONTH) / Statics.TIME_PER_DAY); }
    getHours() { return Math.floor((((this.time % Statics.TIME_PER_YEAR) % Statics.TIME_PER_MONTH) % Statics.TIME_PER_DAY) / Statics.TIME_PER_HOUR); }
    getOfflineTimeString() {
        var hours = Math.floor(this.offlineTime / 3600000);
        var min = Math.floor((this.offlineTime % 3600000) / 60000);
        var sec = Math.floor((this.offlineTime % 60000) / 1000);
        return ("0" + hours).slice(-2) + ":" + ("0" + min).slice(-2) + ":" + ("0" + sec).slice(-2);
    }

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

    setTimeScale(scale, fskip = 1) {
        if (scale === 0 && this.timescale !== 0) {
            this.timescale = scale;
            this.pauseTimestamp = Date.now();
            return;
        }

        if (this.pauseTimestamp !== -1) {
            this.addOfflineTime(Date.now() - this.pauseTimestamp);
            this.pauseTimestamp = -1;
        }

        if (this.offlineTime <= 0) {
            return;
        }
        this.timescale = scale;
        this.fskip = fskip;
    }

    setFrameDelta(delta) {
        this.delta = delta;
        this.frameDelta = delta * this.timescale;
    }

    addOfflineTime(timeOffline) {
        this.offlineTime = Math.min(Statics.MAX_OFFLINE_TIME, this.offlineTime + timeOffline);
    }

    update(delta) {
        var prevDay = this.getDays();
        this.time += this.frameDelta;
        var curDay = this.getDays();
        if (prevDay !== curDay) {
            this._onDayEnd();
        }
        if (Math.floor(prevDay / 7) !== Math.floor(curDay / 7)) {
            this._onWeekEnd();
        }
        if (this.timescale > 1) {
            this.offlineTime -= this.delta * (this.timescale - 1);
            if (this.offlineTime <= 0) {
                this.timescale = 1;
                this.offlineTime = 0;
                this.fskip = 1;
            }
        }
    }

    timeSince(timestamp) {
        return new WorldTime(this.time - timestamp);
    }

    getText() {
        return "Year " + (this.getYears() + 1) + ", " + Statics.MONTH_NAMES[this.getMonths()] + " " + (this.getDays() + 1) + ", " + this.getHours() + ":00";
    }
    getTimespanText() {
        var ret = "";
        var years = this.getYears();
        if (years > 0) {
            ret += years + " Years"
        }
        var months = this.getMonths();
        if (months > 0) {
            ret += (ret.length > 0 ? ", " : "") + months + " Months";
        }
        var days = this.getDays();
        if (days > 0) {
            ret += (ret.length > 0 ? ", " : "") + days + " Days";
        }
        var hours = this.getHours();
        if (hours > 0) {
            ret += (ret.length > 0 ? ", " : "") + hours + " Hours";
        }
        return ret;
    }

    save() {
        var saveObj = {
            time: this.time,
            otime: this.offlineTime
        }

        return saveObj;
    }

    load(saveObj, ver) {
        if (ver <= 4) {
            saveObj.otime = 0;
        }
        this.time = saveObj.time;
        this.offlineTime = saveObj.otime;
    }
}