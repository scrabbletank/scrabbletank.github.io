import { TextButton } from "./TextButton";
import { MoonlightData } from "../data/MoonlightData";
import { Common } from "../utils/Common";
import { TooltipRegistry } from "../data/TooltipRegistry";

export class ChallengeWindow {
    constructor(scene, x, y) {
        this.backingRect = scene.add.rectangle(x, y, 800, 600, Phaser.Display.Color.GetColor(0, 0, 0))
            .setOrigin(0, 0).setInteractive();
        this.backingRect.isStroked = true;
        this.backingRect.strokeColor = Phaser.Display.Color.GetColor(255, 255, 255);
        this.backingRect.lineWidth = 4;

        this.title = scene.add.bitmapText(x + 400, y + 5, "courier20", "CHALLENGES").setOrigin(0.5, 0);

        this.challengeBtns = [];
        var idx = 0;
        for (const prop in MoonlightData.instance.challenges) {
            this.challengeBtns.push(this._setupChallengeButton(scene, MoonlightData.instance.challenges[prop],
                x + 10, y + 30 + (idx * 25)));
            idx += 1;
        }

        this.challengeBox = scene.add.bitmapText(x + 220, y + 30, "courier20", "");

        this.acceptBtn = new TextButton(scene, x + 275, y + 550, 120, 20, "Accept");
        this.acceptBtn.setEnable(false);
        this.cancelBtn = new TextButton(scene, x + 405, y + 550, 120, 20, "Cancel");

        this.selectedChallenge = undefined;
    }

    onAcceptHandler(callback) {
        this.acceptBtn.onClickHandler(() => { callback(this.selectedChallenge); });
        return this;
    }
    onCancelHandler(callback) {
        this.cancelBtn.onClickHandler(() => { callback(); });
        return this;
    }

    _setupChallengeButton(scene, challenge, x, y) {
        var btn = new TextButton(scene, x, y, 190, 20, challenge.unlocked ? challenge.name : "Locked")
            .onClickHandler(() => { this._challengeClickHandler(challenge); });

        btn.setEnable(challenge.unlocked);
        return btn;
    }

    _challengeClickHandler(challenge) {
        this.challengeBox.setText(Common.processText(TooltipRegistry.getChallengeDescription(challenge), 57));
        this.selectedChallenge = challenge;
        this.acceptBtn.setEnable(challenge.completions < challenge.maxCompletions);
    }

    destroy() {
        this.backingRect.destroy();
        this.title.destroy();
        this.acceptBtn.destroy();
        this.cancelBtn.destroy();
        this.challengeBox.destroy();
        for (var i = 0; i < this.challengeBtns.length; i++) {
            this.challengeBtns[i].destroy();
        }
    }
}