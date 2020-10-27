export function isObject(value: any):boolean {
  return value !== null && typeof value === 'object';
}  

export function toQueryStr(params: Record<string, any>): string {
  const paramsStr = new URLSearchParams(params).toString();
  return paramsStr ? `?${paramsStr}` : '';
}