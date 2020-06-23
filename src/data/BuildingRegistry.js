import { Building } from "./Building";

export class BuildingRegistry {
    static getBuildingByName(name) {
        switch (name) {
            case "wood":
                return new Building("Lumberyard", "wood", 1, { sprite: "bldicons", tile: 0 },
                    [0, 5, 0, 10, 15, 0], 25, 5);
            case "leather":
                return new Building("Hunter's Lodge", "leather", 1, { sprite: "bldicons", tile: 1 },
                    [20, 0, 10, 0, 0, 0], 25, 5);
            case "metal":
                return new Building("Mine", "metal", 1, { sprite: "bldicons", tile: 2 },
                    [10, 0, 0, 0, 15, 5], 25, 5);
            case "fiber":
                return new Building("Herbalist's Hut", "fiber", 1, { sprite: "bldicons", tile: 3 },
                    [15, 10, 0, 0, 0, 5], 25, 5);
            case "stone":
                return new Building("Quarry", "stone", 1, { sprite: "bldicons", tile: 4 },
                    [10, 0, 20, 0, 0, 0], 25, 5);
            case "crystal":
                return new Building("Crystal Loom", "crystal", 1, { sprite: "bldicons", tile: 5 },
                    [10, 0, 5, 0, 15, 0], 25, 5);
            case "house":
                return new Building("Town House", "house", 1, { sprite: "bldicons", tile: 6 },
                    [5, 5, 5, 5, 5, 0], 10, 5);
            case "watchtower":
                return new Building("Watch Tower", "watchtower", 1, { sprite: "bldicons", tile: 7 },
                    [25, 0, 0, 0, 40, 0], 40, 5);
            case "market":
                return new Building("Market", "market", 1, { sprite: "bldicons", tile: 32 },
                    [20, 10, 0, 10, 10, 10], 50, 5);
            case "tavern":
                return new Building("Tavern", "tavern", 1, { sprite: "bldicons", tile: 33 },
                    [20, 5, 0, 15, 0, 5], 50, 5);
            case "road":
                return new Building("Road", "road", 1, { sprite: "roadicons", tile: 0 },
                    [5, 0, 0, 0, 3, 0], 5, 7);
            case "docks":
                return new Building("Docks", "docks", 1, { sprite: "bldicons", tile: 34 },
                    [15, 10, 0, 0, 10, 0], 50, 5);
            case "town":
                return new Building("Town", "town", 3, { sprite: "roadicons", tile: 38 },
                    [15, 10, 0, 0, 10, 0], 50, 5);
        }
    }
}