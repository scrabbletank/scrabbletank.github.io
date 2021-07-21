import { ProgressBar } from './ProgressBar';
import { TooltipImage } from './TooltipImage';
import { Common } from '../utils/Common';
import { TooltipRegistry } from '../data/TooltipRegistry';
import { Statics } from '../data/Statics';

export class CreatureDisplay {
    constructor(sceneContext, x, y) {
        //total size is 200x170

        this.x = x;
        this.y = y;
        this.sceneContext = sceneContext;

        this.backingRect = sceneContext.add.rectangle(x, y, 250, 170, Phaser.Display.Color.GetColor(0, 0, 0)).setOrigin(0, 0);
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(200, 0, 0);
        this.backingRect.lineWidth = 2;
        // to replace with image
        this.imageRect = sceneContext.add.rectangle(x + 5, y + 5, 64, 64, Phaser.Display.Color.GetColor(0, 0, 0)).setOrigin(0, 0);
        this.imageRect.isStroked = true;
        this.imageRect.strokeColor = Phaser.Display.Color.GetColor(200, 0, 0);
        this.imageRect.lineWidth = 2;
        this.image = sceneContext.add.image(x + 5, y + 5, "enemyicons", 63).setOrigin(0);
        this.image.displayWidth = 64;
        this.image.displayHeight = 64;

        this.nameLabel = sceneContext.add.bitmapText(x + 75, y + 5, "courier20", "");
        //stats
        // this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 25 },
        //     "Health, when this runs out you die."));
        // this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 24 },
        //     "The damage you deal with each attack. Your damage is reduced by the targets armor, dealing a minimum of 1 damage."));
        // this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 26 },
        //     "Armor. Each point reduces damage from enemy attacks by 1."));
        // this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 27 },
        //     "Hit Chance. Hit increases your attack speed, while enemy Evasion lowers your attack speed."));
        // this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 28 },
        //     "Evasion. Slows enemy attack speed if you have more Evasion then their Hit."));
        // this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 29 },
        //     "Health Regen. You restore this much Health every second. Works in combat."));
        // this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 31 },
        //     "Crit Chance. The chance any hit is a critical hit, dealing extra damage."));
        // this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 30 },
        //     "Crit Power. Increases your crit damage, but is reduced by the targets Crit Resistance."));
        // this.detailsIcons.push(new TooltipImage(this, 20, 170, 16, 16, { sprite: "icons", tile: 48 },
        //     "Crit Resistance. Reduces the damage taken by critical hits."));
        this.statIcons = [];
        this.statIcons.push(new TooltipImage(this.sceneContext, this.x + 75, this.y + 25, 16, 16,
            { sprite: "icons", tile: 24 }, "Damage dealt with each attack."));
        this.statIcons.push(new TooltipImage(this.sceneContext, this.x + 75, this.y + 45, 16, 16,
            { sprite: "icons", tile: 26 }, "How much damage is prevented."));
        this.statIcons.push(new TooltipImage(this.sceneContext, this.x + 75, this.y + 65, 16, 16,
            { sprite: "icons", tile: 27 }, "How quickly this creature attacks."));
        this.statIcons.push(new TooltipImage(this.sceneContext, this.x + 75, this.y + 85, 16, 16,
            { sprite: "icons", tile: 28 }, "How hard it is to hit this creature."));
        this.statIcons.push(new TooltipImage(this.sceneContext, this.x + 75, this.y + 105, 16, 16,
            { sprite: "icons", tile: 48 }, "How resistant this creature is to critical hits."));
        this.statIcons.push(new TooltipImage(this.sceneContext, this.x + 155, this.y + 45, 16, 16,
            { sprite: "icons", tile: 29 }, "How much health this creature regenerates per second."));
        this.statIcons.push(new TooltipImage(this.sceneContext, this.x + 155, this.y + 65, 16, 16,
            { sprite: "icons", tile: 31 }, "How often this creature critically hits."));
        this.statIcons.push(new TooltipImage(this.sceneContext, this.x + 155, this.y + 85, 16, 16,
            { sprite: "icons", tile: 30 }, "How powerful this creatures critical hits are."));
        this.damageLabel = sceneContext.add.bitmapText(x + 95, y + 25, "courier16", "");
        this.armorLabel = sceneContext.add.bitmapText(x + 95, y + 45, "courier16", "");
        this.hitnameLabel = sceneContext.add.bitmapText(x + 95, y + 65, "courier16", "");
        this.evasionLabel = sceneContext.add.bitmapText(x + 95, y + 85, "courier16", "");
        this.critResLabel = sceneContext.add.bitmapText(x + 95, y + 105, "courier16", "");
        this.regenLabel = sceneContext.add.bitmapText(x + 175, y + 45, "courier16", "");
        this.critLabel = sceneContext.add.bitmapText(x + 175, y + 65, "courier16", "");
        this.critPowLabel = sceneContext.add.bitmapText(x + 175, y + 85, "courier16", "");

        this.healthBar = new ProgressBar(sceneContext, x + 5, y + 125, 240, 14,
            Phaser.Display.Color.GetColor(170, 0, 0), Phaser.Display.Color.GetColor(32, 32, 32));
        this.attackBar = new ProgressBar(sceneContext, x + 5, y + 145, 240, 14,
            Phaser.Display.Color.GetColor(0, 140, 40), Phaser.Display.Color.GetColor(32, 32, 32));
        this.traitButtons = [];
    }

    initWithCreature(creature) {
        this.nameLabel.setText(creature.name);
        this.damageLabel.setText(Common.numberString(Math.floor(creature.DamageMin())) + "-" + Common.numberString(Math.floor(creature.DamageMax())));
        this.armorLabel.setText(Common.numberString(Math.floor(creature.Armor())));
        this.hitnameLabel.setText(Common.numberString(Math.floor(creature.Hit())));
        this.evasionLabel.setText(Common.numberString(Math.floor(creature.Evasion())));
        this.critResLabel.setText(Common.numberString(Math.floor(creature.CritResistance())));
        this.regenLabel.setText(Common.numberString(Math.floor(creature.HealthRegen())) + "/s");
        this.critLabel.setText(Common.numberString(Math.floor(creature.CritChance() * 100)) + "%");
        this.critPowLabel.setText(Common.numberString(Math.floor(creature.CritPower())));
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(200, 0, 0);

        var fillTxt = "";
        if (creature.shieldValue > 0) {
            fillTxt = Common.numberString(Math.ceil(creature.currentHealth)) + "+(" + Common.numberString(Math.ceil(creature.shieldValue)) + ")/" +
                Common.numberString(creature.MaxHealth());
            this.setShieldBar(creature.shieldValue / creature.MaxHealth());
        } else {
            fillTxt = Common.numberString(Math.ceil(creature.currentHealth)) + "/" + Common.numberString(creature.MaxHealth())
        }
        this.healthBar.setFillPercent(creature.currentHealth / creature.MaxHealth(), fillTxt);
        this.attackBar.setFillPercent(creature.attackCooldown / creature.attackSpeed,
            Math.floor(creature.attackCooldown / creature.attackSpeed * 100) + "%");
        this.image.setTexture(creature.icon.sprite, creature.icon.tile);

        for (var i = 0; i < this.traitButtons.length; i++) {
            this.traitButtons[i].destroy();
        }
        this.traitButtons = [];
        for (var i = 0; i < creature.traits.length; i++) {
            var sprite = TooltipRegistry.getTraitImage(creature.traits[i]);
            this.traitButtons.push(new TooltipImage(this.sceneContext, this.x + 75 + (i * 20), this.y + 105, 16, 16, sprite,
                TooltipRegistry.getTraitTooltip(creature.traits[i])));
        }
    }

    setVisible(visible) {
        this.backingRect.setVisible(visible);
        this.imageRect.setVisible(visible);
        this.image.setVisible(visible);
        this.nameLabel.setVisible(visible);
        this.damageLabel.setVisible(visible);
        this.armorLabel.setVisible(visible);
        this.hitnameLabel.setVisible(visible);
        this.evasionLabel.setVisible(visible);
        this.critPowLabel.setVisible(visible);
        this.regenLabel.setVisible(visible);
        this.critLabel.setVisible(visible);
        this.critResLabel.setVisible(visible);
        this.healthBar.setVisible(visible);
        this.attackBar.setVisible(visible);
        for (var i = 0; i < this.traitButtons.length; i++) {
            this.traitButtons[i].setVisible(visible);
        }
        for (var i = 0; i < this.statIcons.length; i++) {
            this.statIcons[i].setVisible(visible);
        }
    }

    setHealthBar(healthPercent, text = "") {
        this.healthBar.setFillPercent(healthPercent, text);
    }
    setShieldBar(shieldPercent) {
        this.healthBar.setSecondaryFillPercent(shieldPercent);
    }

    setAttackBar(attackPercent, text = "") {
        this.attackBar.setFillPercent(attackPercent, text);
    }

    setInvader() {
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(200, 0, 200);
    }

    getCenterX() { return this.x + 125; }
    getCenterY() { return this.y + 85; }
}