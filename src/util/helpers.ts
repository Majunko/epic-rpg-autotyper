export const superTrim = (text: string) => {
  return text.replace(/\s+/g, ' ').trim();
};

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};