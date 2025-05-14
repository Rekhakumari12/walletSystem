export type Square = {
  type: "square";
  side: number;
};

export type Rectangle = {
  type: "rectangle";
  length: number;
  width: number;
};

export type Trapezoid = {
  type: "trapezoid";
  base1: number;
  base2: number;
  height: number;
};
type Shape = Square | Rectangle | Trapezoid;

const areaSquare = (shape: Square): number => shape.side ** 2;

const areaRectangle = (shape: Rectangle): number => shape.length * shape.width;

const areaTrapezoid = (shape: Trapezoid): number =>
  ((shape.base1 + shape.base2) * shape.height) / 2;

export const calculateArea = (shape: Shape): number => {
  switch (shape.type) {
    case "square":
      return areaSquare(shape);
    case "rectangle":
      return areaRectangle(shape);
    case "trapezoid":
      return areaTrapezoid(shape);
  }
};
