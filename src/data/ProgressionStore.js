import { Statics } from "./Statics";
import { Common } from "../utils/Common";
import { MoonlightData } from "./MoonlightData";

export class ProgressionStore {
    constructor() {
        if (!ProgressionStore.instance) {
            this.unlocks = {
                // Tabs
                gearTab: false,
                exploreTab: false,
                combatTab: false,
                townTab: false,
                talentsTab: false,
                worldTab: false,
                // Mechanics
                infuseUI: false,
                resourceUI: false,
                craftingUI: false,
                buildings: false,
                motes: false,
                runes: false
            };
            this.exploreUnlocks = [
                {
                    count: 1,
                    text: "Well that's everything I can see in this area. If I want to keep searching " +
                        "I'll need to leave this weirdly square land and find another square to explore. " +
                        "You think you saw a town in the distance towards the north, but you could be seeing things."
                },
                {
                    count: 5,
                    text: "You've seen a lot of what this world has to offer by now, and most of it wants " +
                        "to kill you. The people in the town seem nice though, and many of them have been wanting " +
                        "some way to help out. With the lands sort of safe to walk again they can get back to working.\n\n" +
                        "The only problem is they don't have anything to build with so they want you to bring them some " +
                        "from the monsters you've been killing."
                },
                {
                    count: 10,
                    text: "Your surprised at how easy this has been going. Sure, every day is a new battle for your life " +
                        "against horrible shadow monsters, but the tile's you've cleared seem way more vibrant and full of life.\n\n" +
                        "Some of the townsfolk have been worried that the mists will return but the odds of that happening have " +
                        "got to be astronomically low. Just to get them off your back you told them to give you some kind of " +
                        "alert on the Region tab if something goes wrong. Hah! Like that will ever happen."
                },
                {
                    count: 30,
                    text: "From what the townsfolk have told me there's a barrier preventing people from leaving this " +
                        "region. I wonder what happens after I explore every tile there is to explore?"
                },
                {
                    count: 70,
                    text: "How many years has it been since I started this journey? All the days sort of melt together " +
                        "into one long blur of monster slaying. You swear it's only been like, 1, 2 days tops though."
                }
            ];
            this.killUnlocks = [
                {
                    count: 1,
                    text: "What the hell was that? It looked like a normal beast, but like, made " +
                        "of shadows? Is this whole land filled with these monsters?"
                },
                {
                    count: 5,
                    text: "You're starting to get the hang of this, although your starting to " +
                        "wonder what happened to the previous owner of this gear..."
                },
                {
                    count: 100,
                    text: "You did it, you've killed your 100th monster. This accomplishment fills you " +
                        "with pride for a moment before you shrug and move onto the next one."
                }
            ];
            this.shadeUnlocks = [
                {
                    count: 50,
                    text: "These strange monsters have been leaving behind these shadowy.. things. " +
                        "I think I'll call them shade. It's strange, but I'm pretty sure it wants me " +
                        "to do something with it."
                },
                {
                    count: 400,
                    text: "Now that I've collected enough of this shade stuff, I think I can do " +
                        "something even better with it, I just need enough of it all in one place."
                },
                {
                    count: 5000,
                    text: "I've found a load of this shade stuff, where is it all coming from?"
                },
            ];
            this.resourceUnlocks = [
                {
                    count: 25,
                    text: "I've noticed some monsters leave behind more than just shadows. things like wood, stone " +
                        "and metal.... Definitely things they shouldn't have inside them. You have enough now that " +
                        "you could try and improve your gear with them. Slapping some metal onto the end of your " +
                        "sword should do the trick."
                },
                {
                    count: 100,
                    text: "You have so many resources your not sure what to do with them. Maybe its time to try your " +
                        "hand at making some new gear? You've strapped enough garbage around your broken sword that " +
                        "it's more of a club now then anything. You don't have a forge or tools, but it can't be harder " +
                        "than upgrading your gear."
                },
                {
                    count: 1000,
                    text: "So let me get this straight. It costs, what, 30-40 resources to craft a sword, but hundreds to " +
                        "make it a little sharper? The townsfolk assure me this is normal, but I'm starting to think they just " +
                        "want me to bring them free resources."
                }
            ];
            this.statPointUnlocks = [
                {
                    count: 1,
                    text: "You finally got enough of that shade to try something. You grab a handful of the stuff and try " +
                        "squeezing it into a ball only to find it slip from your hands and enter your chest! You look around " +
                        "and see '+1 Stat Point' appear above your head. You're not sure what that means, but you " +
                        "feel stronger than you did before! You're pretty sure you'll need even more shade to do this again, " +
                        "but at least you found one use for it."
                },
                {
                    count: 25,
                    text: "You're not entirely sure what this shade is doing, but boy do you feel strong!"
                },
                {
                    count: 50,
                    text: "You've been infusing a lot of shade lately, is there a limit to how much your body can take?"
                },
                {
                    count: 100,
                    text: "doesn't seem like it. At least 100 isn't the limit."
                },
                {
                    count: 300,
                    text: "I've lost count. By all measures my abilities shouldn't be humanly possible, yet I'm still finding " +
                        "monsters stronger than me."
                }
            ];
            this.deathUnlocks = [
                {
                    count: 1,
                    text: "It was bound to happen eventually, you're not exactly adventurer material. You open your eyes, " +
                        "wondering where the next stage of existence will take you... and it looks like, wilderness? Wait a " +
                        "minute, you know this place! This is where you died! Or not? You pick yourself up and dust off your " +
                        "clothes, turns out your injuries aren't as bad as you thought.\n\n" +
                        "Looking over your gear it seems you lost some of your shade, is that what those things were after?"
                },
                {
                    count: 5,
                    text: "I guess I should be happy these things aren't killing me, but getting knocked out this many times " +
                        "can't be good for me."
                },
                {
                    count: 12,
                    text: "I feel like I'm not paying enough attention, wandering around thinking about what I should do next, " +
                        "how my gear is doing, then suddenly BAM! Ambushed by a literal whale and knocked unconscious."
                }
            ];
            // any one off lore that doesnt fit into the above should go here to be tracked better
            this.loreUnlocks = {
                cultists1: {
                    unlocked: false,
                    text: "This is the largest mountain you've ever seen, taking up not one, but 5 whole tiles! It looks like " +
                        "this mountain already has people living here, wearing robes and chanting strange words. You thought " +
                        "they might be friendly, but when you tried to talk to them they cast spells at you, dealing Magic Damage " +
                        "and bypassing your armor.\n\nThat sounds like cheating and you can't stand cheaters. You can see " +
                        "a spooky looking fortress at the top of this mountain. Time to give those magic nerds a piece of your mind."
                },
                cultists2: {
                    unlocked: false,
                    text: "Finally fighting your way through the cultist fortress you've arrived at the peak of Doom Mountain. " +
                        "Standing on the edge of the cliff is the cultist leader.\n\n" +
                        "\"I see you've bested my cult, and I am no match for you. You must be here to destroy my Tome of " +
                        "Forbidden Knowledge which holds the secrets to money, fame, and power?\"\n\n" +
                        "Money, Fame, Power? I like all of those things. You talk to the cultist some more, and while he " +
                        "keeps talking about a bunch of nerd stuff like eldritch horrors, terrible curses, and corrupting " +
                        "your eternal soul he can summon the best sandwich I've ever had. All it requires is 'sufficient " +
                        "resources' to prepare the ritual. That doesn't sound too bad!\n\nRITUALS UNLOCKED"
                }
            };
            this.loreTexts = {
            };
            this.exploresUnlocked = 0;
            this.killsUnlocked = 0;
            this.shadesUnlocked = 0;
            this.resourceUnlocked = 0;
            this.statPointUnlocked = 0;
            this.deathUnlocked = 0;

            this.counts = {
                tilesExplored: 0,
                monsterKills: 0,
                shadeGained: 0,
                resourcesGained: 0,
                statPointsGained: 0,
                deaths: 0
            };

            this.persistentUnlocks = {
                challenges: false,
                autoExplore: false,
                wizardClass: false,
                dungeons: false,
                starshards: false,
                rituals: false,
                autoExplore2: false,
                autoGear: false,
                autoTown: false
            }

            this.totalCounts = {
                tilesExplored: 0,
                monsterKills: 0,
                shadeGained: 0,
                resourcesGained: 0,
                statPointsGained: 0,
                deaths: 0,
                timesGated: 0
            }

            this.onUnlockHandlers = [];
            ProgressionStore.instance = this;
        }

        return ProgressionStore.instance;
    }

    static getInstance() {
        if (!ProgressionStore.instance) {
            return new ProgressionStore();
        }
        return ProgressionStore.instance;
    }

    rebirth() {
        this.unlocks = {
            // Tabs
            gearTab: false,
            exploreTab: false,
            combatTab: false,
            townTab: false,
            talentsTab: MoonlightData.getInstance().challenges.talent.completions > 0,
            worldTab: false,
            // Mechanics
            infuseUI: false,
            resourceUI: false,
            craftingUI: false,
            buildings: false,
            motes: false,
            runes: false
        };
        this.exploresUnlocked = 0;
        this.killsUnlocked = 0;
        this.shadesUnlocked = 0;
        this.resourceUnlocked = 0;
        this.statPointUnlocked = 0;
        this.deathUnlocked = 0;

        this.counts = {
            tilesExplored: 0,
            monsterKills: 0,
            shadeGained: 0,
            resourcesGained: 0,
            statPointsGained: 0,
            deaths: 0
        };

        this.totalCounts.timesGated += 1;
        this.persistentUnlocks.autoExplore = true;
    }

    _onUnlock(type, count, text) {
        for (var i = 0; i < this.onUnlockHandlers.length; i++) {
            this.onUnlockHandlers[i](type, count, text);
        }
    }

    addOnUnlockHandler(callback) {
        this.onUnlockHandlers.push(callback);
    }

    registerTileExplored() {
        this.counts.tilesExplored += 1;
        this.totalCounts.tilesExplored += 1;
        for (var i = this.exploresUnlocked; i < this.exploreUnlocks.length; i++) {
            if (this.exploreUnlocks[i].count <= this.counts.tilesExplored) {
                this._onUnlock(Statics.UNLOCK_EXPLORE, this.exploreUnlocks[i].count, this.exploreUnlocks[i].text);
                this.exploresUnlocked = i + 1;
            }
        }
    }
    registerMonsterKill() {
        this.counts.monsterKills += 1;
        this.totalCounts.monsterKills += 1;
        for (var i = this.killsUnlocked; i < this.killUnlocks.length; i++) {
            if (this.killUnlocks[i].count <= this.counts.monsterKills) {
                this._onUnlock(Statics.UNLOCK_KILL, this.killUnlocks[i].count, this.killUnlocks[i].text);
                this.killsUnlocked = i + 1;
            }
        }
    }
    registerShadeGain(shade) {
        this.counts.shadeGained += shade;
        this.totalCounts.shadeGained += shade;
        for (var i = this.shadesUnlocked; i < this.shadeUnlocks.length; i++) {
            if (this.shadeUnlocks[i].count <= this.counts.shadeGained) {
                this._onUnlock(Statics.UNLOCK_SHADE, this.shadeUnlocks[i].count, this.shadeUnlocks[i].text);
                this.shadesUnlocked = i + 1;
            }
        }
    }
    registerResourceGain(resourceList) {
        this.counts.resourcesGained += Common.sumList(resourceList);
        this.totalCounts.resourcesGained += Common.sumList(resourceList);
        for (var i = this.resourceUnlocked; i < this.resourceUnlocks.length; i++) {
            if (this.resourceUnlocks[i].count <= this.counts.resourcesGained) {
                this._onUnlock(Statics.UNLOCK_RESOURCE, this.resourceUnlocks[i].count, this.resourceUnlocks[i].text);
                this.resourceUnlocked = i + 1;
            }
        }
    }
    registerStatPointGain(amount) {
        this.counts.statPointsGained += amount;
        this.totalCounts.statPointsGained += amount;
        for (var i = this.statPointUnlocked; i < this.statPointUnlocks.length; i++) {
            if (this.statPointUnlocks[i].count <= this.counts.statPointsGained) {
                this._onUnlock(Statics.UNLOCK_STATPOINT, this.statPointUnlocks[i].count, this.statPointUnlocks[i].text);
                this.statPointUnlocked = i + 1;
            }
        }
    }
    registerDeath(amount) {
        this.counts.deaths += amount;
        this.totalCounts.deaths += amount;
        for (var i = this.deathUnlocked; i < this.deathUnlocks.length; i++) {
            if (this.deathUnlocks[i].count <= this.counts.deaths) {
                this._onUnlock(Statics.UNLOCK_DEATH, this.deathUnlocks[i].count, this.deathUnlocks[i].text);
                this.deathUnlocked = i + 1;
            }
        }
    }
    registerLore(name) {
        if (this.loreUnlocks[name] !== undefined && this.loreUnlocks[name].unlocked === false) {
            this._onUnlock(Statics.UNLOCK_GENERIC, 0, this.loreUnlocks[name].text);
            this.loreUnlocks[name].unlocked = true;
        }
    }

    registerFeatureUnlocked(feature, text) {
        switch (feature) {
            case Statics.UNLOCK_GEAR_TAB:
                this.unlocks.gearTab = true;
                break;
            case Statics.UNLOCK_EXPLORE_TAB:
                this.unlocks.exploreTab = true;
                break;
            case Statics.UNLOCK_COMBAT_TAB:
                this.unlocks.combatTab = true;
                break;
            case Statics.UNLOCK_TOWN_TAB:
                this.unlocks.townTab = true;
                break;
            case Statics.UNLOCK_TALENTS_TAB:
                this.unlocks.talentsTab = true;
                break;
            case Statics.UNLOCK_INFUSE_UI:
                this.unlocks.infuseUI = true;
                break;
            case Statics.UNLOCK_RESOURCE_UI:
                this.unlocks.resourceUI = true;
                break;
            case Statics.UNLOCK_CRAFTING_UI:
                this.unlocks.craftingUI = true;
                break;
            case Statics.UNLOCK_BUILDING_UI:
                this.unlocks.buildings = true;
                break;
            case Statics.UNLOCK_MOTES_UI:
                this.unlocks.motes = true;
                break;
            case Statics.UNLOCK_WORLD_TAB:
                this.unlocks.worldTab = true;
                break;
            case Statics.UNLOCK_RUNES_UI:
                this.unlocks.runes = true;
                break;
            case Statics.UNLOCK_GENERIC:
                break;
        }

        this._onUnlock(feature, 0, text);
    }

    save() {
        var loreUnlocks = [];
        for (const prop in this.loreUnlocks) {
            loreUnlocks.push([prop, this.loreUnlocks[prop].unlocked]);
        }
        var saveObj = {
            un: this.unlocks,
            eun: this.exploresUnlocked,
            kun: this.killsUnlocked,
            sun: this.shadesUnlocked,
            run: this.resourceUnlocked,
            stun: this.statPointUnlocked,
            dun: this.deathUnlocked,
            count: this.counts,
            tcount: this.totalCounts,
            pun: this.persistentUnlocks,
            lore: this.loreUnlocks
        }

        return saveObj;
    }

    load(saveObj, ver) {
        this.unlocks = saveObj.un;
        this.exploresUnlocked = saveObj.eun;
        this.killsUnlocked = saveObj.kun;
        this.shadesUnlocked = saveObj.sun;
        this.resourceUnlocked = saveObj.run;
        this.statPointUnlocked = saveObj.stun;
        this.deathUnlocked = saveObj.dun;
        this.counts = saveObj.count;
        this.totalCounts = saveObj.tcount;
        for (const prop in saveObj.pun) {
            this.persistentUnlocks[prop] = saveObj.pun[prop];
        }
        if (saveObj.lore !== undefined) {
            for (var i = 0; i < saveObj.lore.length; i++) {
                if (this.loreUnlocks[saveObj.lore[i][0]] !== undefined) {
                    this.loreUnlocks[saveObj.lore[i][0]].unlocked = saveObj.lore[i][1];
                }
            }
        }
    }
}