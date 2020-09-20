export function lsGet(key) {
  return JSON.parse(localStorage.getItem(key))
}

export function lsSet(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}