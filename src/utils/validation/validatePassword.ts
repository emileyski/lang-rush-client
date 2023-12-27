export const validatePassword = (password: string): string | null => {
  if (!password.match(/^[a-zA-Z0-9]{8,22}$/)) {
    return "Password length must best min 8 Chracters and Max 22 Chracters";
  }
  return null;
};
