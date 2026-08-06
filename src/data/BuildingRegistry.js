import { Building, BuildingTypes } from "./Building";

export class BuildingRegistry {
    static getBuildingByName(name) {
        switch (name) {
            case "wood":
                return new Building("Lumberyard", "wood", 1, BuildingTypes.PRODUCTION, { sprite: "bldicons", tile: 0, w: 32, h: 32 },
                    [0, 15, 0, 30, 45, 0], 50, 5);
            case "leather":
                return new Building("Hunter's Lodge", "leather", 1, BuildingTypes.PRODUCTION, { sprite: "bldicons", tile: 1, w: 32, h: 32 },
                    [60, 0, 30, 0, 0, 0], 50, 5);
            case "metal":
                return new Building("Mine", "metal", 1, BuildingTypes.PRODUCTION, { sprite: "bldicons", tile: 2, w: 32, h: 32 },
                    [30, 0, 0, 0, 45, 15], 50, 5);
            case "fiber":
                return new Building("Herbalist's Hut", "fiber", 1, BuildingTypes.PRODUCTION, { sprite: "bldicons", tile: 3, w: 32, h: 32 },
                    [45, 30, 0, 0, 0, 15], 50, 5);
            case "stone":
                return new Building("Quarry", "stone", 1, BuildingTypes.PRODUCTION, { sprite: "bldicons", tile: 4, w: 32, h: 32 },
                    [20, 0, 60, 0, 0, 0], 50, 5);
            case "crystal":
                return new Building("Crystal Loom", "crystal", 1, BuildingTypes.PRODUCTION, { sprite: "bldicons", tile: 5, w: 32, h: 32 },
                    [30, 0, 15, 0, 45, 0], 50, 5);
            case "house":
                return new Building("Town House", "house", 1, BuildingTypes.HOUSE, { sprite: "bldicons", tile: 6, w: 32, h: 32 },
                    [5, 5, 5, 5, 5, 0], 15, 5);
            case "watchtower":
                return new Building("Watch Tower", "watchtower", 1, BuildingTypes.OTHER, { sprite: "bldicons", tile: 7, w: 32, h: 32 },
                    [25, 0, 0, 0, 40, 0], 40, 5);
            case "market":
                return new Building("Market", "market", 1, BuildingTypes.ECON, { sprite: "bldicons", tile: 8, w: 32, h: 32 },
                    [20, 10, 0, 10, 10, 10], 100, 5);
            case "tavern":
                return new Building("Tavern", "tavern", 1, BuildingTypes.HOUSE, { sprite: "bldicons", tile: 9, w: 32, h: 32 },
                    [25, 5, 0, 15, 0, 10], 100, 5);
            case "road":
                return new Building("Road", "road", 1, BuildingTypes.ROAD, { sprite: "roadicons", tile: 0, w: 32, h: 32 },
                    [5, 0, 0, 0, 3, 0], 5, 7);
            case "docks":
                return new Building("Docks", "docks", 1, BuildingTypes.ROAD, { sprite: "bldicons", tile: 50, w: 32, h: 32 },
                    [15, 10, 0, 0, 10, 0], 50, 5);
            case "town":
                return new Building("Town", "town", 3, BuildingTypes.ROAD, { sprite: "roadicons", tile: 38, w: 50, h: 50 },
                    [0, 0, 0, 0, 0, 0], 0, 0);
            case "alchemy":
                return new Building("Alchemy Lab", "alchemy", 1, BuildingTypes.ECON, { sprite: "bldicons", tile: 51, w: 32, h: 32 },
                    [10, 0, 20, 0, 10, 15], 150, 5);
            case "warehouse":
                return new Building("Warehouse", "warehouse", 1, BuildingTypes.OTHER, { sprite: "bldicons", tile: 52, w: 32, h: 32 },
                    [50, 10, 0, 10, 50, 0], 75, 5);
            case "dojo":
                return new Building("Dojo", "dojo", 1, BuildingTypes.ECON, { sprite: "bldicons", tile: 54, w: 32, h: 32 },
                    [30, 0, 20, 20, 0, 10], 125, 5);
            case "garrison":
                return new Building("Garrison", "garrison", 1, BuildingTypes.ECON, { sprite: "bldicons", tile: 53, w: 32, h: 32 },
                    [50, 0, 20, 0, 50, 0], 150, 5);
        }
    }
}