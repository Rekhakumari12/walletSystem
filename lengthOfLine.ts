export const getLength = (
  x1: number,
  x2: number,
  y1: number,
  y2: number
): number => {
  const x = x2 - x1;
  const y = y2 - y1;

  return Math.sqrt(x * x + y * y);
};
