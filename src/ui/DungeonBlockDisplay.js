import { Common } from "../utils/Common";
import { ProgressBar } from "./ProgressBar";
import { TooltipImage } from "./TooltipImage";

export class DungeonBlockDisplay {
    constructor(sceneContext, x, y, rightAligned = false) {
        //total size is 300x180
        this.x = x;
        this.y = y;
        this.sceneContext = sceneContext;

        // this.backingRect = sceneContext.add.rectangle(x, y, 300, 180, Phaser.Display.Color.GetColor(0, 0, 0)).setOrigin(0, 0);
        // this.backingRect.isStroked = true;
        // this.backingRect.strokeColor = Phaser.Display.Color.GetColor(200, 0, 0);
        // this.backingRect.lineWidth = 2;

        if (rightAligned === true) {
            this.imageRect = sceneContext.add.rectangle(x + 231, y + 25, 64, 64, Phaser.Display.Color.GetColor(0, 0, 0)).setOrigin(0, 0);
            this.imageRect.isStroked = true;
            this.imageRect.strokeColor = Phaser.Display.Color.GetColor(200, 0, 0);
            this.imageRect.lineWidth = 2;
            this.image = sceneContext.add.image(x + 231, y + 25, "enemyicons", 63).setOrigin(0);
            this.image.displayWidth = 64;
            this.image.displayHeight = 64;

            this.nameLabel = sceneContext.add.bitmapText(x + 295, y + 5, "courier20", "").setOrigin(1, 0);
            this.powerLabel = sceneContext.add.bitmapText(x + 205, y + 25, "courier16", "").setOrigin(1, 0);
            this.healthLabel = sceneContext.add.bitmapText(x + 205, y + 45, "courier16", "").setOrigin(1, 0);
            this.armyLabel = sceneContext.add.bitmapText(x + 205, y + 65, "courier16", "").setOrigin(1, 0);

            this.icons = []
            this.icons.push(new TooltipImage(sceneContext, x + 210, y + 25, 16, 16, { sprite: "icons", tile: 24 },
                "Power. How much damage each creature deals with their attack."));
            this.icons.push(new TooltipImage(sceneContext, x + 210, y + 45, 16, 16, { sprite: "icons", tile: 26 },
                "Health. How much damage a creature can take before dying."));
            this.icons.push(new TooltipImage(sceneContext, x + 210, y + 65, 16, 16, { sprite: "icons", tile: 60 },
                "Army Size. How many creatures are fighting in this group. Health and Power are multiplied by this value."));
        } else {
            this.imageRect = sceneContext.add.rectangle(x + 5, y + 25, 64, 64, Phaser.Display.Color.GetColor(0, 0, 0)).setOrigin(0, 0);
            this.imageRect.isStroked = true;
            this.imageRect.strokeColor = Phaser.Display.Color.GetColor(200, 0, 0);
            this.imageRect.lineWidth = 2;
            this.image = sceneContext.add.image(x + 5, y + 25, "enemyicons", 63).setOrigin(0);
            this.image.displayWidth = 64;
            this.image.displayHeight = 64;

            this.nameLabel = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", "");
            this.powerLabel = sceneContext.add.bitmapText(x + 95, y + 25, "courier16", "");
            this.healthLabel = sceneContext.add.bitmapText(x + 95, y + 45, "courier16", "");
            this.armyLabel = sceneContext.add.bitmapText(x + 95, y + 65, "courier16", "");

            this.icons = []
            this.icons.push(new TooltipImage(sceneContext, x + 75, y + 25, 16, 16, { sprite: "icons", tile: 24 },
                "Power. How much damage the army deals with their attack."));
            this.icons.push(new TooltipImage(sceneContext, x + 75, y + 45, 16, 16, { sprite: "icons", tile: 26 },
                "Health. How much damage the army can take before dying."));
            this.icons.push(new TooltipImage(sceneContext, x + 75, y + 65, 16, 16, { sprite: "icons", tile: 60 },
                "Army Size. How many creatures are fighting in this group. Health and Power are multiplied by this value."));
        }


        this.healthBar = new ProgressBar(sceneContext, x + 5, y + 125, 290, 14,
            Phaser.Display.Color.GetColor(170, 0, 0), Phaser.Display.Color.GetColor(32, 32, 32));
    }
    setArmyStats(power, health, armySize, armyDef) {
        this.power = power * armyDef.powerScale;
        this.health = health * armyDef.healthScale;
        this.maxHealth = this.health * armySize;
        this.currentHealth = this.maxHealth;
        this.name = armyDef.name;
        this.texture = armyDef.icon;
    }

    initWithCreature(army) {
        this.nameLabel.setText(army.name);
        this.powerLabel.setText(Common.numberString(Math.floor(army.Power())));
        this.healthLabel.setText(Common.numberString(Math.floor(army.MaxHealth())));
        this.armyLabel.setText(Common.numberString(army.ArmySize()));

        var fillTxt = Common.numberString(army.CurrentHealth()) + "/" + Common.numberString(army.maxHealth);
        this.healthBar.setFillPercent(army.CurrentHealth() / army.maxHealth, fillTxt);
        this.image.setTexture(army.texture.sprite, army.texture.tile);
    }

    setVisible(visible) {
        // this.backingRect.setVisible(visible);
        this.imageRect.setVisible(visible);
        this.image.setVisible(visible);
        this.nameLabel.setVisible(visible);
        this.powerLabel.setVisible(visible);
        this.healthLabel.setVisible(visible);
        this.armyLabel.setVisible(visible);
        this.healthBar.setVisible(visible);
        for (var i = 0; i < this.icons.length; i++) {
            this.icons[i].setVisible(visible);
        }
    }

    getCenterX() { return this.x + 125; }
    getCenterY() { return this.y + 85; }
}