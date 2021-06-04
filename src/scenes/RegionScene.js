import { SceneUIBase } from "./SceneUIBase";
import { TextButton } from "../ui/TextButton";
import { RegionView } from "./RegionView";
import { BlueprintView } from "./BlueprintView";
import { MoonlightData } from "../data/MoonlightData";

const REGION_VIEW = 0;
const BLUEPRINT_VIEW = 1;

export class RegionScene extends SceneUIBase {

    constructor(position, name) {
        super(position, name);

        this.regionViewContainer = new RegionView(this, this.relativeX(0), this.relativeY(0));
        this.blueprintViewContainer = new BlueprintView(this, this.relativeX(0), this.relativeY(0));

        this.activeWindow = REGION_VIEW;
    }

    preload() {

    }

    registerEvent(name, callback) {
        if (name === 'onTileClick') {
            this.regionViewContainer.registerEvent(name, callback);
        }
    }

    getAutoInvadeActive() { return this.regionViewContainer.autoInvadeActive; }

    triggerAutoExplore(tile, tier) {
        this.regionViewContainer.triggerAutoExplore(tile, tier);
    }

    refresh() {
        this.regionViewContainer.refresh();
        this.blueprintViewContainer.refreshBlueprint();
        this.blueprintViewContainer.refreshIcons();
        this._switchRegionView();
    }

    changeRegion() {
        this.regionViewContainer.refresh();
    }

    rebirth() {
        this.regionViewContainer.refresh();
        this.blueprintViewContainer.refreshIcons();
        this._switchRegionView();
    }

    _switchRegionView() {
        this.regionBtn.setVisible(MoonlightData.getInstance().challenges.buildings.completions > 0);
        this.blueprintBtn.setVisible(MoonlightData.getInstance().challenges.buildings.completions > 0);
        this.regionViewContainer.setVisible(true);
        this.blueprintViewContainer.setVisible(false);
        this.activeWindow = REGION_VIEW;
    }
    _switchBlueprintView() {
        this.regionViewContainer.setVisible(false);
        this.blueprintViewContainer.setVisible(true);
        this.activeWindow = BLUEPRINT_VIEW;
    }

    create() {
        this.regionViewContainer.create();
        this.blueprintViewContainer.create();
        this.blueprintViewContainer.setVisible(false);

        this.regionBtn = new TextButton(this, this.relativeX(660), this.relativeY(15), 110, 20, "Region")
            .onClickHandler(() => { this._switchRegionView(); });
        this.blueprintBtn = new TextButton(this, this.relativeX(780), this.relativeY(15), 110, 20, "Blueprints")
            .onClickHandler(() => { this._switchBlueprintView(); });

        this.regionBtn.setVisible(MoonlightData.getInstance().challenges.buildings.completions > 0);
        this.blueprintBtn.setVisible(MoonlightData.getInstance().challenges.buildings.completions > 0);
    }

    update(time, delta) {
        if (this.activeWindow === REGION_VIEW) {
            this.regionViewContainer.update(time, delta);
        }
    }
}