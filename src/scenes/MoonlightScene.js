import { SceneUIBase } from "./SceneUIBase";
import { MoonlightData } from "../data/MoonlightData";
import { TextButton } from "../ui/TextButton";
import { ProgressionStore } from "../data/ProgressionStore";
import { ChallengeWindow } from "../ui/ChallengeWindow";
import { DynamicSettings } from "../data/DynamicSettings";
import { ActiveChallengeDialog } from "../ui/ActiveChallengeDialog";
import { TooltipImage } from "../ui/TooltipImage";
import { MoonlightView } from "./MoonlightView";
import { StarshardView } from "./StarshardView";

const MOONLIGHT_VIEW = 0;
const STARSHARD_VIEW = 1;

export class MoonlightScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.canLevelPerks = false;
        this.currentView = MOONLIGHT_VIEW;

        this.moonlightContainer = new MoonlightView(this, this.relativeX(0), this.relativeY(0));
        this.starshardContainer = new StarshardView(this, this.relativeX(0), this.relativeY(0));
    }

    create() {
        //background
        this.add.rectangle(this.relativeX(0), this.relativeY(0), 1100, 800, 0x000000)
            .setOrigin(0)
            .setInteractive();
        this.moonlightContainer.create();
        this.starshardContainer.create();
        this.starshardContainer.setVisible(false);

        this.exitButton = new TextButton(this, this.relativeX(950), this.relativeY(730), 120, 40, "BACK")
            .onClickHandler(() => {
                if (this.canLevelPerks === true) {
                    this.exitButton.setText("BACK");
                    var game = this.scene.get("DarkWorld");
                    this.canLevelPerks = false;
                    this.moonlightContainer.canLevelPerks = false;
                    this.starshardContainer.canLevelPerks = false;
                    DynamicSettings.getInstance().reset();
                    game.rebirth();
                } else {
                    this.scene.sendToBack();
                }
            });

        this.challengeBox = undefined;

        this.challengeBtn = new TextButton(this, this.relativeX(950), this.relativeY(12), 120, 30, "Challenges")
            .onClickHandler(() => { this._setupChallengeWindow(); });
        this.challengePointIcon = new TooltipImage(this, 20, 20, 16, 16, { sprite: "moonicons", tile: 7 },
            "Challenge Points earned from completing challenges. Each point increases your core stats by an additional 1%.");
        this.challengePointLabel = this.add.bitmapText(40, 20, "courier20", MoonlightData.instance.challengePoints + "");
        this.challengeBtn.setVisible(ProgressionStore.getInstance().persistentUnlocks.challenges);
        this.challengePointIcon.setVisible(ProgressionStore.getInstance().persistentUnlocks.challenges);
        this.challengePointLabel.setVisible(ProgressionStore.getInstance().persistentUnlocks.challenges);

        this.moonlightBtn = new TextButton(this, this.relativeX(950), this.relativeY(50), 120, 30, "Moonlight")
            .onClickHandler(() => { this._switchView(MOONLIGHT_VIEW); });
        this.starshardBtn = new TextButton(this, this.relativeX(950), this.relativeY(88), 120, 30, "Star Shards")
            .onClickHandler(() => { this._switchView(STARSHARD_VIEW); });

        this.moonlightBtn.setVisible(ProgressionStore.getInstance().persistentUnlocks.starshards === true);
        this.starshardBtn.setVisible(ProgressionStore.getInstance().persistentUnlocks.starshards === true);
    }

    _switchView(id) {
        this.currentView = id;
        if (id === MOONLIGHT_VIEW) {
            this.moonlightContainer.setVisible(true);
            this.starshardContainer.setVisible(false);
        } else {
            this.moonlightContainer.setVisible(false);
            this.starshardContainer.setVisible(true);
        }
        this.refresh();
    }

    refresh() {
        if (this.currentView === MOONLIGHT_VIEW) {
            this.moonlightContainer.refreshView();
        } else {
            this.starshardContainer.refreshView();
        }
        this.challengeBtn.setVisible(ProgressionStore.getInstance().persistentUnlocks.challenges);
        this.challengePointIcon.setVisible(ProgressionStore.getInstance().persistentUnlocks.challenges);
        this.challengePointLabel.setText(MoonlightData.getInstance().challengePoints + "");
        this.challengePointLabel.setVisible(ProgressionStore.getInstance().persistentUnlocks.challenges);
        this.moonlightBtn.setVisible(ProgressionStore.getInstance().persistentUnlocks.starshards === true);
        this.starshardBtn.setVisible(ProgressionStore.getInstance().persistentUnlocks.starshards === true);
    }

    enableLeveling() {
        this.starshardContainer.canLevelPerks = true;
        this.moonlightContainer.canLevelPerks = true;
        this.canLevelPerks = true;
        this.exitButton.setText("REBIRTH");
        this.refresh();
    }

    _setupChallengeWindow() {
        if (this.challengeBox !== undefined) {
            this.challengeBox.destroy();
            this.challengeBox = undefined;
        }
        if (DynamicSettings.getInstance().challengeName !== "") {
            this.challengeBox = new ActiveChallengeDialog(this, 200, 150)
                .onAbandonHandler(() => { this._abandonChallenge(); })
                .onCancelHandler(() => { this._removeChallengeWindow(); });
        } else {
            this.challengeBox = new ChallengeWindow(this, 150, 100, this.canLevelPerks === false)
                .onAcceptHandler((c) => { this._beginChallenge(c); })
                .onCancelHandler(() => { this._removeChallengeWindow(); });
        }
    }
    _removeChallengeWindow() {
        if (this.challengeBox !== undefined) {
            this.challengeBox.destroy();
            this.challengeBox = undefined;
        }
    }
    _beginChallenge(challenge) {
        this.exitButton.setText("BACK");
        DynamicSettings.getInstance().setupChallenge(challenge);
        var game = this.scene.get("DarkWorld");
        this.canLevelPerks = false;
        this.moonlightContainer.canLevelPerks = false;
        this.starshardContainer.canLevelPerks = false;
        game.rebirth();
        if (this.challengeBox !== undefined) {
            this.challengeBox.destroy();
            this.challengeBox = undefined;
        }
    }
    _abandonChallenge() {
        if (this.challengeBox !== undefined) {
            this.challengeBox.destroy();
            this.challengeBox = undefined;
        }
        this.exitButton.setText("REBIRTH");
        DynamicSettings.getInstance().reset();
        this.canLevelPerks = true;
        this.moonlightContainer.canLevelPerks = true;
        this.starshardContainer.canLevelPerks = true;
    }
}