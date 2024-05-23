export const randomTen = (min, max) => {
  return Math.round((Math.random() * (max - min) + min) / 10) * 10;
};
