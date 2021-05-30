import { DateGenerationStrategies, RecurringEvent } from ".";
import { makeSchedule } from "../factories";
import { IEvent } from "../types";

describe('DateGenerationStrategies', () => {
  describe('daily', () => {
    it.each([
      [2, "2021-05-01T00:00", "2021-05-02T00:00", 1, ["2021-05-01T00:00", "2021-05-02T00:00"]],
      [0, "2021-05-01T00:00", "2021-03-02T00:00", 1, []]
    ])(
      'should generate %d date between %s and %s',
      (dates, start, end, dayOf, expectedResult) => {
        const result = DateGenerationStrategies.daily(new Date(start), new Date(end), dayOf)

        expect(result.length).toBe(dates)
        expect(result).toMatchObject(expectedResult.map(dateStr => new Date(dateStr)))
      }
    );
  });

  describe('weekly', () => {
    it.each([
      [2, "2021-05-01T00:00", "2021-05-09T00:00", 0, ["2021-05-02T00:00", "2021-05-09T00:00"]],
      [0, "2021-05-01T00:00", "2021-03-02T00:00", 1, []],
      [1, "2021-05-03T00:00", "2021-05-09T00:00", 0, ["2021-05-09T00:00"]],
      [1, "2021-05-03T00:00", "2021-05-09T00:00", 1, ["2021-05-03T00:00"]],
      [1, "2021-05-03T00:00", "2021-05-09T00:00", 2, ["2021-05-04T00:00"]],
      [1, "2021-05-03T00:00", "2021-05-09T00:00", 3, ["2021-05-05T00:00"]],
      [1, "2021-05-03T00:00", "2021-05-09T00:00", 4, ["2021-05-06T00:00"]],
      [1, "2021-05-03T00:00", "2021-05-09T00:00", 5, ["2021-05-07T00:00"]],
      [1, "2021-05-03T00:00", "2021-05-09T00:00", 6, ["2021-05-08T00:00"]]
    ])(
      'should generate %d date between %s and %s, for %d day of week',
      (dates, start, end, dayOf, expectedResult) => {
        const result = DateGenerationStrategies.weekly(new Date(start), new Date(end), dayOf)

        expect(result.length).toBe(dates)
        expect(result).toMatchObject(expectedResult.map(dateStr => new Date(dateStr)))
      }
    );
  });

  describe('monthly', () => {
    it.each([
      [2, "2021-05-01T00:00", "2021-06-01T00:00", 1, ["2021-05-01T00:00", "2021-06-01T00:00"]],
      [0, "2021-05-01T00:00", "2021-03-02T00:00", 1, []],
      [1, "2021-02-01T00:00", "2021-02-28T00:00", 1, ["2021-02-01T00:00"]],
      [1, "2021-02-28T00:00", "2021-03-02T00:00", 1, ["2021-03-01T00:00"]]
    ])(
      'should generate %d date between %s and %s',
      (dates, start, end, dayOf, expectedResult) => {
        const result = DateGenerationStrategies.monthly(new Date(start), new Date(end), dayOf)

        expect(result).toMatchObject(expectedResult.map(dateStr => new Date(dateStr)))
      }
    );

    it('should only allow up to 28th day', () => {
      expect(() => DateGenerationStrategies.monthly(new Date("2021-05-01T00:00"), new Date("2021-06-01T00:00"), 29)).toThrowError("Invalid day of. Must be between 1 and 28")
    });

    test('negative numbers should start from the last date', () => {
      const result = DateGenerationStrategies.monthly(new Date("2021-01-01T00:00"), new Date("2021-04-01T00:00"), -1)
      expect(result).toMatchObject([new Date("2021-01-31T00:00"), new Date("2021-02-28T00:00"), new Date("2021-03-31T00:00")])
    });

    test('-1 on febuary during leap year should be 29th', () => {
      const result = DateGenerationStrategies.monthly(new Date("2020-02-01T00:00"), new Date("2020-03-01T00:00"), -1)
      expect(result.length).toBe(1)
      expect(result).toMatchObject([new Date("2020-02-29T00:00")])
    });
  });

  describe('quarterly', () => {
    it.each([
      [2, "2021-01-01T00:00", "2021-06-01T00:00", 1, ["2021-01-01T00:00", "2021-04-01T00:00"]],
      [0, "2021-05-01T00:00", "2021-03-02T00:00", 1, []],
      [0, "2021-02-28T00:00", "2021-03-31T00:00", 1, []]

    ])(
      'should generate %d date between %s and %s',
      (dates, start, end, dayOf, expectedResult) => {
        const result = DateGenerationStrategies.quarterly(new Date(start), new Date(end), dayOf)

        expect(result.length).toBe(dates)
        expect(result).toMatchObject(expectedResult.map(dateStr => new Date(dateStr)))
      }
    );

    it('should only allow up to 89th day', () => {
      expect(() => DateGenerationStrategies.quarterly(new Date("2021-01-01T00:00"), new Date("2021-05-01T00:00"), 90)).toThrowError("Invalid day of. Must be between 1 and 89")
    });

    test('negative numbers should start from the last date', () => {
      const result = DateGenerationStrategies.quarterly(new Date("2021-01-01T00:00"), new Date("2021-04-01T00:00"), -1)
      expect(result.length).toBe(1)
      expect(result).toMatchObject([new Date("2021-03-31T00:00")])
    });
  });

  describe('yearly', () => {
    it.each([
      [2, "2021-01-01T00:00", "2022-01-02T00:00", 1, ["2021-01-01T00:00", "2022-01-01T00:00"]],
      [0, "2021-05-01T00:00", "2020-03-02T00:00", 1, []]
    ])(
      'should generate %d date between %s and %s',
      (dates, start, end, dayOf, expectedResult) => {
        const result = DateGenerationStrategies.yearly(new Date(start), new Date(end), dayOf)

        expect(result.length).toBe(dates)
        expect(result).toMatchObject(expectedResult.map(dateStr => new Date(dateStr)))
      }
    );

    it('should only allow up to 365th day', () => {
      expect(() => DateGenerationStrategies.yearly(new Date("2021-01-01T00:00"), new Date("2022-10-01T00:00"), 366)).toThrowError("Invalid day of. Must be between 1 and 365")
    });

    test('negative numbers should start from the last date', () => {
      const result = DateGenerationStrategies.yearly(new Date("2021-01-01T00:00"), new Date("2022-01-01T00:00"), -1)
      expect(result.length).toBe(1)
      expect(result).toMatchObject([new Date("2021-12-31T00:00")])
    });
  });
});

describe('RecurringEvent', () => {
  const archetype: IEvent = {
    amount: 1,
    categories: [],
    date: new Date(),
    id: 1,
    type: "archetype"
  }

  const weeklySched = makeSchedule(0, "weekly")
  const monthlySched = makeSchedule(2, "monthly")
  const yearlySched = makeSchedule(4, "yearly")

  it('should generate events', () => {
    const recurringEvent = new RecurringEvent([weeklySched, monthlySched, yearlySched], archetype, 55)
    const events = recurringEvent.generateEventsBetween(new Date("2021-01-01T00:00"), new Date("2022-02-05T00:00"))
    
    expect(events.map(event => event.date)).toMatchObject([
      new Date("2021-01-03T00:00"),
      new Date("2021-01-10T00:00"),
      new Date("2021-01-17T00:00"),
      new Date("2021-01-24T00:00"),
      new Date("2021-01-31T00:00"),
      new Date("2021-01-02T00:00"),
      new Date("2021-02-02T00:00"),
      new Date("2021-01-04T00:00")
    ])
  });

  it('should generate a single event for a given date', () => {
    const recurringEvent = new RecurringEvent([weeklySched, monthlySched, yearlySched], archetype, 55)
    const events = recurringEvent.generateEventsBetween(new Date("2021-01-01T00:00"), new Date("2022-01-02T00:00"))
    
    expect(events.map(event => event.date)).toMatchObject([
      new Date("2021-01-01T00:00")
    ])
  });

  test('generated event should have the recurring event\'s id', () => {
    const recurringEvent = new RecurringEvent([weeklySched], archetype, 55)
    const events = recurringEvent.generateEventsBetween(new Date("2021-01-01T00:00"), new Date("2022-02-05T00:00"))
    
    expect(events.every(event => event.id === 55)).toBeTruthy()
  });

  test('generated event should have generated type', () => {
    const recurringEvent = new RecurringEvent([weeklySched], archetype, 55)
    const events = recurringEvent.generateEventsBetween(new Date("2021-01-01T00:00"), new Date("2022-02-05T00:00"))

    expect(events.every(event => event.type === "generated")).toBeTruthy()
  });
});