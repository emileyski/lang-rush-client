import { createSlice } from "@reduxjs/toolkit";
import { getColorTheme } from "src/utils/getColorTheme";
import { setColorTheme } from "src/utils/setColorTheme";

export const themeModeSlice = createSlice({
  name: "isDarkMode",
  initialState: {
    isDark: getColorTheme() === "dark",
    theme: getColorTheme(),
  },
  reducers: {
    toggle: (state) => {
      const theme = state.theme === "dark" ? "light" : "dark";
      setColorTheme(theme);
      return { theme, isDark: !state.isDark };
    },
  },
});

export const { toggle } = themeModeSlice.actions;

const themeReducer = themeModeSlice.reducer;

export default themeReducer;
