import { ColorTheme } from "src/types";

export const setColorTheme = (theme: ColorTheme) => {
  localStorage.setItem("theme", theme);
};
