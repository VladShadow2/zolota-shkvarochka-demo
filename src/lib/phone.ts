export function isUkrainianPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^380\d{9}$/.test(digits) || /^0\d{9}$/.test(digits);
}

export function isValidName(value: string) {
  const name = value.trim().replace(/\s+/g, " ");
  return /^[\p{L}][\p{L}'’\- ]{1,59}$/u.test(name);
}
