export const filterNonEmptyValues = (arr: string[]) => {
  return arr.filter((item) => item !== "").length > 0
    ? arr.filter((item) => item !== "")
    : undefined;
};
