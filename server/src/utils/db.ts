export function toObj(rows: any): Object {
  return JSON.parse(JSON.stringify(rows));
}
