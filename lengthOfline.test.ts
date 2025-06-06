import { describe, it, expect } from "@jest/globals";
import { getLength } from "./lengthOfLine";

// sqrt ( (x2-x1)^2 + (y2-y1)^2 )
// find out are line parallel, perpendicular, intersecting
describe("lengthOfLine", () => {
  it("should return the length for given x and y coordinates", () => {
    const distance = getLength(0, 0, 4, 4);
    expect(distance).toEqual(0);
    const distance2 = getLength(100, 10, 400, 400);
    expect(distance2).toEqual(90);
  });

  it("should return valid length for given negative x coordinate", () => {
    const distance = getLength(-100, 10, 400, 400);
    expect(distance).toEqual(110);
  });

  it("should return valid length for given negative y coordinate", () => {
    const distance = getLength(0, 0, -400, 400);
    expect(distance).toEqual(800);
  });
});
