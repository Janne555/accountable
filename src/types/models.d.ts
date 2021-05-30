interface DateGenerationStrategy {
  (start: Date, end: Date, dayOf: number): Date[]
}

interface Schedule {
  generateDatesBetween(start: Date, end: Date): Date[]
}

export {
  DateGenerationStrategy,
  Schedule
}