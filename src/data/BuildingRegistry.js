import { Building } from "./Building";

export class BuildingRegistry {
    static getBuildingByName(name) {
        switch (name) {
            case "wood":
                return new Building("Lumberyard", "wood", 1, { sprite: "bldicons", tile: 0 },
                    [0, 5, 0, 5, 10, 0], 25, 5);
            case "leather":
                return new Building("Hunter's Lodge", "leather", 1, { sprite: "bldicons", tile: 1 },
                    [15, 0, 5, 0, 0, 0], 25, 5);
            case "metal":
                return new Building("Mine", "metal", 1, { sprite: "bldicons", tile: 2 },
                    [5, 0, 0, 0, 10, 5], 25, 5);
            case "fiber":
                return new Building("Herbalist's Hut", "fiber", 1, { sprite: "bldicons", tile: 3 },
                    [8, 8, 0, 0, 0, 4], 25, 5);
            case "stone":
                return new Building("Quarry", "stone", 1, { sprite: "bldicons", tile: 4 },
                    [5, 0, 15, 0, 0, 0], 25, 5);
            case "crystal":
                return new Building("Crystal Loom", "crystal", 1, { sprite: "bldicons", tile: 5 },
                    [4, 0, 4, 0, 12, 0], 25, 5);
            case "house":
                return new Building("Town House", "house", 1, { sprite: "bldicons", tile: 6 },
                    [4, 4, 4, 4, 4, 0], 10, 5);
            case "watchtower":
                return new Building("Watch Tower", "watchtower", 1, { sprite: "bldicons", tile: 7 },
                    [8, 0, 0, 0, 12, 0], 40, 5);
            case "tradehouse":
                return new Building("Trade House", "tradehouse", 1, { sprite: "bldicons", tile: 32 },
                    [8, 0, 0, 0, 12, 0], 25, 5);
            case "tavern":
                return new Building("Tavern", "tavern", 1, { sprite: "bldicons", tile: 33 },
                    [8, 0, 0, 0, 12, 0], 25, 5);
        }
    }
}