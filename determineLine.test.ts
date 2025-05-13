import { describe, it, expect } from "@jest/globals";
import { determineLine, Line } from "./determineLine";

describe("determineLine", () => {
  it("should identify perpendicular lines", () => {
    const line1: Line = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ]; // horizontal
    const line2: Line = [
      { x: 0, y: 0 },
      { x: 0, y: 1 },
    ]; // vertical

    expect(determineLine(line1, line2)).toBe("perpendicular");
  });

  it("should identify perpendicular lines with slopes -1 and 1", () => {
    const line1: Line = [
      { x: 0, y: 0 },
      { x: 1, y: 1 },
    ]; // slope = 1
    const line2: Line = [
      { x: 0, y: 0 },
      { x: 1, y: -1 },
    ]; // slope = -1
    expect(determineLine(line1, line2)).toBe("perpendicular");
  });

  it("should identify parallel lines", () => {
    const line1: Line = [
      { x: 0, y: 0 },
      { x: 2, y: 2 },
    ]; // slope = 1
    const line2: Line = [
      { x: 1, y: 1 },
      { x: 3, y: 3 },
    ]; // slope = 1
    expect(determineLine(line1, line2)).toBe("parallel");
  });

  it("should identify intersecting lines", () => {
    const line1: Line = [
      { x: 0, y: 0 },
      { x: 2, y: 3 },
    ]; // slope = 1.5
    const line2: Line = [
      { x: 0, y: 0 },
      { x: 2, y: 1 },
    ]; // slope = 0.5
    expect(determineLine(line1, line2)).toBe("intersecting");
  });
});
