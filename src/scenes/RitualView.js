import { PlayerData } from "../data/PlayerData";
import { RitualData } from "../data/RitualData";
import { TooltipRegistry } from "../data/TooltipRegistry";
import { TextButton } from "../ui/TextButton";
import { TooltipImage } from "../ui/TooltipImage";
import { Common } from "../utils/Common";

export class RitualView {
    constructor(scene, x, y) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        this.ritualElements = [];
        this.sacLabels = [];
        this.elements = [];
    }

    create() {
        var backRect = this.scene.add.rectangle(this.x, this.y, 900, 700, 0x000000)
            .setOrigin(0)
            .setInteractive();

        this._refreshRituals();

        var titleLabel = this.scene.add.bitmapText(this.x + 450, this.y + 30, "courier20",
            "CULT OF THE BETRAYER STAR", 20, 1).setOrigin(0.5, 0);
        titleLabel.setTint(Phaser.Display.Color.GetColor(133, 105, 255));
        var desc = "Spend Ritual Points to perform Rituals, corrupting the Mystic Gates and changing the " +
            "next world. Ritual Points are gained by sacrificing large quantities of resources. " +
            "All Ritual effects, including permanent bonuses, take effect on your next run. Works " +
            "in challenges too!";
        var descLabel = this.scene.add.bitmapText(this.x + 450, this.y + 60, "courier16",
            Common.processText(desc, 60), 16, 1).setOrigin(0.5, 0);
        descLabel.setTint(Phaser.Display.Color.GetColor(133, 105, 255));
        var currentLabel = this.scene.add.bitmapText(this.x + 100, this.y + 52, "courier20",
            "CURRENT", 20, 1).setOrigin(0.5, 0);
        this.currentMoonLabel = this.scene.add.bitmapText(this.x + 100, this.y + 80, "courier20",
            "Moonlight: " + Common.numberString(Math.floor(RitualData.getInstance().moonlightBonus * 100)) + "%", 20, 1)
            .setOrigin(0.5, 0);
        this.currentMoonLabel.setTint(Phaser.Display.Color.GetColor(206, 238, 240));
        this.currentStarLabel = this.scene.add.bitmapText(this.x + 100, this.y + 100, "courier20",
            "Star Shards: " + Common.numberString(Math.floor(RitualData.getInstance().starshardBonus * 100)) + "%", 20, 1)
            .setOrigin(0.5, 0);
        this.currentStarLabel.setTint(Phaser.Display.Color.GetColor(177, 100, 169));
        var nextLabel = this.scene.add.bitmapText(this.x + 800, this.y + 60, "courier20",
            "NEXT WORLD", 20, 1).setOrigin(0.5, 0);
        this.nextMoonLabel = this.scene.add.bitmapText(this.x + 800, this.y + 80, "courier20",
            "Moonlight: " + Common.numberString(Math.floor(RitualData.getInstance().nextMoonlightBonus * 100)) + "%", 20, 1)
            .setOrigin(0.5, 0);
        this.nextMoonLabel.setTint(Phaser.Display.Color.GetColor(206, 238, 240));
        this.nextStarLabel = this.scene.add.bitmapText(this.x + 800, this.y + 100, "courier20",
            "Star Shards: " + Common.numberString(Math.floor(RitualData.getInstance().nextStarshardBonus * 100)) + "%", 20, 1)
            .setOrigin(0.5, 0);
        this.nextStarLabel.setTint(Phaser.Display.Color.GetColor(177, 100, 169));

        var empowerLabel = this.scene.add.bitmapText(this.x + 168, this.y + 168, "courier20",
            "Rituals of\nEmpowerment", 20, 1).setOrigin(0.5, 0);
        var corruptionLabel = this.scene.add.bitmapText(this.x + 432, this.y + 168, "courier20",
            "Rituals of\nCorruption", 20, 1).setOrigin(0.5, 0);
        var destructionLabel = this.scene.add.bitmapText(this.x + 696, this.y + 168, "courier20",
            "Rituals of\nDestruction", 20, 1).setOrigin(0.5, 0);
        var exchangeLabel = this.scene.add.bitmapText(this.x + 696, this.y + 480, "courier20",
            "Rituals of\nExchange", 20, 1).setOrigin(0.5, 0);

        var sacrificeRect = this.scene.add.rectangle(this.x + 290, this.y + 460, 300, 240, 0x000000).setOrigin(0);
        sacrificeRect.isStroked = true;
        sacrificeRect.strokeColor = Phaser.Display.Color.GetColor(180, 180, 180);
        sacrificeRect.lineWidth = 2;

        var sacTitle = this.scene.add.bitmapText(this.x + 440, this.y + 465, "courier20",
            "Tablet of Sacrifice", 20, 1).setOrigin(0.5, 0);
        sacTitle.setTint(Phaser.Display.Color.GetColor(220, 100, 60));
        var h = 500;
        var woodImg = new TooltipImage(this.scene, this.x + 295, this.y + h + 2, 16, 16,
            { sprite: "icons", tile: 32 }, "Wood. Found in forests and wodes, duh.");
        var sacWoodBtn = new TextButton(this.scene, this.x + 390, this.y + h, 40, 20, "Sac")
            .onClickHandler(() => { this._sacResource(0); });
        h += 25;
        var leatherImg = new TooltipImage(this.scene, this.x + 295, this.y + h + 2, 16, 16,
            { sprite: "icons", tile: 33 }, "Leather. The best leather comes from the plains and forests.");
        var sacLeatherBtn = new TextButton(this.scene, this.x + 390, this.y + h, 40, 20, "Sac")
            .onClickHandler(() => { this._sacResource(1); });
        h += 25;
        var metalImg = new TooltipImage(this.scene, this.x + 295, this.y + h + 2, 16, 16,
            { sprite: "icons", tile: 34 }, "Metal. Hard to find resource thats available in large quantities in the mountains.");
        var sacMetalBtn = new TextButton(this.scene, this.x + 390, this.y + h, 40, 20, "Sac")
            .onClickHandler(() => { this._sacResource(2); });
        h += 25;
        var fiberImg = new TooltipImage(this.scene, this.x + 295, this.y + h + 2, 16, 16,
            { sprite: "icons", tile: 35 }, "Fiber. Found in swamps and forests.");
        var sacFiberBtn = new TextButton(this.scene, this.x + 390, this.y + h, 40, 20, "Sac")
            .onClickHandler(() => { this._sacResource(3); });
        h += 25;
        var stoneImg = new TooltipImage(this.scene, this.x + 295, this.y + h + 2, 16, 16,
            { sprite: "icons", tile: 36 }, "Stone. Can be found in abundance in the hills.");
        var sacStoneBtn = new TextButton(this.scene, this.x + 390, this.y + h, 40, 20, "Sac")
            .onClickHandler(() => { this._sacResource(4); });
        h += 25;
        var crystalImg = new TooltipImage(this.scene, this.x + 295, this.y + h + 2, 16, 16,
            { sprite: "icons", tile: 37 }, "Crystal. Hard to find in large amounts, but can be found in the harder to reach areas.");
        var sacCrystalBtn = new TextButton(this.scene, this.x + 390, this.y + h, 40, 20, "Sac")
            .onClickHandler(() => { this._sacResource(5); });
        h += 25;
        var goldImg = new TooltipImage(this.scene, this.x + 295, this.y + h + 2, 16, 16,
            { sprite: "icons", tile: 38 }, "Gold. How much cold, hard, cash you have.");
        var sacGoldBtn = new TextButton(this.scene, this.x + 390, this.y + h, 40, 20, "Sac")
            .onClickHandler(() => { this._sacResource(6); });
        h += 25;
        var moteImg = new TooltipImage(this.scene, this.x + 295, this.y + h + 2, 16, 16,
            { sprite: "icons", tile: 39 }, "Motes of Darkness. Fuse these onto weapons to improve their power.");
        var sacMotesBtn = new TextButton(this.scene, this.x + 390, this.y + h, 40, 20, "Sac")
            .onClickHandler(() => { this._sacResource(7); });
        this._refreshSacrificeLabels();

        var ritPointIcon = new TooltipImage(this.scene, this.x + 475, this.y + 510, 32, 32,
            { sprite: "icons2", tile: 6 }, "Ritual Points. Each Ritual costs a single point to activate, regardless of level.");
        this.ritualPointsLabel = this.scene.add.bitmapText(this.x + 515, this.y + 515, "courier20",
            Common.numberString(RitualData.getInstance().ritualPoints), 20, 1);
        this.ritualPointsLabel.setTint(Phaser.Display.Color.GetColor(220, 100, 60));
        desc = "Sacrifice T8 resources, gold, and motes to earn Ritual Points.";
        var sacDescLabel = this.scene.add.bitmapText(this.x + 510, this.y + 550, "courier16",
            Common.processText(desc, 18), 16, 1).setOrigin(0.5, 0);
        sacDescLabel.setTint(Phaser.Display.Color.GetColor(220, 100, 60));

        this.elements = [backRect, titleLabel, descLabel, currentLabel, this.currentMoonLabel, this.currentStarLabel,
            nextLabel, this.nextMoonLabel, this.nextStarLabel, empowerLabel, corruptionLabel, destructionLabel,
            exchangeLabel, sacWoodBtn, sacLeatherBtn, sacMetalBtn, sacFiberBtn, sacStoneBtn, sacCrystalBtn, sacGoldBtn,
            sacMotesBtn, woodImg, leatherImg, metalImg, fiberImg, stoneImg, crystalImg, goldImg, moteImg, sacrificeRect,
            sacTitle, ritPointIcon, this.ritualPointsLabel, sacDescLabel];
    }

    _canSacResource(id) {
        switch (id) {
            case 0:
                return PlayerData.getInstance().resources[7][0] > RitualData.getInstance().ritualCosts[0];
            case 1:
                return PlayerData.getInstance().resources[7][1] > RitualData.getInstance().ritualCosts[1];
            case 2:
                return PlayerData.getInstance().resources[7][2] > RitualData.getInstance().ritualCosts[2];
            case 3:
                return PlayerData.getInstance().resources[7][3] > RitualData.getInstance().ritualCosts[3];
            case 4:
                return PlayerData.getInstance().resources[7][4] > RitualData.getInstance().ritualCosts[4];
            case 5:
                return PlayerData.getInstance().resources[7][5] > RitualData.getInstance().ritualCosts[5];
            case 6:
                return PlayerData.getInstance().gold > RitualData.getInstance().ritualCosts[6];
            case 7:
                return PlayerData.getInstance().motes > RitualData.getInstance().ritualCosts[7];
        }
        return false;
    }

    _sacResource(id) {
        if (this._canSacResource(id) === false) {
            return;
        }
        switch (id) {
            case 0:
                PlayerData.getInstance().spendResource([RitualData.getInstance().ritualCosts[0], 0, 0, 0, 0, 0], 7);
                RitualData.getInstance().increaseSacCost(id);
                break;
            case 1:
                PlayerData.getInstance().spendResource([0, RitualData.getInstance().ritualCosts[1], 0, 0, 0, 0], 7);
                RitualData.getInstance().increaseSacCost(id);
                break;
            case 2:
                PlayerData.getInstance().spendResource([0, 0, RitualData.getInstance().ritualCosts[2], 0, 0, 0], 7);
                RitualData.getInstance().increaseSacCost(id);
                break;
            case 3:
                PlayerData.getInstance().spendResource([0, 0, 0, RitualData.getInstance().ritualCosts[3], 0, 0], 7);
                RitualData.getInstance().increaseSacCost(id);
                break;
            case 4:
                PlayerData.getInstance().spendResource([0, 0, 0, 0, RitualData.getInstance().ritualCosts[4], 0], 7);
                RitualData.getInstance().increaseSacCost(id);
                break;
            case 5:
                PlayerData.getInstance().spendResource([0, 0, 0, 0, 0, RitualData.getInstance().ritualCosts[5]], 7);
                RitualData.getInstance().increaseSacCost(id);
                break;
            case 6:
                PlayerData.getInstance().addGold(-RitualData.getInstance().ritualCosts[6]);
                RitualData.getInstance().increaseSacCost(id);
                break;
            case 7:
                PlayerData.getInstance().addMote(-RitualData.getInstance().ritualCosts[7]);
                RitualData.getInstance().increaseSacCost(id);
                break;
        }
        this._refreshSacrificeLabels();
        this.ritualPointsLabel.setText(Common.numberString(RitualData.getInstance().ritualPoints));
    }

    _levelUpRitual(ritual) {
        // if (RitualData.getInstance().ritualPoints <= 0) {
        //     return;
        // }
        ritual.level += 1;
        RitualData.getInstance().ritualPoints -= 1;
        RitualData.getInstance().calculateModifiers();
        this.ritualPointsLabel.setText(Common.numberString(RitualData.getInstance().ritualPoints));

        this.nextMoonLabel.setText("Moonlight: " + Common.numberString(Math.floor(RitualData.getInstance().nextMoonlightBonus * 100)) + "%");
        this.nextStarLabel.setText("Star Shards: " + Common.numberString(Math.floor(RitualData.getInstance().nextStarshardBonus * 100)) + "%");
    }

    _setupRitualElement(ritual) {
        var txt = ritual.name + " Lv" + ritual.level + "\n" + TooltipRegistry.getRitualTooltip(ritual) + "\n\n";
        var btn = new TooltipImage(this.scene, this.x + ritual.pos[0], this.y + ritual.pos[1],
            48, 48, ritual.texture, txt, [450, 150], 53);
        btn.onClickHandler(() => {
            this._levelUpRitual(ritual);
            this._refreshRituals();
        });
        return btn;
    }

    _refreshRituals() {
        for (var i = 0; i < this.ritualElements.length; i++) {
            this.ritualElements[i].destroy();
        }
        this.ritualElements = [];
        for (const prop in RitualData.getInstance().rituals) {
            this.ritualElements.push(this._setupRitualElement(RitualData.getInstance().rituals[prop]));
        }
    }

    _refreshSacrificeLabels() {
        for (var i = 0; i < this.sacLabels.length; i++) {
            this.sacLabels[i].destroy();
        }
        this.sacLabels = [];
        for (var i = 0; i < RitualData.getInstance().ritualCosts.length; i++) {
            this.sacLabels.push(this.scene.add.bitmapText(this.x + 320, this.y + 502 + i * 25, "courier16",
                Common.numberString(RitualData.getInstance().ritualCosts[i])));
        }
    }

    setVisible(visible) {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].setVisible(visible);
        }
        for (var i = 0; i < this.ritualElements.length; i++) {
            this.ritualElements[i].setVisible(visible);
        }
        for (var i = 0; i < this.sacLabels.length; i++) {
            this.sacLabels[i].setVisible(visible);
        }
    }
}