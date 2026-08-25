// Capitalizes the first letter of each comma-separated segment
// (e.g. "white, blue" -> "White, Blue", "n/a" -> "N/a", "red" -> "Red").
// Non-strings pass through unchanged.
export const capitalizeFirst = (value) => {
  if (typeof value !== 'string' || value.length === 0) return value
  return value
    .split(',')
    .map((segment) => {
      const trimmed = segment.trim()
      if (trimmed.length === 0) return trimmed
      return trimmed.charAt(0).toUpperCase() + trimmed.slice(1)
    })
    .join(', ')
}

// Inserts a space between the number and the era suffix
// (e.g. "19BBY" -> "19 BBY", "112ABY" -> "112 ABY"). Leaves "unknown" etc. as-is.
export const formatBirthYear = (value) => {
  if (typeof value !== 'string') return value
  return value.replace(/(\d)([A-Za-z])/, '$1 $2')
}