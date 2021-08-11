import { Statics } from "../data/Statics";


export class Combat {
    static getAttackSpeedMultiplier(hit, evasion) {
        hit = Math.max(1, hit);
        evasion = Math.max(1, evasion);
        return Math.pow(hit, Statics.ATTACK_SPEED_POWER) / Math.pow(evasion, Statics.ATTACK_SPEED_POWER);
    }

    static getAnimInfoFromKey(key) {
        var animInfo = [];
        switch (key) {
            case "claws":
            case "clawscrit":
            case "barrier":
            case "mace":
            case "skull":
            case "glancing":
                animInfo.push({ frameId: 0, duration: 80 });
                animInfo.push({ frameId: 1, duration: 80 });
                animInfo.push({ frameId: 2, duration: 80 });
                animInfo.push({ frameId: 3, duration: 80 });
                break;
            case "magicmissile":
            case "fireball":
            case "haste":
                animInfo.push({ frameId: 0, duration: 64 });
                animInfo.push({ frameId: 1, duration: 64 });
                animInfo.push({ frameId: 2, duration: 64 });
                animInfo.push({ frameId: 3, duration: 64 });
                animInfo.push({ frameId: 4, duration: 64 });
                break;
            case "entangle":
                animInfo.push({ frameId: 0, duration: 105 });
                animInfo.push({ frameId: 1, duration: 105 });
                animInfo.push({ frameId: 2, duration: 105 });
                break;
        }
        return animInfo;
    }
}