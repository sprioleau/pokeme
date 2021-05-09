export const weaknesses = ["Public speaking", "A good massage", "Ice cream"];

export const getRandomFromArray = (array) => array[Math.floor(Math.random() * array.length)];
export const getName = (name) => `${name.first} ${name.last.slice(0, 1)}.`;
export const getAttacks = (array) => {
  const size = Math.ceil(Math.random() * 2);
  if (size === 1) {
    return [getRandomFromArray(array)];
  } else {
    return [getRandomFromArray(array.slice(0, 4)), getRandomFromArray(array.slice(4, array.length))];
  }
};
export const getHitPoints = () => (Math.floor(Math.random() * 15) + 5) * 10;
