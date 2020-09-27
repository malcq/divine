export const parseLetterToPos = (index: number): string => {
  let letter;
  switch (index) {
    case 1: letter = 'a'; break;
    case 2: letter = 'b'; break;
    case 3: letter = 'c'; break;
    case 4: letter = 'd'; break;
    case 5: letter = 'e'; break;
    case 6: letter = 'f'; break;
    case 7: letter = 'g'; break;
    default:
      letter = '';
  }
  return letter;
}