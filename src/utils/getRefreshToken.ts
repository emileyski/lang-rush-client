export const getRefreshToken = (): string => {
  return localStorage.getItem("refreshToken") || "";
};
