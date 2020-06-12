import { Statics } from "../data/Statics";


export class Combat {
    static getAttackSpeedMultiplier(hit, evasion) {
        return Math.pow(hit, Statics.ATTACK_SPEED_POWER) / Math.pow(evasion, Statics.ATTACK_SPEED_POWER);
    }

    static getAnimInfoFromKey(key) {
        var animInfo = [];
        switch (key) {
            case "claws":
                animInfo.push({ frameId: 0, duration: 80 });
                animInfo.push({ frameId: 1, duration: 80 });
                animInfo.push({ frameId: 2, duration: 80 });
                animInfo.push({ frameId: 3, duration: 80 });
                break;
            case "clawscrit":
                animInfo.push({ frameId: 0, duration: 80 });
                animInfo.push({ frameId: 1, duration: 80 });
                animInfo.push({ frameId: 2, duration: 80 });
                animInfo.push({ frameId: 3, duration: 80 });
                break;
        }
        return animInfo;
    }
}