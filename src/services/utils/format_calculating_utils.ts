export const formatToFloat = (value: number): number => {
  return parseFloat((value).toString().replace(/\s/g, ''));
};

export const formatToInt = (value: number): number => {
  return parseInt((value).toString().replace(/\s/g, ''));
};