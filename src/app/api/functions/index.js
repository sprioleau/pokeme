export const types = ["Normal", "Fire", "Water", "Grass", "Electric", "Fighting", "Ice", "Poison", "Ground", "Psychic", "Flying", "Bug", "Rock", "Ghost", "Dark", "Dragon", "Steel", "Fairy"];
export const weaknesses = ["Public speaking", "A good massage", "Ice cream"];

export const getRandomFromArray = (array) => array[Math.floor(Math.random() * array.length)];
export const getName = (name) => `${name.first} ${name.last.slice(0, 1)}.`;
