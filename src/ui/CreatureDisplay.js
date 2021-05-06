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
        this.damageLabel = sceneContext.add.bitmapText(x + 75, y + 25, "courier16", "");
        this.armorLabel = sceneContext.add.bitmapText(x + 75, y + 45, "courier16", "");
        this.hitnameLabel = sceneContext.add.bitmapText(x + 75, y + 65, "courier16", "");
        this.evasionLabel = sceneContext.add.bitmapText(x + 75, y + 85, "courier16", "");

        this.healthBar = new ProgressBar(sceneContext, x + 5, y + 125, 240, 14,
            Phaser.Display.Color.GetColor(170, 0, 0), Phaser.Display.Color.GetColor(32, 32, 32));
        this.attackBar = new ProgressBar(sceneContext, x + 5, y + 145, 240, 14,
            Phaser.Display.Color.GetColor(0, 140, 40), Phaser.Display.Color.GetColor(32, 32, 32));
        this.traitButtons = [];
    }

    initWithCreature(creature) {
        this.nameLabel.setText(creature.name);
        this.damageLabel.setText("Damage: " + Common.numberString(Math.floor(creature.DamageMin())) + "-" + Common.numberString(Math.floor(creature.DamageMax())));
        this.armorLabel.setText("Armor: " + Common.numberString(Math.floor(creature.Armor())));
        this.hitnameLabel.setText("Hit: " + Common.numberString(Math.floor(creature.Hit())));
        this.evasionLabel.setText("Evasion: " + Common.numberString(Math.floor(creature.Evasion())));

        this.healthBar.setFillPercent(creature.currentHealth / creature.MaxHealth(),
            Common.numberString(Math.ceil(creature.currentHealth)) + "/" + Common.numberString(creature.MaxHealth()));
        this.attackBar.setFillPercent(creature.attackCooldown / creature.attackSpeed,
            Math.floor(creature.attackCooldown / creature.attackSpeed * 100) + "%");
        this.image.setTexture(creature.icon.sprite, creature.icon.tile);

        for (var i = 0; i < this.traitButtons.length; i++) {
            this.traitButtons[i].destroy();
        }
        this.traitButtons = [];
        for (var i = 0; i < creature.traits.length; i++) {
            var sprite = { sprite: "icons", tile: 63 };
            switch (creature.traits[i].type) {
                case Statics.TRAIT_DIRE:
                    sprite = { sprite: "icons", tile: 43 };
                    break;
                case Statics.TRAIT_POISONED:
                    sprite = { sprite: "icons", tile: 46 };
                    break;
                case Statics.TRAIT_MONSTROUS:
                    sprite = { sprite: "icons", tile: 42 };
                    break;
                case Statics.TRAIT_QUICK:
                    sprite = { sprite: "icons", tile: 49 };
                    break;
                case Statics.TRAIT_DEADLY:
                    sprite = { sprite: "icons", tile: 41 };
                    break;
                case Statics.TRAIT_SHIELDED:
                    sprite = { sprite: "icons", tile: 44 };
                    break;
                case Statics.TRAIT_BESERK:
                    sprite = { sprite: "icons", tile: 45 };
                    break;
            }
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
        this.healthBar.setVisible(visible);
        this.attackBar.setVisible(visible);
        for (var i = 0; i < this.traitButtons.length; i++) {
            this.traitButtons[i].setVisible(visible);
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

    getCenterX() { return this.x + 125; }
    getCenterY() { return this.y + 85; }
}