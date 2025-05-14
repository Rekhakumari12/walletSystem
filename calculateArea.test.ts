import { describe, it, expect } from "@jest/globals";
import { calculateArea, Rectangle, Square, Trapezoid } from "./calculateArea";

describe("calculateArea", () => {
  it("should return area of a square", () => {
    const square: Square = { type: "square", side: 4 };
    const value = calculateArea(square);
    expect(value).toEqual(16);
  });

  it("should return area of a rectangle", () => {
    const rectangle: Rectangle = { type: "rectangle", length: 5, width: 3 };
    const value = calculateArea(rectangle);
    expect(value).toEqual(15);
  });

  it("should return area of a trapezoid", () => {
    const trapezoid: Trapezoid = {
      type: "trapezoid",
      base1: 6,
      base2: 4,
      height: 5,
    };
    const value = calculateArea(trapezoid);
    expect(value).toEqual(25);
  });
});
