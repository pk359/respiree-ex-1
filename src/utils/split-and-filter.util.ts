export const splitAndFilterNulls = (str: string, separator: string) =>
  str.split(separator).filter((s) => !!s.trim());
