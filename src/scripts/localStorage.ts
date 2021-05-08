export function lsGet(key: string) {
  return JSON.parse(localStorage.getItem(key) ?? "");
}

export function lsSet(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}
