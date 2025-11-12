export interface Option<T = string, U = string> {
  label?: T;
  value?: U;
}

export const toLookupMap = <T extends string | number, U extends string | number>(
  options: Option<T, U>[]
): Record<T, U> =>
  Object.fromEntries(options.map(o => [o.value, o.label])) as Record<T, U>;
