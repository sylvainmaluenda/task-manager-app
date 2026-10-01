export const capitalize = (str: string): string => {
  const value = str.trim().toLowerCase();

  return value.charAt(0).toUpperCase() + value.slice(1);
};
