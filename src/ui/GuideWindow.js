import { ProgressionStore } from "../data/ProgressionStore";
import { Common } from "../utils/Common";
import { TextButton } from "./TextButton";

export class GuideWindow {
    constructor(scene, x, y) {
        this.backingRect = scene.add.rectangle(x, y, 750, 650, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive();
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backingRect.lineWidth = 2;
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.titleLabel = scene.add.bitmapText(x + 375, y + 10, "courier20", "Darkworld's Book of What to Do").setOrigin(0.5, 0);
        var by = y + 40;
        this.hotkeyBtn = new TextButton(scene, x + 5, by, 120, 20, "Hotkeys").onClickHandler(() => { this._setGuide(-1); });
        by += 22;
        this.gearBtn = ProgressionStore.getInstance().unlocks.gearTab === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Gear").onClickHandler(() => { this._setGuide(0); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.exploreBtn = ProgressionStore.getInstance().unlocks.exploreTab === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Region").onClickHandler(() => { this._setGuide(1); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.combatBtn = ProgressionStore.getInstance().unlocks.combatTab === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Combat").onClickHandler(() => { this._setGuide(2); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.townBtn = ProgressionStore.getInstance().unlocks.townTab === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Town").onClickHandler(() => { this._setGuide(3); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.talentsBtn = ProgressionStore.getInstance().unlocks.talentsTab === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Talents").onClickHandler(() => { this._setGuide(4); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.worldBtn = ProgressionStore.getInstance().unlocks.worldTab === true ?
            new TextButton(scene, x + 5, by, 120, 20, "World").onClickHandler(() => { this._setGuide(5); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.infuseBtn = ProgressionStore.getInstance().unlocks.infuseUI === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Shade").onClickHandler(() => { this._setGuide(6); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.resourceBtn = ProgressionStore.getInstance().unlocks.resourceUI === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Resources").onClickHandler(() => { this._setGuide(7); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.craftingBtn = ProgressionStore.getInstance().unlocks.craftingUI === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Crafting").onClickHandler(() => { this._setGuide(8); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.buildingsBtn = ProgressionStore.getInstance().unlocks.buildings === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Buildings").onClickHandler(() => { this._setGuide(9); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.moteBtn = ProgressionStore.getInstance().unlocks.motes === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Motes").onClickHandler(() => { this._setGuide(10); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.runeBtn = ProgressionStore.getInstance().unlocks.runes === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Runes").onClickHandler(() => { this._setGuide(11); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.challengeBtn = ProgressionStore.getInstance().persistentUnlocks.challenges === true ?
            new TextButton(scene, x + 5, by, 120, 20, "Challenges").onClickHandler(() => { this._setGuide(12); }) :
            new TextButton(scene, x + 5, by, 120, 20, "???");
        by += 22;
        this.btns = [this.hotkeyBtn, this.gearBtn, this.exploreBtn, this.combatBtn, this.townBtn, this.talentsBtn, this.worldBtn, this.infuseBtn,
        this.resourceBtn, this.craftingBtn, this.buildingsBtn, this.moteBtn, this.runeBtn, this.challengeBtn];
        this.guideTexts = [];
        this.closeButton = new TextButton(scene, x + 630, y + 620, 110, 20, "Back");
    }

    _setGuide(num) {
        for (var i = 0; i < this.guideTexts.length; i++) {
            this.guideTexts[i].destroy();
        }
        this.guideTexts = [];
        switch (num) {
            case -1:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Hotkeys"));
                var helptxt = "Why do I have to click so many times? What kind of idle game is this where it takes 3 clicks to build " +
                    "a building that you need HUNDREDS of? Well say no more. Have some sweet sweet hotkeys to rest your delicate wrists. " +
                    "But seriously, please use the hotkeys, clicking that much can't be good for you. While hovering over a tile in the " +
                    "Region tab, press:\n\n" +
                    "* 'R' to build a road\n" +
                    "* 'H' to build a house\n" +
                    "* 'M' to build a market\n" +
                    "* 'T' to build a tavern\n" +
                    "* 'W' to build a warehouse\n" +
                    "* 'A' to build a alchemy lab\n" +
                    "* 'D' to destroy a building\n" +
                    "* 'P' to build a production building matching the tile (eg: Mountains build mines)\n" +
                    "* '1' - '6' to build a specific production building (Wood -> Leather - > Metal -> Fiber - > Stone -> Crystal)\n" +
                    "* 'U' to upgrade a building\n" +
                    "* 'E' to explore a tile\n";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
            case 0:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Gear"));
                var helptxt = "This one's pretty simple, you can equip any gear you find here. You can only have 3 items equipped " +
                    "at a time: a weapon, armor, and a trinket. No, you can't wear boots AND a necklace, that would be STUPID.\n\n" +
                    "You can do more in this tab, but that's for other sections when you unlock them.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
            case 1:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Region"));
                var helptxt = "A huge world to explore. Region's are usually 11x13 tile grids. Each tile has a biome that determines " +
                    "which monsters you'll fight, how long it takes to fully explore, and what kind of resources you can find there. " +
                    "Clicking on tiles you've revealed brings up a dialog with sweet deets and the explore button. " +
                    "Press the explore button to explore, duh. Here's some other poorly explained mechanics:\n\n" +
                    "* A tile's difficulty influences how much time it takes to explore.\n" +
                    "* Yields are partly determined by the neighboring tiles. For example, a mountain surrounded by plains gives less metal " +
                    "than a mountain surrounded by mountains.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 250, "courier20", "Invasions"));
                var helptxt = "After exploring a few tiles the monsters are going to want to take back the land. Every so often the " +
                    "region tab will light up, meaning the monsters are invading a tile. Tiles being invaded flash purple, and if " +
                    "you leave it long enough multiple tiles can be invaded at the same time. Once the invasion counter reachs 100% " +
                    "the monsters will destroy a random invaded tile, removing the building, killing villagers, and covering it in mist forcing you " +
                    "to explore it again. More useful tips:\n\n" +
                    "* The longer a tile is flashing the faster it builds up the invasion counter.\n" +
                    "* Remove invasions by fighting off the invaders. Killing all invaders reduces the invasion counter by 10%.\n" +
                    "* While invasions show up randomly, each flashing tile doubles the time before the next one shows up."
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 280, "courier16", Common.processText(helptxt, 72)));
                break;
            case 2:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Combat"));
                var helptxt = "Where you fight monsters and explore tiles. Fights happen automatically; enemies will attack you and you'll " +
                    "randomly target an enemy. After defeating all the enemies you'll gain some resources and shade. There's a 2.5 second " +
                    "window between fights where you explore the tile and heal your wounds.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
            case 3:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Town"));
                var helptxt = "You've found a whole town of other people. Here you can see a whole bunch of stats for nerds, " +
                    "like how many people live here, your economy/production bonuses, to how much you earn in taxes. You can upgrade " +
                    "buildings or research things like banking to improve the town, all at your expense!";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 160, "courier20", "Economy and Production"));
                var helptxt = "How much money you earn in taxes " +
                    "and your money cap depends on how many villagers live in your town, for some reason. Increasing the economy increases " +
                    "those numbers, and increasing production obviously increases how many resources you produce.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 190, "courier16", Common.processText(helptxt, 72)));
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 260, "courier20", "Friendship"));
                var helptxt = "Finally you have this " +
                    "thing called Friendship. You earn friendship by defeating monsters, and if you collect enough friendship you'll earn " +
                    "more shade. How? Through the power of friendship! Oh, also the villagers won't let you improve things past your " +
                    "friendship level no matter how much you pay them.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 290, "courier16", Common.processText(helptxt, 72)));
                break;
            case 4:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Talents"));
                var helptxt = "Only the coolest of heros get these super cool and interesting talents. Talents are passive benefits " +
                    "that you can unlock by spending talent points. You can buy talent points with shade but the cost quickly increases, " +
                    "so you better choose carefully. Or don't, they probably don't make a huge difference.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
            case 5:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "World"));
                var helptxt = "Who knew there was more than just one region? Me. I did. After fully exploring the topmost tile of a " +
                    "region you unlock the next region in the world tab. You'll have a few choices of which region to explore next, " +
                    "covering a variety of sweet environments, like desert, or mountains. There's no take backsies, once you " +
                    "choose a region thats it, although you can always go back and visit previous regions. Since you've probably " +
                    "found a Mystic Gate already here's some tips:\n\n" +
                    "* Each region has a Mystic Gate that gives you Moonlight based on your total stats/talents.\n" +
                    "* Each gate gives 50% MORE Moonlight than the previous gate. Eg: Region 2 gives 150%, region 3 gives 225%, 337%, etc.\n" +
                    "* If you explore far enough you might unlock something neat.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
            case 6:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Shade"));
                var helptxt = "It's like experience, but edgier! Defeating monsters gives you shade, with stronger monsters giving " +
                    "you more shade. Shade can really only be used for 2 things, so don't go saving it thinking there's going " +
                    "to be some sort of shade shop with a dongle of slaying, because there's not. You can infuse shade to earn " +
                    "2 Stat Points, with the cost increasing by 50 each time. You can also get Talent Points starting at 400 shade " +
                    "bucks.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
            case 7:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Resources"));
                var helptxt = "Pretty much all the cool things are made out of resources. You have 6 of them to collect: Wood, " +
                    "Leather, Metal, Fiber, Stone, and Crystal. You collect some after defeating monsters and they can be used to buy " +
                    "all kinds of things, like town upgrades, gear, or buildings. Each region has it's own super cool tier of resources " +
                    "and won't use any of that junk you found in the region before.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
            case 8:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Crafting"));
                var helptxt = "Once you have enough resources you can spend it on getting better gear. You can spend resources " +
                    "crafting new gear or leveling up gear you already have. Each level increases the gear's stats and costs. Cost " +
                    "per level increase with every level, while stats per level increases every 5th level. You can probably make some " +
                    "better gear once you find some better resources.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
            case 9:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Building"));
                var helptxt = "Finally you can force those villagers to do some work, as long as you cover 100% of the costs. " +
                    "Buildings let you exploit the natural land around you for profit. Once you've unlocked buildings you can " +
                    "click on a tile to see a list of buildings you can build there, such as:\n\n" +
                    "Roads: Can only be built next to docks, the town, or other roads. Pretty much every building uses roads so " +
                    "make sure you can build them.\n\n" +
                    "Houses: Built next to roads, increase the max population in the city.\n\n" +
                    "Production: Buildings like Lumber Mills and Quarries. These give you resources every day based on the yields " +
                    "of a tile. They also have a super complicated efficiency value. Nearby roads increase efficiency or reduce it to " +
                    "0% if no road is close enough. Neighbouring buildings also reduce efficiency, with production buildings giving a " +
                    "big hit to efficiency while houses don't impact it much.\n\n" +
                    "Economy: Taverns, Docks, and Markets all improve a towns gold income, meaning you earn more AND increase your gold cap. " +
                    "Docks also act as roads, letting you expand across water.\n\n" +
                    "Other: The rest, like Watch Towers and Alchemy Labs, that have a variety of effects and don't fit in the other sections.\n\n" +
                    "Buildings can be upgraded with insane amounts of resources and gold to increase their effects. Finally there's " +
                    "defense, which is how quickly invasions build on that tile.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
            case 10:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Motes of Darkness"));
                var helptxt = "These super useful stones can be found from the monsters you defeat in invasions. You know, those glowing " +
                    "purple tiles that you totally don't ingore? Motes can be slapped into gear to give it a whopping 0.25% bonus to " +
                    "its stats! It's so good that it even has diminishing returns after 20%.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
            case 11:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Runes"));
                var helptxt = "Glowing rocks you can slap into your gear. You have a chance to find a rune after fully exploring a tile. " +
                    "Each region only has a handful of runes to find, and you can't do any funny business like letting monsters invade " +
                    "a tile you found a rune in for infinite runes. Runes have a level (based on the region they were found) and can " +
                    "be leveled up with motes. You can also reroll a rune to try and get a better one by spending motes. Runes are " +
                    "basically a motes sink.\n\nHigher tier items have more slots for runes, allowing you to cram even more glowing rocks " +
                    "into them. You may even be able to make rune words by putting them in the right order.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
            case 12:
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 45, "courier20", "Challenges"));
                var helptxt = "The Moon Lord thinks you're okay and so has allowed you to undertake challenges. You can start " +
                    "a challenge at any time, but you won't get any moonlight unless you start one after passing through a " +
                    "Mystic Gate. Challenges change the game, removing features and generally making things a pain. If you complete " +
                    "a challenge you can get some powerful rewards along with a handful of Challenge Points. Challenge Points are " +
                    "pretty much just another stat multiplier to encourage you to do the annoying/boring ones.";
                this.guideTexts.push(this.scene.add.bitmapText(this.x + 150, this.y + 70, "courier16", Common.processText(helptxt, 72)));
                break;
        }
    }

    destroy() {
        this.backingRect.destroy();
        this.titleLabel.destroy();
        this.closeButton.destroy();
        for (var i = 0; i < this.btns.length; i++) {
            this.btns[i].destroy();
        }
        for (var i = 0; i < this.guideTexts.length; i++) {
            this.guideTexts[i].destroy();
        }
    }

    onCloseHandler(callback) {
        this.closeButton.onClickHandler(callback);
        return this;
    }
}