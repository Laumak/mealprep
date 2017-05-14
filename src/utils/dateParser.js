export default dt => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]

  const date = new Date(dt)

  const dayNum   = date.getDate()
  const monthNum = date.getMonth() + 1
  const dayName  = days[date.getDay()]

  return {
    dayNum,
    monthNum,
    dayName,
    date,
  }
}
