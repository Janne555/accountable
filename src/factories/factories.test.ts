import { makeEvent, makeRecurringEvent, makeSchedule } from ".";

describe('makeSchedule', () => {
  it('should make schedule', () => {
    const schedule = makeSchedule(0, "daily")
    expect(schedule).toBeDefined()
  });
});

describe('makeEvent', () => {
  it('should make event', () => {
    const schedule = makeEvent(0, 0, new Date(), [], "historical")
    expect(schedule).toBeDefined()
  });
});

describe('makeRecurringEvent', () => {
  it('should make event', () => {
    const schedule = makeRecurringEvent([], {} as any, 0)
    expect(schedule).toBeDefined()
  });
});