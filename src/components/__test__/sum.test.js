import { sum } from "../sum";

test("for Sum function", () => {
  const result = sum(3, 2);

//   Assertion
  expect(result).toBe(5);
});
