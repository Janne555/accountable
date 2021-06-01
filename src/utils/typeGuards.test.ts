import { makeEvent } from "../factories";
import { isEvent } from "./typeGuards";

describe('isEvent', () => {
  it.each([
    [makeEvent(0, new Date(), [], "historical", "hello"), true],
    [makeEvent(1, new Date(), ["asdasd"], "historical", "hello"), true],
    [makeEvent(2, new Date(), [], "generated", "hello"), true],
    [makeEvent(3, new Date(), [], "archetype", "hello"), true]
  ])(
    'for %s result should be %s',
    (event, result) => {
      expect(isEvent(event)).toBe(result)
    }
  );
});