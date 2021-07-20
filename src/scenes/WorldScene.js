import { ProgressionStore } from "../data/ProgressionStore";
import { TextButton } from "../ui/TextButton";
import { RitualView } from "./RitualView";
import { SceneUIBase } from "./SceneUIBase";
import { WorldView } from "./WorldView";

export class WorldScene extends SceneUIBase {
    constructor(position, name) {
        super(position, name);

        this.worldView = new WorldView(this, this.relativeX(0), this.relativeY(0));
        this.ritualView = new RitualView(this, this.relativeX(0), this.relativeY(0));
        this.activeView = 0;
    }

    refreshButtons() {
        var vis = ProgressionStore.getInstance().persistentUnlocks.rituals;
        this.worldBtn.setVisible(vis);
        this.ritualBtn.setVisible(vis);
    }

    refresh() {
        if (this.activeView === 0) {
            this.worldView._refreshRegions();
        }
    }

    rebirth() {
        this.ritualView._refreshRituals();
        this.ritualView._refreshSacrificeLabels();
        this.ritualView._refreshBonuses();
        this.refreshButtons();
        this._changeView(0);
        this.worldView._onInvasionPowerChanged();
    }

    create() {
        this.worldView.create();
        this.ritualView.create();
        this.ritualView.setVisible(false);

        this.worldBtn = new TextButton(this, this.relativeX(20), this.relativeY(10), 100, 20, "World Map")
            .onClickHandler(() => { this._changeView(0); });
        this.ritualBtn = new TextButton(this, this.relativeX(130), this.relativeY(10), 100, 20, "Rituals")
            .onClickHandler(() => { this._changeView(1); });

        this.refreshButtons();
    }

    _changeView(id) {
        if (id === 0) {
            this.worldView._refreshRegions();
            this.worldView.setVisible(true);
            this.ritualView.setVisible(false);
        } else {
            this.worldView.setVisible(false);
            this.ritualView.setVisible(true);
        }
        this.activeView = id;
    }
}