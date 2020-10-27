export function queryString(params: Record<string, any>): string {
  const paramsStr = new URLSearchParams(params).toString();
  return paramsStr ? `?${paramsStr}` : '';
}