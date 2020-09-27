export function getMediaQuery(minWidth: number): string {
  return `@media (min-width: ${minWidth}px)`;
}

export const mediaValues = {
  desktop: 720,
  ld: 1090,     // large desktop
}

const media = {
  custom: getMediaQuery,
  desktop: getMediaQuery(mediaValues.desktop),
  ld: getMediaQuery(mediaValues.ld),
}

export default media;

export function getIsMobile(): boolean {
  return !window.matchMedia("(min-width: 720px)").matches
}
