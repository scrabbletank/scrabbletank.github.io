import { Common } from "../utils/Common";
import { PlayerData } from "../data/PlayerData";
import { MoonlightData } from "../data/MoonlightData";
import { TextButton } from "./TextButton";

export class RebirthDialog {
    constructor(scene, x, y, regionLevel) {
        this.backingRect = scene.add.rectangle(x, y, 400, 270, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive();
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(200, 0, 200);
        this.backingRect.lineWidth = 2;

        this.titleLabel = scene.add.bitmapText(x + 200, y + 10, "courier20", "Mystic Gate").setOrigin(0.5, 0);
        this.titleLabel.setTint(Phaser.Display.Color.GetColor(200, 0, 200));

        var desc = "You approach the mysterious, ancient gate. The air buzzes with energy as you peer into the pale " +
            "blue portal. All those shadow beasts, guarding this place.. what's so important about this?";
        desc = Common.processText(desc, 48);
        this.descLabel = scene.add.bitmapText(x + 200, y + 30, "courier16", desc, 16, 1).setOrigin(0.5, 0);

        var descColor = Phaser.Display.Color.GetColor(96, 172, 177);
        switch (regionLevel) {
            case 0:
                desc = "\"THE MOON CALLS TO ALL IN THESE LANDS THAT WOULD HEAR IT. BE REBORN IN MOONLIGHT.\"";
                break;
            case 1:
                desc = "\"THE CHILD RETURNS, TRAVELLING THE HORIZON. MY BOUNTY FLURISHES WITH EACH STEP.\"";
                break;
            case 2:
                desc = "\"I SPEAK, YET DO NOT HEAR. MYRAH KEEPS ALL IN SHADOW. THE STARLESS NIGHT RETURNS.\"";
                break;
            case 3:
                desc = "\"MOONLIGHT STRENGTHENS YOU, BUT I OFFER MORE. FACE MY CHALLENGES, FOR THERE ARE GREATER DANGERS.\"";
                break;
            case 4:
                desc = "\"DO YOU WAVER, CHILD OF MOONLIGHT? YOUR STRENGTH GROWS, BUT FAR HAS MYRAH HID... TURNING ALL AGAINST US.\"";
                break;
            case 5:
                desc = "\"...\"";
                break;
            case 6:
                desc = "\"YOU TRAVEL FAR. MYRAH TRIES TO HIDE MY VOICE. COME, MY CHALLENGES WILL PREPARE YOU FOR THE COMING NIGHT.\""
                break;
            case 7:
                desc = "\"WE WILL NOT RETURN, SLAVE OF MOONLIGHT. THE STARS WILL NOT COME TO YOU. LEAVE NOW.\"";
                descColor = Phaser.Display.Color.GetColor(177, 100, 169);
                break;
            case 8:
                desc = "\"DO NOT LISTEN. THEIR LIES ARE AS NUMEROUS AS THE STARS IN THE SKY. WE SHALL PURGE THEM BOTH.\"";
                break;
            default:
                desc = "\"...\"";
                break;
        }
        desc = Common.processText(desc, 48);
        this.desc2Label = scene.add.bitmapText(x + 200, y + 107, "courier16", desc, 16, 1).setOrigin(0.5, 0);
        this.desc2Label.setTint(descColor);

        desc = "You hear a voice calling to you. Do you enter into the unknown, or continue your journey?";
        desc = Common.processText(desc, 48);
        this.desc3Label = scene.add.bitmapText(x + 200, y + 150, "courier16", desc, 16, 1).setOrigin(0.5, 0);


        var playerData = new PlayerData();
        var costTxt = "MOONLIGHT\n" + Math.round(playerData.earnableMoonlight(regionLevel + 1));
        this.moonlightLabel = scene.add.bitmapText(x + 200, y + 190, "courier20", costTxt, 20, 1).setOrigin(0.5, 0);
        this.moonlightLabel.setTint(Phaser.Display.Color.GetColor(206, 238, 240));

        this.rebirthButton = new TextButton(scene, x + 30, y + 240, 155, 20, "Enter");
        this.leaveButton = new TextButton(scene, x + 215, y + 240, 155, 20, "Leave");
    }

    onRebirthHandler(callback) {
        this.rebirthButton.onClickHandler(callback);
        return this;
    }
    onLeaveHandler(callback) {
        this.leaveButton.onClickHandler(callback);
        return this;
    }

    destroy() {
        this.backingRect.destroy();
        this.titleLabel.destroy();
        this.descLabel.destroy();
        this.desc2Label.destroy();
        this.desc3Label.destroy();
        this.moonlightLabel.destroy();
        this.rebirthButton.destroy();
        this.leaveButton.destroy();
    }
}