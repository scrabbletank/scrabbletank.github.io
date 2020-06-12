import { ProgressBar } from './ProgressBar';

export class CreatureDisplay {
    constructor(sceneContext, x, y) {
        //total size is 200x170

        this.x = x;
        this.y = y;

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
    }

    initWithCreature(creature) {
        this.nameLabel.setText(creature.name);
        this.damageLabel.setText("Damage: " + Math.floor(creature.DamageMin()) + "-" + Math.floor(creature.DamageMax()));
        this.armorLabel.setText("Armor: " + Math.floor(creature.Armor()));
        this.hitnameLabel.setText("Hit: " + Math.floor(creature.Hit()));
        this.evasionLabel.setText("Evasion: " + Math.floor(creature.Evasion()));

        this.healthBar.setFillPercent(creature.currentHealth / creature.MaxHealth());
        this.attackBar.setFillPercent(creature.attackCooldown / creature.attackSpeed);
        this.image.setTexture(creature.icon.sprite, creature.icon.tile);
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
    }

    setHealthBar(healthPercent, text = "") {
        this.healthBar.setFillPercent(healthPercent, text);
    }

    setAttackBar(attackPercent, text = "") {
        this.attackBar.setFillPercent(attackPercent, text);
    }

    getCenterX() { return this.x + 125; }
    getCenterY() { return this.y + 85; }
}