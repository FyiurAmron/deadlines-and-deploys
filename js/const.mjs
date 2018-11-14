"use strict";

export const APP_NAME = "Deadlines & Deploys";
export const POSSIBLE_DIRS = ["north", "west", "south", "east"];
export const ACTION_ATTACK = "attack";
export const ACTION_ESCAPE = "escape";
export const POSSIBLE_COMBAT_ACTIONS = [
    ACTION_ATTACK,
    ACTION_ESCAPE,
];
export const HP_DESCRIPTIONS = [
    "unhurt", // 1.0
    "barely scratched", // [0.9,1.0)
    "slightly wounded", // [0.8,0.9)
    "lightly bleeding", // [0.7,0.8)
    "somewhat wounded", // [0.6,0.7)
    "moderately wounded", // [0.5,0.6)
    "heavily bleeding", // [0.4,0.5)
    "severely wounded", // [0.3,0.4)
    "critically wounded", // [0.2,0.3)
    "barely alive", // [0.1,0.2)
    "almost dead", // (0.0,0.1)
    "dead", // 0.0
];