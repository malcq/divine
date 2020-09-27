export function getFormatedPlatform(name: string): string {
  const number = parseInt(name);
  if (isNaN(number)) return '';
  return String(number)
}