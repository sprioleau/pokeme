// Adapted from: https://github.com/pcattori/pokemon/blob/master/pokemon/data/moves.json
// I took the referenced array of moves and modified it according to the following filter.

// Adapted from: https://www.freecodecamp.org/news/three-ways-to-title-case-a-sentence-in-javascript-676a9175eb27/
// This function takes a string and converts it to title case. It is used in the name value in the map below.

// moves.filter(move => move.effects && move.power !== null && move.pp % 5 === 0 && move.pp <= 20 && move.effects[0] && move.effects[0].length <= 120 && move.pp / 5 > 0).map(move => ({
//     name: move.name.toLowerCase().split(" ").map((word) => (word.charAt(0).toUpperCase() + word.slice(1))).join(" "),
//     type: move.type,
//     damage: move.power,
//     energyCost: move.pp / 5,
//     description: move.effects[0]
// }))

/* eslint max-len: 0 */
export default [
    {
        name: "Absorb",
        type: "grass",
        damage: 20,
        energyCost: 4,
        description: "Absorb deals damage and the user will recover 50% of the HP drained."
    },
    {
        name: "Dream Eater",
        type: "psychic",
        damage: 100,
        energyCost: 3,
        description: "Dream Eater deals damage only on sleeping foes and the user will recover 50% of the HP drained."
    },
    {
        name: "Explosion",
        type: "normal",
        damage: 170,
        energyCost: 1,
        description: "Explosion deals high damage, but causes the user to faint."
    },
    {
        name: "Hyper Beam",
        type: "normal",
        damage: 150,
        energyCost: 1,
        description: "Hyper Beam deals damage, but the user must recharge on the next turn (bringing its effective power down to 75 per turn)."
    },
    {
        name: "Leech Life",
        type: "bug",
        damage: 20,
        energyCost: 3,
        description: "Leech Life deals damage and the user will recover 50% of the HP drained."
    },
    {
        name: "Mega Drain",
        type: "grass",
        damage: 40,
        energyCost: 2,
        description: "Mega Drain deals damage and the user will recover 50% of the HP drained."
    },
    {
        name: "Razor Wind",
        type: "normal",
        damage: 80,
        energyCost: 2,
        description: "The user of Razor Wind will whip up a whirlwind on the first turn. On the second turn, Razor Wind deals damage."
    },
    {
        name: "Self-destruct",
        type: "normal",
        damage: 200,
        energyCost: 1,
        description: "Self-Destruct deals high damage, but causes the user to faint."
    },
    {
        name: "Solar Beam",
        type: "grass",
        damage: 120,
        energyCost: 2,
        description: "The user of Solar Beam will absorb light on the first turn. On the second turn, Solar Beam deals damage."
    },
];
