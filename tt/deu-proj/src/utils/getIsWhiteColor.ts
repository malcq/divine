export default (color: string): boolean => {
  if (color === '#fff' || color === '#ffffff' || color === 'rgba(255, 255, 255, 1)' || color === 'rgb(255, 255, 255)') {
    return true
  }
  return false
};