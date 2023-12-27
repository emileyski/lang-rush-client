export const getColorTheme = (): string | null => {
  return localStorage.getItem("theme");
};
