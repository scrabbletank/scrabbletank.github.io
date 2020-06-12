import { Building } from "./Building";

export class BuildingRegistry {
    static getBuildingByName(name) {
        switch (name) {
            case "wood":
                return new Building("Lumberyard", 1, { sprite: "bldicons", tile: 0 },
                    [0, 5, 0, 5, 10, 0], 25, 5);
            case "leather":
                return new Building("Hunter's Lodge", 1, { sprite: "bldicons", tile: 1 },
                    [15, 0, 5, 0, 0, 0], 25, 5);
            case "metal":
                return new Building("Mine", 1, { sprite: "bldicons", tile: 2 },
                    [5, 0, 0, 0, 10, 5], 25, 5);
            case "fiber":
                return new Building("Herbalist's Hut", 1, { sprite: "bldicons", tile: 3 },
                    [8, 8, 0, 0, 0, 4], 25, 5);
            case "stone":
                return new Building("Quarry", 1, { sprite: "bldicons", tile: 4 },
                    [5, 0, 15, 0, 0, 0], 25, 5);
            case "crystal":
                return new Building("Crystal Loom", 1, { sprite: "bldicons", tile: 5 },
                    [4, 0, 4, 0, 12, 0], 25, 5);
            case "house":
                return new Building("Town House", 1, { sprite: "bldicons", tile: 6 },
                    [4, 4, 4, 4, 4, 0], 10, 5);
            case "watchtower":
                return new Building("Watch Tower", 1, { sprite: "bldicons", tile: 7 },
                    [8, 0, 0, 0, 12, 0], 40, 5);
            case "tradehouse":
                return new Building("Trade House", 1, { sprite: "bldicons", tile: 32 },
                    [8, 0, 0, 0, 12, 0], 25, 5);
            case "tavern":
                return new Building("Tavern", 1, { sprite: "bldicons", tile: 33 },
                    [8, 0, 0, 0, 12, 0], 25, 5);
        }
    }
}