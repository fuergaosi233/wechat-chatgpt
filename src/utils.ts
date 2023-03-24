export const regexpEncode = (str: string) => str.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
