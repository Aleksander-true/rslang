export function getRandomIntInclusive(minNumber: number, maxNumber: number): number {
  const min = Math.ceil(minNumber);
  const max = Math.floor(maxNumber);
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}

export function shuffle(array: string[]) {
  array.sort(() => Math.random() - 0.5);
}
