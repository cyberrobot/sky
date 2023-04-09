export function uniq(array: [], key: string) {
  let seen: Record<number, boolean> = {};
  return array.filter((item) =>
    seen.hasOwnProperty(item[key]) ? false : (seen[item[key]] = true)
  ) as [];
}
