const levelAndXp = [
  { start: 0, end: 0 }, // Level 0, which actually does not exist.
  { start: 0, end: 300 }, // Level 1, and so on
  { start: 300, end: 900 },
  { start: 900, end: 2700 },
  { start: 2700, end: 6500 },
  { start: 6500, end: 14000 },
  { start: 14000, end: 23000 },
  { start: 23000, end: 34000 },
]

export const getPercentageToNextLevelByXp = (xp: number) => {
  const currentLevel = levelAndXp.find((_) => xp >= _.start && xp < _.end)
  if (!currentLevel) {
    return 0
  }
  return (
    (1.0 * (xp - currentLevel.start)) / (currentLevel.end - currentLevel.start)
  )
}

export const getCurrentLevelEndByLevel = (level: number) => {
  const currentLevel = levelAndXp[level]
  if (!currentLevel) {
    return 999999
  }
  return currentLevel.end
}
