import { TooltipRegistry } from "../data/TooltipRegistry";
import { Common } from "../utils/Common";
import { TextButton } from "./TextButton";
import { TooltipImage } from "./TooltipImage";

export class DungeonDisplay {
    constructor(sceneContext, x, y, dungeon, canEnter = true) {
        this.backingRect = sceneContext.add.rectangle(x + 1, y + 1, 650 - 2, 115 - 2, Phaser.Display.Color.GetColor(0, 0, 0)).setOrigin(0, 0);
        this.backingRect.isStroked = true;
        this.backingRect.lineWidth = 1;
        switch (dungeon.tier) {
            case 0:
                this.backingRect.strokeColor = Phaser.Display.Color.GetColor(100, 200, 80);
                break;
            case 1:
                this.backingRect.strokeColor = Phaser.Display.Color.GetColor(50, 140, 190);
                break;
            case 2:
                this.backingRect.strokeColor = Phaser.Display.Color.GetColor(100, 75, 200);
                break;
        }


        if (dungeon.completedRooms < dungeon.maxRooms) {
            this.nameLabel = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", dungeon.name + " Lv" + dungeon.level);
            this.nameLabel.setTint(Phaser.Display.Color.GetColor(212, 175, 55));

            this.diffLabel = sceneContext.add.bitmapText(x + 5, y + 25, "courier16", "Difficulty: " + Common.numberString(dungeon.difficulty));

            if (canEnter === true) {
                this.enterBtn = new TextButton(sceneContext, x + 545, y + 90, 100, 20, "Enter").onClickHandler(() => { this._onClick({ dungeon: dungeon }); });
            } else {
                this.enterBtn = new TextButton(sceneContext, x + 545, y + 90, 100, 20, "Enter");
                this.enterBtn.setEnable(false);
            }
            this.elements = [this.backingRect, this.nameLabel, this.diffLabel, this.enterBtn];

            var px = x + 20;
            for (var i = 0; i < dungeon.maxRooms; i++) {
                var clr = i < dungeon.completedRooms ? Phaser.Display.Color.GetColor(130, 110, 200) : Phaser.Display.Color.GetColor(0, 0, 0);
                var rect;
                if (i % 5 === 4) {
                    var texture = i === dungeon.maxRooms - 1 ? { sprite: "icons2", tile: 1 } : { sprite: "icons2", tile: 0 };
                    var img = sceneContext.add.image(px + 7, y + 57, texture.sprite, texture.tile).setOrigin(0, 0).setDepth(99);
                    img.displayWidth = 16;
                    img.displayHeight = 16;
                    this.elements.push(img);
                    rect = sceneContext.add.rectangle(px, y + 50, 30, 30, clr).setOrigin(0, 0);
                    px += 35;
                } else {
                    rect = sceneContext.add.rectangle(px, y + 55, 20, 20, clr).setOrigin(0, 0);
                    px += 25;
                }
                rect.isStroked = true;
                rect.lineWidth = 1;
                rect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
                this.elements.push(rect);
            }
        } else if (dungeon.rewards.length === 3) {
            this.nameLabel = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", dungeon.name + " Lv" + dungeon.level);
            this.nameLabel.setTint(Phaser.Display.Color.GetColor(212, 175, 55));

            this.descLabel = sceneContext.add.bitmapText(x + 325, y + 30, "courier16", "Choose Your Reward").setOrigin(0.5, 0);

            this.reward1Btn = new TooltipImage(sceneContext, x + 138, y + 56, 48, 48,
                TooltipRegistry.getDungeonRewardImage(dungeon.rewards[0]),
                TooltipRegistry.getDungeonRewardTooltip(dungeon.rewards[0]))
                .onClickHandler(() => { this._onClick({ dungeon: dungeon, reward: 0 }); });
            this.reward2Btn = new TooltipImage(sceneContext, x + 301, y + 56, 48, 48,
                TooltipRegistry.getDungeonRewardImage(dungeon.rewards[1]),
                TooltipRegistry.getDungeonRewardTooltip(dungeon.rewards[1]))
                .onClickHandler(() => { this._onClick({ dungeon: dungeon, reward: 1 }); });
            this.reward3Btn = new TooltipImage(sceneContext, x + 463, y + 56, 48, 48,
                TooltipRegistry.getDungeonRewardImage(dungeon.rewards[2]),
                TooltipRegistry.getDungeonRewardTooltip(dungeon.rewards[2]))
                .onClickHandler(() => { this._onClick({ dungeon: dungeon, reward: 2 }); });

            this.elements = [this.backingRect, this.nameLabel, this.reward1Btn, this.reward2Btn, this.reward3Btn];
        } else {
            this.nameLabel = sceneContext.add.bitmapText(x + 5, y + 5, "courier20", dungeon.name + " Lv" + dungeon.level);
            this.nameLabel.setTint(Phaser.Display.Color.GetColor(212, 175, 55));

            var texture = TooltipRegistry.getDungeonRewardImage(dungeon.rewards[0]);
            this.image = sceneContext.add.image(x + 5, y + 35, texture.sprite, texture.tile).setOrigin(0);
            this.image.displayWidth = 48;
            this.image.displayHeight = 48;

            this.descLabel = sceneContext.add.bitmapText(x + 65, y + 40, "courier16",
                Common.processText(TooltipRegistry.getDungeonRewardTooltip(dungeon.rewards[0]), 70));
            this.elements = [this.backingRect, this.nameLabel, this.image, this.descLabel];
        }

        this.onClickHandlers = [];
    }

    registerClick(callback) {
        this.onClickHandlers.push(callback);
        return this;
    }

    _onClick(props) {
        for (var i = 0; i < this.onClickHandlers.length; i++) {
            this.onClickHandlers[i](props);
        }
    }

    destroy() {
        for (var i = 0; i < this.elements.length; i++) {
            this.elements[i].destroy();
        }
    }
}