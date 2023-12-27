export const validateEmail = (email: string): string | null => {
  if (!email.match(/^[\w.-]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)) {
    return "Email Not Valid";
  }
  return null;
};
