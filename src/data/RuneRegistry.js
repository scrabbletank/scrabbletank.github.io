import { Common } from "../utils/Common";
import { MoonlightData } from "./MoonlightData";

var RuneWords = {
    Tyr: {
        dropRate: 30,
        getBonus: (level) => {
            return {
                weaponPercent: 0.03 * level
            };
        },
        Eld: {
            Tak: {
                getBonus: (level) => {
                    return {
                        strTalents: level,
                        strPercent: 0.05 * level,
                        weaponScaling: 0.01 * level
                    };
                }
            }
        }
    },
    Vel: {
        dropRate: 30,
        getBonus: (level) => {
            return {
                evaPercent: 0.04 * level
            };
        },
    },
    El: {
        dropRate: 30,
        getBonus: (level) => {
            return {
                hitPercent: 0.04 * level
            };
        },
        Run: {
            Est: {
                getBonus: (level) => {
                    return {
                        dexTalents: level,
                        dexPercent: 0.05 * level,
                        baseAttackSpeed: 0.05 * level
                    };
                }
            }
        }
    },
    Ley: {
        dropRate: 30,
        getBonus: (level) => {
            return {
                regenPercent: 0.04 * level
            };
        },
        Eld: {
            Quil: {
                getBonus: (level) => {
                    return {
                        recTalents: level,
                        recPercent: 0.05 * level,
                        OOCRegen: 7 * level
                    };
                }
            }
        }
    },
    Kor: {
        dropRate: 30,
        getBonus: (level) => {
            return {
                armorPercent: 0.05 * level
            };
        }
    },
    Sok: {
        dropRate: 30,
        getBonus: (level) => {
            return {
                critPercent: 0.05 * level
            };
        },
        Ryn: {
            Zel: {
                getBonus: (level) => {
                    return {
                        accTalents: level,
                        accPercent: 0.05 * level,
                        critScaling: 0.01 * level
                    };
                }
            }
        }
    },
    Ber: {
        dropRate: 30,
        getBonus: (level) => {
            return {
                healthPercent: 0.03 * level
            };
        },
        Eld: {
            Urd: {
                getBonus: (level) => {
                    return {
                        endTalents: level,
                        endPercent: 0.05 * level,
                        healthPercent: 0.1 * level
                    };
                }
            }
        },
        Zel: {
            Kor: {
                getBonus: (level) => {
                    return {
                        healthPercent: 0.1 * level,
                        critChance: 0.01 * level
                    };
                }
            }
        },
        Ryn: {
            Zel: {
                Sok: {
                    getBonus: (level) => {
                        return {
                            enemyCrit: level,
                            endPercent: 0.05 * level,
                            accPercent: 0.05 * level
                        };
                    }
                }
            }
        }
    },
    Eid: {
        dropRate: 30,
        getBonus: (level) => {
            return {
                exploreSpeed: 0.15 * level
            };
        },
        Eld: {
            getBonus: (level) => {
                return {
                    friendshipMulti: level
                };
            }
        }
    },
    Ryn: {
        dropRate: 20,
        getBonus: (level) => {
            return {
                critChance: 0.01 * level
            };
        }
    },
    Eld: {
        dropRate: 20,
        getBonus: (level) => {
            return {
                lootFlat: level
            };
        },
        Rath: {
            getBonus: (level) => {
                return {
                    moteChance: 0.005 * level
                };
            }
        },
        Ryn: {
            getBonus: (level) => {
                return {
                    lootTalent: 5 * level
                };
            }
        }
    },
    Rath: {
        dropRate: 20,
        getBonus: (level) => {
            return {
                shadeFlat: 10 * level
            };
        }
    },
    Run: {
        dropRate: 20,
        getBonus: (level) => {
            return {
                baseAttackSpeed: 0.05 * level
            };
        }
    },
    Tak: {
        dropRate: 50,
        getBonus: (level) => {
            return {
                strFlat: 5 * level
            };
        }
    },
    Est: {
        dropRate: 50,
        getBonus: (level) => {
            return {
                dexFlat: 5 * level
            };
        }
    },
    Lem: {
        dropRate: 50,
        getBonus: (level) => {
            return {
                agiFlat: 5 * level
            };
        },
        Run: {
            Vel: {
                getBonus: (level) => {
                    return {
                        agiTalents: level,
                        agiPercent: 0.05 * level,
                        evaPercent: 0.1 * level
                    };
                }
            }
        }
    },
    Urd: {
        dropRate: 50,
        getBonus: (level) => {
            return {
                endFlat: 5 * level
            };
        }
    },
    Lah: {
        dropRate: 50,
        getBonus: (level) => {
            return {
                defFlat: 5 * level
            };
        },
        Eld: {
            Kor: {
                getBonus: (level) => {
                    return {
                        defTalents: level,
                        defPercent: 0.05 * level,
                        armorScaling: 0.01 * level
                    };
                }
            }
        }
    },
    Quil: {
        dropRate: 50,
        getBonus: (level) => {
            return {
                recFlat: 5 * level
            };
        },
        Ley: {
            Lah: {
                getBonus: (level) => {
                    return {
                        regenOnKill: level
                    };
                }
            }
        }
    },
    Zel: {
        dropRate: 50,
        getBonus: (level) => {
            return {
                accFlat: 5 * level
            };
        }
    },
}

export class RuneRegistry {
    static getRuneTexture(rune) {
        switch (rune) {
            case "Tyr":
                return { sprite: "runeicons", tile: 1 };
            case "Vel":
                return { sprite: "runeicons", tile: 2 };
            case "El":
                return { sprite: "runeicons", tile: 3 };
            case "Ley":
                return { sprite: "runeicons", tile: 4 };
            case "Kor":
                return { sprite: "runeicons", tile: 5 };
            case "Sok":
                return { sprite: "runeicons", tile: 6 };
            case "Ber":
                return { sprite: "runeicons", tile: 7 };
            case "Eid":
                return { sprite: "runeicons", tile: 8 };
            case "Ryn":
                return { sprite: "runeicons", tile: 9 };
            case "Eld":
                return { sprite: "runeicons", tile: 10 };
            case "Rath":
                return { sprite: "runeicons", tile: 11 };
            case "Run":
                return { sprite: "runeicons", tile: 12 };
            case "Tak":
                return { sprite: "runeicons", tile: 13 };
            case "Est":
                return { sprite: "runeicons", tile: 14 };
            case "Lem":
                return { sprite: "runeicons", tile: 15 };
            case "Urd":
                return { sprite: "runeicons", tile: 16 };
            case "Lah":
                return { sprite: "runeicons", tile: 17 };
            case "Quil":
                return { sprite: "runeicons", tile: 18 };
            case "Zel":
                return { sprite: "runeicons", tile: 19 };
        }
        return { sprite: "runeicons", tile: 0 };
    }

    static getBonusForRune(rune) {
        if (RuneWords[rune.word] !== undefined && RuneWords[rune.word].getBonus !== undefined) {
            return RuneWords[rune.word].getBonus(rune.level);
        }
        return {};
    }

    static getUpgradeCost(rune) {
        return Math.round((100 + (Math.floor(Math.pow(rune.level - 1, 1.5)) * 200)) *
            Math.pow(0.93, MoonlightData.getInstance().moonperks.runes3.level));
    }

    static getRandomRuneAtLevel(level) {
        var drop = Common.randint(0, 670);
        for (const prop in RuneWords) {
            if (drop <= RuneWords[prop].dropRate) {
                return { word: prop, level: level };
            }
            drop -= RuneWords[prop].dropRate;
        }
        return { word: "Tak", level: level };
    }

    static getRuneWordsAndBonuses(runeList) {
        var runewordList = [];
        var idx = 0;

        while (idx < runeList.length) {
            var farthest = -1;
            var tempList = RuneWords;
            var bonusFunc = undefined;
            for (var i = idx; i < runeList.length; i++) {
                if (tempList[runeList[i].word] !== undefined) {
                    if (tempList[runeList[i].word].getBonus !== undefined) {
                        farthest = i;
                        bonusFunc = tempList[runeList[i].word].getBonus;
                    }
                    tempList = tempList[runeList[i].word];
                    continue;
                }
                break;
            }

            if (farthest !== -1) {
                var newWord = "";
                var level = 0;
                for (var i = idx; i <= farthest; i++) {
                    newWord += runeList[i].word;
                    level += runeList[i].level;
                }
                level = Math.floor(level / ((farthest - idx) + 1));
                runewordList.push({
                    word: newWord,
                    level: level,
                    bonus: bonusFunc(level)
                })
                idx = farthest + 1;
            } else {
                idx += 1;
            }
        }
        return runewordList;
    }
}