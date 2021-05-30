function isDay(dayOf: number): dayOf is Day {
  return dayOf >= 0 && dayOf < 7
}

export {
  isDay
}