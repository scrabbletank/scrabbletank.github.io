import { Common } from "../utils/Common";
import { PlayerData } from "./PlayerData";
import { Statics } from "./Statics";
import { WorldData } from "./WorldData";
import { WorldTime } from "./WorldTime";

export class TooltipRegistry {

    static setDefaultNames() {
        TooltipRegistry.critPowerName = "Crit Power";
        TooltipRegistry.defenseName = "Defense";
        TooltipRegistry.accuracyName = "Accuracy";
    }

    static setWizardNames() {
        TooltipRegistry.critPowerName = "Spell Power";
        TooltipRegistry.defenseName = "Ward";
        TooltipRegistry.accuracyName = "Power";
    }

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
                    Math.max(3, 13 - lvl) + " - (1) Attacks against you.";
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
                return "Invasions are too strong! If you spend some time patrolling you can probably divide Invasion Power by " +
                    (1 + lvl / 5) + " + (0.2).";
            case "Governance":
                return "Spend less time fighting things and more time learning how they can fight for you! Increases economy and production by " +
                    (lvl * 4) + "% + (4%). This effect is multiplicative, not additive.";
            case "Loot Goblin":
                return "Your desire for loot is so strong you've summoned the Loot Goblin! Each enemy has a " +
                    (lvl * 0.5) + "% + (0.5%) chance to be a Loot Goblin, giving 10x the resources and shade.";
            case "Bundle":
                return "The villagers say they don't have anymore money to pay you a better bounty, so have these rocks instead! While " +
                    "exploring you earn " + (lvl * 2) + "% + (2%) of the Towns daily production per kill.";
            case "Charisma":
                return "Your screams of terror while fighting the monsters has charmed the villagers. Gain " +
                    (lvl * 10) + "% + (10%) more friendship from killing monsters.";
            case "Town Guard":
                return "Motivate the elderly to throw their bodies at enemy invasions! When the invasion counter reaches 100% you have a " +
                    (lvl * 0.5) + "% + (0.5%) chance per defense to not be invaded! You'll still lose population, but that's a sacrifice " +
                    "you're willing to make.";
            // WIZARD TALENTS
            case "Cantrip":
                return "Only one spell will cast per attack. Every attack you deal " + (20 + lvl * 9) + "% + (9%) of your spellpower in magic damage.";
            case "First Level Spell":
                return "Study the Arcane Arts! This talent must be maxed to cast Entangle. Gives a modest " + (lvl) + "% + (1%) to your max spellpower.";
            case "Second Level Spell":
                return "Study Elegant Enchantments! This talent must be maxed to cast Barrier. Gives a modest " + (lvl) + "% + (1%) to your max spellpower.";
            case "Third Level Spell":
                return "Study the Wizardly Ways! This talent must be maxed to cast Fireball. Gives a modest " + (lvl) + "% + (1%) to your max spellpower.";
            case "Fourth Level Spell":
                return "Study Confusing Codices! This talent must be maxed to cast Haste. Gives a modest " + (lvl) + "% + (1%) to your max spellpower.";
            case "Fifth Level Spell":
                return "Study Empowered Evocations! This talent must be maxed to cast Power Word Kill. Gives a modest " + (lvl) + "% + (1%) to your max spellpower.";
            case "Entagle":
                return "Only one spell will cast per attack. Every 4th attack you slow a creature's attack speed by 40% for " +
                    (2 + lvl * 0.25) + " + (0.25) seconds.";
            case "Thorns":
                return "In their feeble attempt to catch you, monsters take " + (lvl * 3) + "% + (3%) of your Evasion in magic damage per second while slowed.";
            case "Barrier":
                return "Only one spell will cast per attack. Every 13th attack you add " + (40 * lvl) + "% + (40%) of your ward to your shield.";
            case "Shell":
                return "Who needs endurance when you have magic? Increases your Crit Resistance by " + (15 * lvl) + "% + (15%) while your shield is up.";
            case "Fireball":
                return "Only one spell will cast per attack. Every 5th attack you cast the only spell that matters, dealing " + (7 * lvl) +
                    "% + (7%) of your spellpower to all monster in magic damage. You didn't ask how big the room is, you said 'I cast Fireball'.";
            case "Ignite":
                return "Watch the monsters burn. Fun! Your fireballs ignite monsters, dealing 25% of its damage per second for " + (1 + lvl * 0.5) +
                    " + (0.5) seconds.";
            case "Haste":
                return "Only one spell will cast per attack. Every 6th attack you gain haste for 3 attacks. While hasted your attack bar starts " + (7.5 * lvl) +
                    "% + (7.5%) full.";
            case "Quicken":
                return "You've remembered that haste also makes you move faster! While haste is active your Evasion is increased by " + (5 * lvl) +
                    "% + (5%).";
            case "Power Word Kill":
                return "Only one spell may cast per attack. Every 9th attack you command a monster to play dead, dealing anywhere from 0% - " + (100 + lvl * 25) + "% + (25%) of your spellpower in magic damage.";
            case "Power Word Stun":
                return "Your words leave them so dumbfounded that they forget to attack. If you deal at least " + (80 - lvl * 7) +
                    "% - (7%) of its max damage the target is stunned for 2 seconds.";
            case "Alchemy":
                return "To pay for your crippling potion dependency you transmute monsters to gold! Gain " + (5 * lvl) +
                    " + (5) gold every 10th kill, increased by the towns economy multiplier.";
            case "Elective Studies: Strength":
                return "Learn the ancient art of casting Fist. Increase damage from Strength by " + (5 * lvl) + "% + (5%).";
            case "Elective Studies: Dexterity":
                return "Learn how to cast more spells more faster. Increases hit chance from Dexterity by " + (lvl) + " + (1).";
            case "Elective Studies: Agility":
                return "You never skipped cardio day in Wizard PE. Increases evasion from Agility by " + ((lvl * 7) / 10) + " + (0.7).";
            case "Elective Studies: Endurance":
                return "The only way wizards could survive long enough to cast the really cool spells. Increases health from Endurance by " + ((lvl * 7.5) / 10) + " + (0.75).";
            case "Runemancy":
                return "Harness the runic magic to empower your spells. Each socketed run in your equipment increases your spellpower by " + (lvl) + "% + (1%).";
            case "Magic Armor":
                return "You didn't spend 10 years at wizard school to use yuvky, non-magical armor. Add " + (lvl * 20) + "% + (20%) " +
                    "of your gears armor to your Shield at the start of combat.";
            case "Magic Weapon":
                return "Magic Weapons, from a more civilized time. Add " + (lvl * 10) + "% + (10%) " +
                    "of your gears damage to your Spell Power.";
            case "Chromatic Codex":
                return "You've mastered the ancient scrolls and now you can read from the Chromatic Codex. It's pretty underwhelming, " +
                    "but it increases your spellpower by " + (lvl * 6) + "% + (6%).";
        }
        return talent.name + ": Missing Tooltip";
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
            case "Barracks":
                return "Build a place for your villagers to practice fighting and show off how much they can lift. Increases Villager Power by 20% per level.";
            case "Armory":
                return "You found that if you give the villagers some scraps from the forge they die less. Increases Villager Health by 20% per level.";
        }
        return tech.name + ": Missing Tooltip";
    }

    static getMoonlightTooltip(moonlight) {
        switch (moonlight.name) {
            case "Moon's Strength":
                return "Increases your starting Strength by " + (moonlight.level) + " + (1) and increases Strength from all sources by " +
                    (moonlight.level * 0.5) + "% + (0.5%).";
            case "Moon's Dexterity":
                return "Increases your starting Dexterity by " + (moonlight.level) + " + (1) and increases Dexterity from all sources by " +
                    (moonlight.level * 0.5) + "% + (0.5%).";
            case "Moon's Agility":
                return "Increases your starting Agility by " + (moonlight.level) + " + (1) and increases Agility from all sources by " +
                    (moonlight.level * 0.5) + "% + (0.5%).";
            case "Moon's Endurance":
                return "Increases your starting Endurance by " + (moonlight.level) + " + (1) and increases Endurance from all sources by " +
                    (moonlight.level * 0.5) + "% + (0.5%).";
            case "Moon's Recovery":
                return "Increases your starting Recovery by " + (moonlight.level) + " + (1) and increases Recovery from all sources by " +
                    (moonlight.level * 0.5) + "% + (0.5%).";
            case "Moon's Defense":
                return "Increases your starting Defense by " + (moonlight.level) + " + (1) and increases Defense from all sources by " +
                    (moonlight.level * 0.5) + "% + (0.5%).";
            case "Moon's Accuracy":
                return "Increases your starting Accuracy by " + (moonlight.level) + " + (1) and increases Accuracy from all sources by " +
                    (moonlight.level * 0.5) + "% + (0.5%).";
            case "Hero's Vault":
                return "Increases the base income per villager by " + (moonlight.level) / 10 + " + (0.1) gold.";
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
                return "Each day you gain " + (moonlight.level) / 10 + " + (0.1) shade per villager. This bonus is increased by Shadow's Blessing.";
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
                return "Unlocks Night Labour for Towns. When active, villagers gold income is reduced by 50% while all production is increased by " +
                    (moonlight.level * 10) + "% + (10%).";
            case "Devotion":
                return "Increases Villager Power and Health by " + (moonlight.level * 10) + "% + (10%).";
            case "Ninjas":
                return "Dojo's give " + (moonlight.level * 25) + "% + (25%) more Villager Power and Health per week.";
            case "Urbanization":
                return "Town Houses can fit " + (moonlight.level) + " + (1) more population per level.";
        }
        return moonlight.name + ": Missing Tooltip";
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
        return regionName + ": Missing Tooltip";
    }

    static getRegionImage(regionName) {
        switch (regionName) {
            case "unknown":
                return { sprite: "icons", tile: 58 };
            case "hills":
                return { sprite: "icons", tile: 59 };
            case "desert":
                return { sprite: "icons", tile: 57 };
            default:
                return { sprite: "icons", tile: 40 };
        }
    }

    static getChallengeDescription(challenge) {
        var completions = Math.min(challenge.maxCompletions, challenge.completions);
        switch (challenge.name) {
            case "A Matter of Years":
                return "Now that you've reached out into the world and understand the basics why not do it again, but faster. As they " +
                    "say, practice makes perfect!\n\n" +
                    "Restrictions: Reach the 2nd Gate within " + (5 - completions) + " Years.\n\n" +
                    "On First Completion: Unlock new challenges.\n" +
                    "On Every Completion: Increases moonlight earned by 15%\n" +
                    "                     +2 Challenge Points\n\n" +
                    "It is possible to fail this challenge!\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Forged Ahead":
                return "Those forge upgrades sure are useful, especially now that all your gear costs " + (10 + completions * 10) +
                    " times as much.\n\n" +
                    "Restrictions: Gear costs increased by " + (10 + completions * 10) + " times.\n" +
                    "              Reach the 2nd Gate.\n\n" +
                    "On Every Completion: Gear costs are multiplied by x0.925\n" +
                    "                     +2 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Giant Lands":
                return "Is this land massive, or are you just really small? Each region is smaller, but takes 25 times longer to explore. " +
                    "Also all monsters have the Monstrous " + (2 + 2 * completions) + " trait.\n\n" +
                    "Restrictions: Exploration needed is increased by 25x\n" +
                    "              Reach Gate " + (1 + completions) + ".\n\n" +
                    "On Every Completion: Increases explore speed by 25%\n" +
                    "                     +3 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Invasion":
                return "Invasions, everyones favourite feature! I made the invasion timer reaaal small so you can enjoy it to the fullest. " +
                    "Oh, also invasion monsters have +" + (5 + 5 * completions) + " levels, and if you lose a tile to an invasion it's " +
                    "difficulty increases by the same amount.\n\n" +
                    "Restrictions: Reach Gate " + (1 + completions) + ".\n\n" +
                    "On First Completion: Auto explore auto fights invasions, giving 25% motes.\n" +
                    "On Every Completion: Invasions take 25% longer to destroy a tile.\n" +
                    "                     +3 Challenge Points\n\n" +
                    "On Final Completion: Auto explore gives 100% motes.\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Talentless":
                return "You rely way too much on those talents. Let's see you get through without them.\n\n" +
                    "Restrictions: Talents are removed.\n" +
                    "              Reach Gate " + (3 + completions) + ".\n\n" +
                    "On Every Completion: Start with +1 Talent points.\n" +
                    "                     Talent costs scale slightly slower.\n" +
                    "                     +3 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Lazy Townsfolk":
                return "None of the townsfolk in this realm know how to work. Either that or they're just really lazy.\n\n" +
                    "Restrictions: Production buildings are unavailable.\n" +
                    "              Reach Gate " + (3 + completions) + ".\n\n" +
                    "On First Completion: Unlock the Warehouse building.\n" +
                    "                     Unlocks Blueprints\n\n" +
                    "On Every Completion: Increases building production by 10%\n" +
                    "                     +4 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Mega Monsters":
                return "*slaps monster* this baby can fit so many traits inside it. How many? " + (4 + completions * 2) +
                    " traits. That's how many.\n\n" +
                    "Restrictions: Monsters start with " + (4 + completions * 2) + " traits.\n" +
                    "              Reach Gate " + (5 + completions) + ".\n\n" +
                    "On Every Completion: Monsters give 5% more shade, plus 1% per trait.\n" +
                    "                     +5 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "Outcast":
                return "You rely too much on others. Time to learn the true meaning of friendship.\n\n" +
                    "Restrictions: Building Production reduced by " + (50 + completions * 10) + "%.\n" +
                    "              Town Upgrades cost 1 level of friendship.\n" +
                    "              Region spans " + (30 + (completions * 5)) + " levels.\n" +
                    "              Reach Gate " + (4 + completions) + ".\n\n" +
                    "On First Completion: Unlocks Auto Upgrade.\n" +
                    "On Every Completion: Gain 10% more friendship.\n" +
                    "                     Friendship tiers scale slightly slower.\n" +
                    "                     +5 Challenge Points\n\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
            case "The Tower of Ultimate Wizard-y":
                return "Oh no! Evil wizards are attacking the Towers of Ultimate Wizardy! Is that a mispelling? A reference? Who knows! " +
                    "You must seek out the ancient spires and keep them safe while you research the ultimate spell. Each tower, once " +
                    "revealed, contributes to your knowledge. Mastering the spell will summon a Mystic Gate, enter it to complete the" +
                    "challenge.\n\n" +
                    "Restrictions: Region spans " + (60 + (completions * 10)) + " levels.\n" +
                    "              Invasions are more frequent and lead by an evil wizard that deals magic damage.\n" +
                    "              Invasions can happen anywhere.\n" +
                    "              Invasions gradually get stronger.\n" +
                    "              Losing all 4 Spires fails the challenge and immediately causes a rebirth.\n\n" +
                    "On Every Completion: Wizard starts with +2 Talent Points.\n" +
                    "                     +5 Challenge Points\n\n" +
                    "On Final Completion: Unlocks the Spire building.\n" +
                    "Completions: " + challenge.completions + "/" + challenge.maxCompletions + "\n" +
                    "Fastest Time: " + new WorldTime(challenge.fastestTime).getTimespanText();
        }
        return challenge.name + ": Missing Tooltip";
    }

    static getTraitTooltip(trait) {
        switch (trait.type) {
            case Statics.TRAIT_DIRE:
                return "Dire " + trait.level + ": Core stats are increased by " + trait.level * 20 + "%, drops motes, and gives " +
                    trait.level * 75 + "% more experience.";
            case Statics.TRAIT_POISONED:
                return "Poisoned " + trait.level + ": Deals " + trait.level * 2 + "% of its max damage per second as true damage. Damage " +
                    "doubles when below half health.";
            case Statics.TRAIT_MONSTROUS:
                return "Monstrous " + trait.level + ": Attack speed is reduced by 15%. Has " + trait.level * 25 + "% increased health and " +
                    trait.level * 10 + "% increased damage.";
            case Statics.TRAIT_QUICK:
                return "Quick " + trait.level + ": Attack speed is increased by 20%. Has " + trait.level * 25 + "% increased evasion.";
            case Statics.TRAIT_DEADLY:
                return "Deadly " + trait.level + ": Crit chance is doubled and has " + trait.level * 30 + "% more crit power.";
            case Statics.TRAIT_SHIELDED:
                return "Shielded " + trait.level + ": Every second gains " + trait.level * 20 + "% of their armor as a shield that " +
                    "absorbs incoming damage. Crit Resistance is increased 1000% while shielded.";
            case Statics.TRAIT_BESERK:
                return "Beserk " + trait.level + ": Hit chance is increased by " + trait.level * 20 + "%, health regen by " +
                    trait.level * 10 + "% and has a " + Math.floor(((1 - Math.pow(0.92, trait.level)) * 100)) +
                    "% chance to trigger Follow Through.";
            case Statics.TRAIT_FIRSTSTRIKE:
                return "First Strike " + trait.level + ": Starts combat with their attack bar filled to 95% and gain " +
                    trait.level * 25 + "% more Accuracy.";
            case Statics.TRAIT_INVADER:
                var inc = Math.floor((WorldData.getInstance().getInvasionPower() - 1) * 100);
                var reward = Math.floor((WorldData.getInstance().invasionReward - 1) * 100);
                return "Invader: These monsters are infused with a dark power, increasing their stats by " + Common.numberString(inc) +
                    "% and giving " + Common.numberString(reward) + "% more shade, and motes.";
            case Statics.TRAIT_CORROSIVE:
                return "Corrosive " + trait.level + ": Reduces your armor by " + trait.level + "% of its min damage.";
            case Statics.TRAIT_REGENERATING:
                return "Regenerating " + trait.level + ": Has " + (trait.level * 30) + "% more health regen.";
            case Statics.TRAIT_THORNS:
                return "Thorns " + trait.level + ": Has " + (trait.level * 10) + "% more armor. When attacked, it deals 20% " +
                    "of its armor in magic damage.";
        }
        return trait.type + ": Missing Tooltip. Better report this to the dev.";
    }

    static getTraitImage(trait) {
        switch (trait.type) {
            case Statics.TRAIT_DIRE:
                return { sprite: "icons", tile: 43 };
            case Statics.TRAIT_POISONED:
                return { sprite: "icons", tile: 46 };
            case Statics.TRAIT_MONSTROUS:
                return { sprite: "icons", tile: 42 };
            case Statics.TRAIT_QUICK:
                return { sprite: "icons", tile: 49 };
            case Statics.TRAIT_DEADLY:
                return { sprite: "icons", tile: 41 };
            case Statics.TRAIT_SHIELDED:
                return { sprite: "icons", tile: 44 };
            case Statics.TRAIT_BESERK:
                return { sprite: "icons", tile: 45 };
            case Statics.TRAIT_FIRSTSTRIKE:
                return { sprite: "icons", tile: 56 };
            case Statics.TRAIT_CORROSIVE:
                return { sprite: "icons2", tile: 2 };
            case Statics.TRAIT_REGENERATING:
                return { sprite: "icons", tile: 12 };
            case Statics.TRAIT_THORNS:
                return { sprite: "icons2", tile: 3 };
            case Statics.TRAIT_INVADER:
                return { sprite: "icons", tile: 39 };
        }
        return { sprite: "icons", tile: 0 };
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
                return sign + Math.round(value * 100) + "% " + TooltipRegistry.defenseName;
            case "defFlat":
                return sign + Math.floor(value) + " " + TooltipRegistry.defenseName;
            case "defTalents":
                return sign + Math.floor(value) + " Defense Talents";
            case "accPercent":
                return sign + Math.round(value * 100) + "% " + TooltipRegistry.accuracyName;
            case "accFlat":
                return sign + Math.floor(value) + " " + TooltipRegistry.accuracyName;
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
                return sign + Math.round(value * 100) + "% " + TooltipRegistry.critPowerName;
            case "healthPercent":
                return sign + Math.round(value * 100) + "% Health";
            case "regenPercent":
                return sign + Math.round(value * 100) + "% HP Regen";
            case "weaponScaling":
                return sign + Math.round(value * 400) + " Gear Damage Scaling";
            case "armorScaling":
                return sign + Math.round(value * 400) + " Gear Armor Scaling";
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
                return sign + Math.round(value * 200) + " Agility Explore Scaling";
        }
        return "";
    }

    static getBonusText(prop, value) {
        var sign = value >= 0 ? "+" : "";
        switch (prop) {
            case "health":
                return sign + Common.numberString(Math.floor(value)) + " Health";
            case "damageMin":
                return sign + Common.numberString(Math.floor(value)) + " Min Dmg";
            case "damageMax":
                return sign + Common.numberString(Math.floor(value)) + " Max Dmg";
            case "strength":
                return sign + Common.numberString(Math.floor(value)) + " Strength";
            case "dexterity":
                return sign + Common.numberString(Math.floor(value)) + " Dexterity";
            case "agility":
                return sign + Common.numberString(Math.floor(value)) + " Agility";
            case "endurance":
                return sign + Common.numberString(Math.floor(value)) + " Endurance";
            case "recovery":
                return sign + Common.numberString(Math.floor(value)) + " Recovery";
            case "defense":
                return sign + Common.numberString(Math.floor(value)) + " " + TooltipRegistry.defenseName;
            case "accuracy":
                return sign + Common.numberString(Math.floor(value)) + " " + TooltipRegistry.accuracyName;
            case "hit":
                return sign + Common.numberString(Math.floor(value)) + " Hit";
            case "evasion":
                return sign + Common.numberString(Math.floor(value)) + " Evasion";
            case "critPower":
                // this is trash don't look plz
                if (TooltipRegistry.critPowerName === "Spell Power") {
                    return sign + Common.numberString(Math.floor(value / 3)) + " " + TooltipRegistry.critPowerName;
                }
                return sign + Common.numberString(Math.floor(value)) + " " + TooltipRegistry.critPowerName;
            case "critResistance":
                return sign + Common.numberString(Math.floor(value)) + " Crit Resist";
            case "critChance":
                return sign + Common.numberString(Math.floor(value * 100)) + "% Crit Chance";
            case "healthRegen":
                return sign + Common.numberString(Math.floor(value * 10) / 10) + "/s HP Regen";
            case "armor":
                return sign + Common.numberString(Math.floor(value)) + " Armor";
        }
        return "";
    }

    static getCostText(type, value) {
        switch (type) {
            case 0:
                return Common.numberString(Math.floor(value)) + " Wood";
            case 1:
                return Common.numberString(Math.floor(value)) + " Leather";
            case 2:
                return Common.numberString(Math.floor(value)) + " Metal";
            case 3:
                return Common.numberString(Math.floor(value)) + " Fiber";
            case 4:
                return Common.numberString(Math.floor(value)) + " Stone";
            case 5:
                return Common.numberString(Math.floor(value)) + " Crystal";
        }
        return "";
    }

    static getDungeonRewardTooltip(reward) {
        switch (reward.type) {
            case Statics.DUNGEON.RESOURCES:
                return "A stockpile of resources, enough for exactly " + reward.amount + " days of average production for all resources!";
            case Statics.DUNGEON.SHADE:
                return "You thought it was just a shadow, but it's really " + Common.numberString(reward.amount) + " Shade. Nice!";
            case Statics.DUNGEON.MOTES:
                return "The final monster barfed up " + Common.numberString(reward.amount) + " Motes of Darkness.";
            case Statics.DUNGEON.GOLD:
                return "A 'Dragons Horde' worth of gold, or " + Common.numberString(reward.amount) + " pieces.";
            case Statics.DUNGEON.GEAR_LEVELS:
                return "Your not really sure how, but get " + Common.numberString(reward.amount) + " levels to your equiped gear.";
            case Statics.DUNGEON.RUNES:
                return "The monsters were guarding " + Common.numberString(reward.amount) + " random Runes. Nice!";
            case Statics.DUNGEON.WOOD:
                return "A design for a sweet woodcutting axe. Increase wood production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.LEATHER:
                return "A design for a sweet skinning knife. Increase leather production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.METAL:
                return "A design for a sweet pickaxe. Increase metal production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.FIBER:
                return "A design for a sweet loom.. thing? Increase fiber production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.STONE:
                return "A design for a sweet stone cutter. Increase stone production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.CRYSTAL:
                return "A design for a sweet crystal spinner. Increase crystal production by " + Math.floor(reward.amount * 100) + "% in every region.";
            case Statics.DUNGEON.PRODUCTION:
                return "Some mysterious device that keeps spinning. Apparently it can increase production by " +
                    Math.floor(reward.amount * 100) + "%, but only in this town.";
            case Statics.DUNGEON.ECONOMY:
                return "Nothing. But some villagers came up with an idea to turn this into a tourist trap increasing the economy by " +
                    Math.floor(reward.amount * 100) + "%, but only in this town.";
            case Statics.DUNGEON.STRENGTH:
                return "A Swoling Potion. Increases your Strength by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.DEXTERITY:
                return "A Manual depecting all the ways to stab someone. Increases your Dexterity by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.AGILITY:
                return "A Potion of Moving Real Fast. Increases your Agility by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.ENDURANCE:
                return "Literally just steroids. Increases your Endurance by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.RECOVERY:
                return "Magical healing goop. Increases your Recovery by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.DEFENSE:
                return "A Potion of Hardening. Kinky! Increases your Defense by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.ACCURACY:
                return "A Magical Laser Pointer. Increases your Accuracy by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.MOONLIGHT:
                return "Moon Dust. Increases Moonlight earned this rebirth by " + Math.floor(reward.amount * 100) + "%.";
            case Statics.DUNGEON.TALENTS:
                return "A wise old man who says he can teach you how to earn " + reward.amount + " talent points.";
            case Statics.DUNGEON.PERM_VPOWER:
                return "Body oil that makes the villagers muscles glisten, permanently increasing Villager Power by " + Math.floor(reward.amount * 100) / 100 + ".";
            case Statics.DUNGEON.PERM_VHEALTH:
                return "A pot of dubious looking stew, permanently increasing Villager Health by " + Math.floor(reward.amount * 100) / 100 + ".";
        }
    }

    static getDungeonRewardImage(reward) {
        switch (reward.type) {
            case Statics.DUNGEON.RESOURCES:
                return { sprite: "icons", tile: 52 };
            case Statics.DUNGEON.SHADE:
                return { sprite: "moonicons", tile: 12 };
            case Statics.DUNGEON.MOTES:
                return { sprite: "icons", tile: 39 };
            case Statics.DUNGEON.GOLD:
                return { sprite: "icons", tile: 38 };
            case Statics.DUNGEON.GEAR_LEVELS:
                return { sprite: "icons", tile: 28 };
            case Statics.DUNGEON.RUNES:
                return { sprite: "runeicons", tile: 1 };
            case Statics.DUNGEON.WOOD:
                return { sprite: "icons", tile: 32 };
            case Statics.DUNGEON.LEATHER:
                return { sprite: "icons", tile: 33 };
            case Statics.DUNGEON.METAL:
                return { sprite: "icons", tile: 34 };
            case Statics.DUNGEON.FIBER:
                return { sprite: "icons", tile: 35 };
            case Statics.DUNGEON.STONE:
                return { sprite: "icons", tile: 36 };
            case Statics.DUNGEON.CRYSTAL:
                return { sprite: "icons", tile: 37 };
            case Statics.DUNGEON.PRODUCTION:
                return { sprite: "icons", tile: 50 };
            case Statics.DUNGEON.ECONOMY:
                return { sprite: "bldicons", tile: 32 };
            case Statics.DUNGEON.STRENGTH:
                return { sprite: "icons", tile: 8 };
            case Statics.DUNGEON.DEXTERITY:
                return { sprite: "icons", tile: 9 };
            case Statics.DUNGEON.AGILITY:
                return { sprite: "icons", tile: 10 };
            case Statics.DUNGEON.ENDURANCE:
                return { sprite: "icons", tile: 11 };
            case Statics.DUNGEON.RECOVERY:
                return { sprite: "icons", tile: 12 };
            case Statics.DUNGEON.DEFENSE:
                return { sprite: "icons", tile: 13 };
            case Statics.DUNGEON.ACCURACY:
                return { sprite: "icons", tile: 14 };
            case Statics.DUNGEON.MOONLIGHT:
                return { sprite: "moonicons", tile: 20 };
            case Statics.DUNGEON.TALENTS:
                return { sprite: "icons", tile: 61 };
            case Statics.DUNGEON.PERM_VPOWER:
                return { sprite: "icons", tile: 24 };
            case Statics.DUNGEON.PERM_VHEALTH:
                return { sprite: "icons", tile: 26 };
        }
        return { sprite: "icons", tile: 0 };
    }

    static getStarPerkTooltip(perk) {
        switch (perk.name) {
            case "Astra's Marble: Strength":
                return "Your base Strength (ignoring gear) is increased by " + (perk.level * 1000) + "% + (1000%).";
            case "Astra's Marble: Dexterity":
                return "Your base Dexterity (ignoring gear) is increased by " + (perk.level * 1000) + "% + (1000%).";
            case "Astra's Marble: Agility":
                return "Your base Agility (ignoring gear) is increased by " + (perk.level * 1000) + "% + (1000%).";
            case "Astra's Marble: Endurance":
                return "Your base Endurance (ignoring gear) is increased by " + (perk.level * 1000) + "% + (1000%).";
            case "Astra's Marble: Recovery":
                return "Your base Recovery (ignoring gear) is increased by " + (perk.level * 1000) + "% + (1000%).";
            case "Astra's Marble: Defense":
                return "Your base Defense (ignoring gear) is increased by " + (perk.level * 1000) + "% + (1000%).";
            case "Astra's Marble: Accuracy":
                return "Your base Accuracy (ignoring gear) is increased by " + (perk.level * 1000) + "% + (1000%).";
            case "Ingram's Bell: Infusion":
                return "Base Stat Point cost reduced by " + (perk.level * 2) + " + (2).";
            case "Ingram's Bell: Stat Points":
                return "Gain " + (perk.level) + " + (1) more Stat Points when infusing.";
            case "Ingram's Bell: Bounty":
                return "Monsters drop " + (perk.level * 50) + "% + (50%) more resources.";
            case "Myrah's Spear: Forge":
                return "Reduces gear costs by " + Math.floor((1 - Math.pow(0.95, moonlight.level)) * 100) + "% + (~5%). This ignores the gear cost softcap.";
            case "Myrah's Spear: Stellar Enchantments":
                return "Gear gives " + (perk.level * 10) + "% + (10%) more stats.";
            case "Myrah's Spear: Proficiency":
                return "Increases gear scaling from stats by " + (perk.level * 10) + "% + (10%).";
            case "Myrah's Spear: Starmetal":
                return "Newly crafted gear starts at level " + (perk.level * 5) + " + (5).";
            case "Mask of Zymesh: Invasion Power":
                return "Divides Invasion Power by " + (perk.level + 1) + " + (1).";
            case "Mask of Zymesh: Invasion Rewards":
                return "Increases Invasion Rewards by " + (perk.level * 50) + "% + (50%).";
            case "Mask of Zymesh: Solidification":
                return "Monsters have a " + (perk.level * 10) + "% + (10%) chance per trait level to drop a Mote of Darkness. Having over 100% gives a chance " +
                    "of dropping multiple Motes.";
            case "Kella's Horn: Construction":
                return "Buildings can be upgraded to tier 4.";
            case "Kella's Horn: Worldsmith":
                return "Resources start at Tier " + (perk.level + 1) + " + (1). Upgrades, Gear, and Buildings that used resources below this tier now use T" +
                    (perk.level + 1) + " resources.";
            case "Kella's Horn: Enchanted Tools":
                return "Increases building production by " + (perk.level * 25) + "% + (25%).";
            case "Kella's Horn: Estate":
                return "Houses hold " + (perk.level * 50) + "% + (50%) more people.";
            case "Betrayer Star: Mists":
                return "Increases Shade earned by " + (perk.level * 25) + "% + (25%).";
            case "Betrayer Star: Forbidden Knowledge":
                return "Talents give " + (perk.level * 2) + " + (2) more moonlight, before multipliers.";
            case "Betrayer Star: Mysticism":
                return "Cost multiplier for sacrificing resources becomes x" + (10 - perk.level / 2) + " - (0.5).";
        }
    }
}

// static fuckery

TooltipRegistry.critPowerName = "Crit Power";
TooltipRegistry.defenseName = "Defense";
TooltipRegistry.accuracyName = "Accuracy";