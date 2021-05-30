import { makeSchedule } from ".";

describe('makeSchedule', () => {
  it('should make schedule', () => {
    const schedule = makeSchedule(0, "daily")
    expect(schedule).toBeDefined()
  });
});