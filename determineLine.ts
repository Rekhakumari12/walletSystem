type Point = { x: number; y: number };
export type Line = [Point, Point];

const calculateSlope = (p1: Point, p2: Point): number =>
  p1.x === p2.x ? Infinity : (p2.y - p1.y) / (p2.x - p1.x);

const areSlopesEqual = (m1: number, m2: number): boolean =>
  Math.abs(m1 - m2) < 1e-10;

const areSlopesPerpendicular = (m1: number, m2: number): boolean =>
  (m1 === 0 && !isFinite(m2)) ||
  (!isFinite(m1) && m2 === 0) ||
  (isFinite(m1) && isFinite(m2) && Math.abs(m1 * m2 + 1) < 1e-10);

const orientation = (p: Point, q: Point, r: Point): number => {
  const val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
  const valGreaterThenZero = val > 0 ? 1 : 2;
  return val === 0 ? 0 : valGreaterThenZero;
};

const onSegment = (p: Point, q: Point, r: Point): boolean =>
  Math.min(p.x, r.x) <= q.x &&
  q.x <= Math.max(p.x, r.x) &&
  Math.min(p.y, r.y) <= q.y &&
  q.y <= Math.max(p.y, r.y);


const isParallel = (line1: Line, line2: Line): boolean =>
  areSlopesEqual(calculateSlope(...line1), calculateSlope(...line2));

const isPerpendicular = (line1: Line, line2: Line): boolean =>
  areSlopesPerpendicular(calculateSlope(...line1), calculateSlope(...line2));

const isIntersecting = (line1: Line, line2: Line): boolean => {
  const [p1, q1] = line1;
  const [p2, q2] = line2;

  const [o1, o2, o3, o4] = [
    orientation(p1, q1, p2),
    orientation(p1, q1, q2),
    orientation(p2, q2, p1),
    orientation(p2, q2, q1),
  ];

  return (
    (o1 !== o2 && o3 !== o4) ||
    (o1 === 0 && onSegment(p1, p2, q1)) ||
    (o2 === 0 && onSegment(p1, q2, q1)) ||
    (o3 === 0 && onSegment(p2, p1, q2)) ||
    (o4 === 0 && onSegment(p2, q1, q2))
  );
};

export const determineLine = (line1: Line, line2: Line): string => {
  let relation: string;

  if (isPerpendicular(line1, line2)) {
    relation = "perpendicular";
  } else if (isParallel(line1, line2)) {
    relation = "parallel";
  } else if (isIntersecting(line1, line2)) {
    relation = "intersecting";
  } else {
    relation = "none";
  }

  return relation;
};
