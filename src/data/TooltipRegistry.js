import { Statics } from "./Statics";
import { WorldTime } from "./WorldTime";

export class TooltipRegistry {
    static getTalentTooltip(talent, lvl) {
        switch (talent.name) {
            case "Strength":
                return "Each point of Strength increases your damage more. Increases Damage gained by Strength by " +
                    (lvl * 7) + "% + (7%).";
            case "Dexterity":
                return "Each point of Dexterity gives more Hit. You gain " + (7 + lvl) + " + (1) Hit per Dexterity.";
            case "Agility":
                return "Each point of Agility gives more Evasion. You gain " + (7 + lvl) + " + (1) Evasion per Agility.";
            case "Endurance":
                return "Get more health from Endurance. You gain " + (5 + lvl) + " + (1) max Health per Endurance.";
            case "Recovery":
                return "Heal wounds as fast as you get them! Increases Health Regen from Recovery by " + (lvl * 8) + "% + (8%).";
            case "Defense":
                return "Get more armor from Defense. Increases Armor from Defense by " + (lvl * 13) + "% + (13%).";
            case "Accuracy":
                return "Crit even harder. You gain " + (3 + lvl * 0.5) + " + (0.5) Crit Power per Accuracy.";
            case "Hit":
                return "Gain even more Hit from all sources. Increase your Hit by " + (lvl * 4) + "% + (4%).";
            case "Evasion":
                return "Gain even more Evasion from all sources. Increase your Evasion by " + (lvl * 4) + "% + (4%).";
            case "Critical":
                return "Everyone loves to crit, so here is some free crit chance. Increase your crit chance by " + (lvl * 1) + "% + (1%).";
            case "Bounty":
                return "Somehow improves how much loot enemies drop. Increases your perception or something? Gain a " +
                    (lvl * 10) + "% + (10%) chance for enemies to drop loot twice.";
            case "Explorer":
                return "If you want to explore fast you gotta go fast. Increases your explore speed by " +
                    (lvl * 20) + "% + (20%).";
            case "Cleave":
                return "Hit everything super hard. You gain a 20% chance your attacks hit an additional target dealing " +
                    (lvl * 20) + "% + (20%) of your Strength in damage";
            case "Resilient":
                return "Brush off critical attacks like they were merely normal attacks. When hit by a crit you reduce the damage by " +
                    (lvl * 5) + "% + (5%) of your Endurance, to a minimum of 2.";
            case "Quick Recovery":
                return "All you need is a quick rest between fights and your good to go. Your Health Regen increases by " +
                    (lvl * 25) + "% + (25%) while out of combat.";
            case "Block":
                return "Your mastery of defense allows you to sometimes block part of a hit, isn't that great? You have a 20% chance to block " +
                    (lvl * 25) + " + (25%) of your Defense worth of damage.";
            case "Stunning Hit":
                return "Hit them so hard you leave them concussed, causing serious long term damage. Each attack has a " +
                    (lvl * 5) + "% + (5%) chance to halt their attack bar for 0.5 seconds.";
            case "Follow Through":
                return "The best attacks are those that are immediately followed by more attacks. After attacking, gives a " +
                    (lvl * 5) + "% + (5%) chance that your attack bar starts half full, or half empty if you prefer.";
            case "Dodge":
                return "All the Hit in the world can't touch you some of the time. You automatically dodge every " +
                    (13 - lvl) + " - (1) Attacks against you.";
            case "Defy Death":
                return "Have you tried just... not dying? The next time you take lethal damage, you survive at 1 Health. Can be used again after " +
                    (8 - lvl) + " - (1) encounters. I didn't even know I tracked encounters!";
            case "Second Wind":
                return "All the best heroes are able to get right back to it after a beat down. When you drop below 50% health your " +
                    "Health Regen is tripled for 10 seconds. Has a " + (80 - lvl * 10) + " - (10) second cooldown.";
            case "Parry":
                return "Why block when you can parry? gives a " + (lvl * 5) + "% + (5%) chance an enemy causes a glancing hit, dealing " +
                    "half damage. Thats still something, right?";
            case "Double Crit":
                return "Crit so hard your crits have crits. Gain a chance to crit twice, doubling your crit damage for the attack. Double crit " +
                    "chance is " + (lvl * 1) + "% + (1%) of your normal crit chance.";
            case "Guardian":
                return "Getting invaded while you weren't paying attention sucks. Isn't this supposed to be an idle game? Invasions build up " +
                    (lvl * 25) + "% + (25%) slower.";
            case "Governance":
                return "Spend less time fighting things and more time learning how they can fight for you! Increases economy and production by " +
                    (lvl * 4) + "% + (4%). This effect is multiplicative, not additive.";
            case "Loot Goblin":
                return "Your desire for loot is so strong you've summoned the Loot Goblin! Each enemy has a " +
                    (lvl * 0.5) + "% + (0.5%) chance to be a Loot Goblin, giving 10x the usual reward.";
            case "Bundle":
                return "The villagers say they don't have anymore money to pay you a better bounty, so have these rocks instead! While " +
                    "exploring you earn " + (lvl * 3) + "% + (3%) of the Towns daily production per kill.";
            case "Charisma":
                return "Your screams of terror while fighting the monsters has charmed the villagers. Gain " +
                    (lvl * 10) + "% + (10%) more friendship from killing monsters.";
            case "Town Guard":
                return "Motivate the elderly to throw their bodies at enemy invasions! When the invasion counter reaches 100% you have a " +
                    (lvl * 0.5) + "% + (0.5%) chance per defense to not be invaded! You'll still lose population, but that's a sacrifice " +
                    "you're willing to make.";
        }
    }

    static getTechTooltip(tech, townTier) {
        switch (tech.name) {
            case "Forge":
                return "Each level reduces crafting costs of T" + townTier + " gear and below by 5%. Don't ask me how this works.";
            case "Guilds":
                return "Each level increases resource gain from buildings by 10%.";
            case "Town Hall":
                return "Each level increases Bounty gold from killing monsters in this region by 10%. The best quest is the " +
                    "one that pays the most.";
            case "Market":
                return "Unlocks the Market. Once built the Market increases tax income by 0-5% based on distance to " +
                    "the Town and other Markets.";
            case "Tavern":
                return "Everyone Needs a drink. Unlocks the Tavern, combining your two loves, getting more money and people that " +
                    "pay you money.";
            case "Reinforced Houses":
                return "Every man's home is a castle, but more literal. Increases the defense of all buildings by 1.";
            case "Banking":
                return "Learn how to make money from nothing! Each level increases tax income by 5% and increases your base gold " +
                    "cap by 50.";
            case "Map Making":
                return "Instead of wandering aimlessly, get some villagers to make some maps. Increases exploration speed by 10%.";
        }
    }

    static getMoonlightTooltip(moonlight) {
        switch (moonlight.name) {
            case "Moon's Strength":
                return "Increases your starting Strength by " + (moonlight.level) + " + (1) and increases Strength from all sources by " +
                    (moonlight.level) + "% + (1%).";
            case "Moon's Dexterity":
                return "Increases your starting Dexterity by " + (moonlight.level) + " + (1) and increases Dexterity from all sources by " +
                    (moonlight.level) + "% + (1%).";
            case "Moon's Agility":
                return "Increases your starting Agility by " + (moonlight.level) + " + (1) and increases Agility from all sources by " +
                    (moonlight.level) + "% + (1%).";
            case "Moon's Endurance":
                return "Increases your starting Endurance by " + (moonlight.level) + " + (1) and increases Endurance from all sources by " +
                    (moonlight.level) + "% + (1%).";
            case "Moon's Recovery":
                return "Increases your starting Recovery by " + (moonlight.level) + " + (1) and increases Recovery from all sources by " +
                    (moonlight.level) + "% + (1%).";
            case "Moon's Defense":
                return "Increases your starting Defense by " + (moonlight.level) + " + (1) and increases Defense from all sources by " +
                    (moonlight.level) + "% + (1%).";
            case "Moon's Accuracy":
                return "Increases your starting Accuracy by " + (moonlight.level) + " + (1) and increases Accuracy from all sources by " +
                    (moonlight.level) + "% + (1%).";
            case "Hero's Vault":
                return "Increases the base income per villager by " + (moonlight.level * 0.1) + " + (0.1) gold.";
            case "Moonwine":
                return "Taverns count Town Houses within " + (1 + moonlight.level) + " + (1) tiles for their bonus.";
            case "Hardened Villagers":
                return "Buildings have " + (moonlight.level) + " + (1) more defense.";
            case "Shadow's Blessing":
                return "You gain " + (moonlight.level * 10) + "% + (10%) more shade from monsters.";
            case "Moon Runes":
                return "Unlocks Runes. Runes can be found after exploring a tile and can be socketed into gear to provide a random set of " +
                    "bonuses.";
            case "Dire Beasts":
                return "Dire versions of beasts can be found which are much stronger than their normal counterparts. Defeating them grants " +
                    "bonus shade, resources, and Motes of Darkness.";
            case "Heart of Darkness":
                return "Defeating invasion monsters give " + (moonlight.level) + " + (1) additional Motes of Darkness.";
            case "Blackiron Gear":
                return "Motes of Darkness can reach a " + (20 + moonlight.level * 10) + "% + (10%) bonus before diminishing returns.";
            case "Runelands":
                return "Each region contains " + (5 + moonlight.level) + " + (1) hidden runes.";
            case "Moonlight Workers":
                return "Production buildings generate " + (moonlight.level) + "% + (1%) more resources per defense.";
            case "Hero's Pouch":
                return "Increases your gold cap by " + (moonlight.level * 100) + " + (100) per town.";
            case "Night Market":
                return "Markets increase your economy by 0-" + (5 + moonlight.level) + "% + (1%) based on distance between the Town " +
                    "and other Markets.";
            case "Shadow's Metal":
                return "Metal yields are increased by " + (moonlight.level * 5) + "% + (5%).";
            case "Shadow's Leather":
                return "Leather yields are increased by " + (moonlight.level * 5) + "% + (5%).";
            case "Shadow's Fiber":
                return "Fiber yields are increased by " + (moonlight.level * 5) + "% + (5%).";
            case "Shadow's Stone":
                return "Stone yields are increased by " + (moonlight.level * 5) + "% + (5%).";
            case "Shadow's Wood":
                return "Wood yields are increased by " + (moonlight.level * 5) + "% + (5%).";
            case "Shadow's Crystal":
                return "Crystal yields are increased by " + (moonlight.level * 5) + "% + (5%).";
            case "Shadow's Gold":
                return "Monsters drop " + (moonlight.level * 0.25) + " + (0.25) more gold.";
            case "Discovery":
                return "Gain " + (moonlight.level * 10) + " + (10) friendship each time you fully explore a tile.";
            case "Shadow's Chosen":
                return "Monsters base shade reward increased by " + (moonlight.level * 2) + " + (2). This is added before other multipliers, " +
                    "such as Shadow's Blessing or monster level.";
            case "Corrupted Runes":
                return "Upgrading and Rerolling Runes costs " + Math.floor(Math.pow(0.93, moonlight.level) * 100) + "% - (~7%) fewer Motes of Darkness.";
            case "Soulbound":
                return "Gear gains an additional " + (moonlight.level) + "% + (1%) of their base stats every level.";
            case "Farstrider":
                return "Your explore speed is increased by " + (moonlight.level * 10) + "% + (10%).";
            case "Motivated Labor":
                return "Production is increased by " + (moonlight.level) + "% + (1%) per friendship level.";
            case "Crown Lands":
                return "Each explored tile increases your base gold cap by " + (moonlight.level * 2) + " + (2).";
            case "Mystic Cauldron":
                return "Alchemy Labs create " + (moonlight.level * 10) + "% + (10%) more resources from the same inputs.";
            case "Shadow's Harvest":
                return "Each day you gain " + (moonlight.level * 0.1) + " + (0.1) shade per villager. This bonus is increased by Shadow's Blessing.";
            case "Shadow Wolf Charm":
                return "Unlocks the Shadow Wolf Charm trinket which grants Strength and Damage. Available up to tier " + (moonlight.level) + " + (1)";
            case "Moonlight Circlet":
                return "Unlocks the Moonlight Circlet trinket which grants Dexterity and Hit. Available up to tier " + (moonlight.level) + " + (1)";
            case "Moon Treads":
                return "Unlocks the Moon Treads trinket which grants Agility and Evasion. Available up to tier " + (moonlight.level) + " + (1)";
            case "Moonstone":
                return "Unlocks the Moonstone trinket which grants Endurance, Health, and Crit Resistance. Available up to tier " + (moonlight.level) + " + (1)";
            case "Dreamlight Bracer":
                return "Unlocks the Dreamlight Bracer trinket which grants Recovery and Health Regen. Available up to tier " + (moonlight.level) + " + (1)";
            case "Shadow Veil":
                return "Unlocks the Shadow Veil trinket which grants Defense and Armor. Available up to tier " + (moonlight.level) + " + (1)";
            case "Nightmare Pendant":
                return "Unlocks the Nightmare Pendant trinket which grants Accuracy, Crit Chance and Crit Power. Available up to tier " + (moonlight.level) + " + (1)";
            case "Night Labour":
                return "Unlocks Night Labour for Towns. When active, villagers gold income is reduced by 50% while all production is increased by " + (moonlight.level * 10) + "% + (10%).";
        }
    }

    static getRegionTooltip(regionName) {
        switch (regionName) {
            case "temperate":
                return "A balanced area where all resources are equally abundant.";
            case "mountains":
                return "Mountains and plateau's as far as the eye can see. Home to flying beasts, there is plenty of metal and stone " +
                    "to be found here.";
            case "desert":
                return "A hot desert full of horrible creatures with the occasional dry plains full of hungry beasts. At least the " +
                    "crystals shine in the moonlight.";
            case "forest":
                return "A massive forest full of the oldest trees waiting to be cut down, beasts to be hunted and plants to be gathered.";
            case "hills":
                return "Rolling hills with few plains between them. Full of wild beasts, plants, and the Gnoll's who hunt them.";
        }
    }

    static getChallengeDescription(challenge) {
        switch (challenge.name) {
            case "A Matter of Years":
                return "Now that you've reached out into the world and understand the basics why not do it again, but faster. As they " +
                    "say, practice makes perfect!\n\n" +
                    "Restrictions: Reach the 2nd Gate within " + (5 - challenge.completions) + " Years.\n\n" +
                    "On First Completion: Unlock new challenges.\n" +
                    "On Every Completion: Increases moonlight earned by 15%\n" +
                    "                     +2 Challenge Points\n\n" +
                    "It is possible to fail this challenge!\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Forged Ahead":
                return "Those forge upgrades sure are useful, especially now that all your gear costs " + (10 + challenge.completions * 10) +
                    " times as much.\n\n" +
                    "Restrictions: Gear costs increased by " + (10 + challenge.completions * 10) + " times.\n" +
                    "              Reach the 2nd Gate.\n\n" +
                    "On Every Completion: Gear costs are multiplied by x0.925\n" +
                    "                     +2 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Giant Lands":
                return "Is this land massive, or are you just really small? Each region is smaller, but takes 25 times longer to explore. " +
                    "Also all monsters have the Monstrous " + (2 + 2 * challenge.completions) + " trait.\n\n" +
                    "Restrictions: Exploration needed is increased by 25x\n" +
                    "              Reach Gate " + (1 + challenge.completions) + ".\n\n" +
                    "On Every Completion: Increases explore speed by 25%\n" +
                    "                     +3 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Talentless":
                return "You rely way too much on those talents. Let's see you get through without them.\n\n" +
                    "Restrictions: Talents are removed.\n" +
                    "              Reach Gate " + (3 + challenge.completions) + ".\n\n" +
                    "On Every Completion: Start with +1 Talent points.\n" +
                    "                     Talent costs scale slightly slower.\n" +
                    "                     +3 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Lazy Townsfolk":
                return "None of the townsfolk in this realm know how to work. Either that or they're just really lazy.\n\n" +
                    "Restrictions: Production buildings are unavailable.\n" +
                    "              Reach Gate " + (3 + challenge.completions) + ".\n\n" +
                    "On First Completion: Unlock the Warehouse building.\n" +
                    "On Every Completion: Increases building production by 10%\n" +
                    "                     +4 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Mega Monsters":
                return "*slaps monster* this baby can fit so many traits inside it. How many? " + (4 + challenge.completions * 2) +
                    " traits. That's how many.\n\n" +
                    "Restrictions: Monsters start with " + (4 + challenge.completions * 2) + " traits.\n" +
                    "              Reach Gate " + (5 + challenge.completions) + ".\n\n" +
                    "On Every Completion: Monsters give 5% more shade, plus 1% per trait.\n" +
                    "                     +5 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Outcast":
                return "You rely too much on others. Time to learn the true meaning of friendship.\n\n" +
                    "Restrictions: Building Production reduced by " + (50 + challenge.completions * 10) + "%.\n" +
                    "              Town Upgrades cost 1 level of friendship.\n" +
                    "              Region spans " + (40 + (challenge.completions * 5)) + " levels.\n" +
                    "              Reach Gate " + (5 + challenge.completions) + ".\n\n" +
                    "On Every Completion: Gain 10% more friendship.\n" +
                    "                     Friendship tiers scale slightly slower.\n" +
                    "                     +5 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
        }
    }

    static getTraitTooltip(trait) {
        switch (trait.type) {
            case Statics.TRAIT_DIRE:
                return "Dire " + trait.level + ": Core stats are increased by " + trait.level * 20 + "%, drops motes and gives " +
                    trait.level * 75 + "% more experience.";
            case Statics.TRAIT_POISONED:
                return "Poisoned " + trait.level + ": Deals " + trait.level * 3 + "% of its max damage per second as true damage.";
            case Statics.TRAIT_MONSTROUS:
                return "Monstrous " + trait.level + ": Attack speed is reduced by 15%. Has " + trait.level * 25 + "% increased health and " +
                    trait.level * 10 + "% increased damage.";
            case Statics.TRAIT_QUICK:
                return "Quick " + trait.level + ": Attack speed is increased by 20%. Has " + trait.level * 25 + "% increased evasion.";
            case Statics.TRAIT_DEADLY:
                return "Deadly " + trait.level + ": Crit chance is doubled and has " + trait.level * 5 + "% more damage and crit power.";
            case Statics.TRAIT_SHIELDED:
                return "Shielded " + trait.level + ": Every second gains " + trait.level * 20 + "% of their armor as a shield that " +
                    "absorbs incoming damage. Crit Resistance is increased 1000% while shielded.";
            case Statics.TRAIT_BESERK:
                return "Beserk " + trait.level + ": Hit chance is increased by " + trait.level * 20 + "%, health regen by " +
                    trait.level * 10 + "% and has a " + Math.floor(((1 - Math.pow(0.92, trait.level)) * 100)) + "% chance to trigger Follow Through.";
        }
    }

    static getRuneBonusText(prop, value) {
        var sign = value >= 0 ? "+" : "";
        switch (prop) {
            case "strPercent":
                return sign + Math.round(value * 100) + "% Strength";
            case "strFlat":
                return sign + Math.floor(value) + " Strength";
            case "strTalents":
                return sign + Math.floor(value) + " Strength Talents";
            case "dexPercent":
                return sign + Math.round(value * 100) + "% Dexterity";
            case "dexFlat":
                return sign + Math.floor(value) + " Dexterity";
            case "dexTalents":
                return sign + Math.floor(value) + " Dexterity Talents";
            case "agiPercent":
                return sign + Math.round(value * 100) + "% Agility";
            case "agiFlat":
                return sign + Math.floor(value) + " Agility";
            case "agiTalents":
                return sign + Math.floor(value) + " Agility Talents";
            case "endPercent":
                return sign + Math.round(value * 100) + "% Endurance";
            case "endFlat":
                return sign + Math.floor(value) + " Endurance";
            case "endTalents":
                return sign + Math.floor(value) + " Endurance Talents";
            case "recPercent":
                return sign + Math.round(value * 100) + "% Recovery";
            case "recFlat":
                return sign + Math.floor(value) + " Recovery";
            case "recTalents":
                return sign + Math.floor(value) + " Recovery Talents";
            case "defPercent":
                return sign + Math.round(value * 100) + "% Defense";
            case "defFlat":
                return sign + Math.floor(value) + " Defense";
            case "defTalents":
                return sign + Math.floor(value) + " Defense Talents";
            case "accPercent":
                return sign + Math.round(value * 100) + "% Accuracy";
            case "accFlat":
                return sign + Math.floor(value) + " Accuracy";
            case "accTalents":
                return sign + Math.floor(value) + " Accuracy Talents";
            case "hitPercent":
                return sign + Math.round(value * 100) + "% Hit Chance";
            case "evaPercent":
                return sign + Math.round(value * 100) + "% Evasion";
            case "weaponPercent":
                return sign + Math.round(value * 100) + "% Gear Damage";
            case "armorPercent":
                return sign + Math.round(value * 100) + "% Gear Armor";
            case "critPercent":
                return sign + Math.round(value * 100) + "% Crit Power";
            case "healthPercent":
                return sign + Math.round(value * 100) + "% Health";
            case "regenPercent":
                return sign + Math.round(value * 100) + "% HP Regen";
            case "weaponScaling":
                return sign + Math.round(value * 100) + " Gear Damage Scaling";
            case "armorScaling":
                return sign + Math.round(value * 100) + " Gear Armor Scaling";
            case "baseAttackSpeed":
                return sign + Math.round(value * 100) + "% Faster Attacks";
            case "OOCRegen":
                return sign + value + " Out of Combat Regen";
            case "enemyCrit":
                return Math.round(Math.pow(0.92, value) * 100) + "% Crit Damage Taken";
            case "exploreSpeed":
                return sign + Math.round(value * 100) + "% Explore Speed";
            case "friendshipMulti":
                return sign + Math.round(value * 100) + "% Friendship Earned";
            case "critChance":
                return sign + Math.round(value * 100) + "% Crit Chance";
            case "lootFlat":
                return sign + value + " to Loot Dropped";
            case "lootTalent":
                return sign + value + " Bounty Talent";
            case "moteChance":
                return sign + (Math.round(value * 1000) / 10) + "% Mote on Kill";
            case "shadeFlat":
                return sign + value + " Shade per Kill";
            case "regenOnKill":
                return sign + Math.round(value * 10) / 10 + "s of Regen on Kill";
            case "dexToStr":
                return sign + Math.round(value * 100) + "% Dexterity to Strength";
            case "endToRec":
                return sign + Math.round(value * 100) + "% Endurance to Recovery";
            case "agiToDef":
                return sign + Math.round(value * 100) + "% Agility to Defense";
            case "allPercent":
                return sign + Math.round(value * 100) + "% All Attributes";
            case "governanceTalent":
                return sign + value + " Governance Talent";
            case "guardianTalent":
                return sign + value + " Guardian Talent";
            case "agilityScaling":
                return sign + Math.round(value * 100) + " Agility Explore Scaling";
        }
        return "";
    }
}