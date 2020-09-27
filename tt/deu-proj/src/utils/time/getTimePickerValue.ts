
export const getTimePickerValue = (value: string): string | null => {
  const valuesArr = value.split('');
  let result = '';
  const filteredArr = valuesArr.filter((item) => {
    if (!isNaN(Number(item))) return true;
    return false
  })
    .filter((_, idx) => idx < 4);
  const length = filteredArr.length;
  if (length === 0) {
    result = '00:00';
  }
  if (length === 1) {
    result = `0${filteredArr[0]}:00`
  }
  if (length === 2) {
    if (!(Number(`${filteredArr[0]}${filteredArr[1]}`) < 24)) return null;
    result = `${filteredArr[0]}${filteredArr[1]}:00`
  }
  if (length === 3) {
    if (!(Number(`${filteredArr[1]}${filteredArr[2]}`) < 60)) return null;
    result = `0${filteredArr[0]}:${filteredArr[1]}${filteredArr[2]}`
  }
  if (length === 4) {
    if (!(Number(`${filteredArr[0]}${filteredArr[1]}`) < 24)
      || !(Number(`${filteredArr[2]}${filteredArr[3]}`) < 60)) return null;
    result = `${filteredArr[0]}${filteredArr[1]}:${filteredArr[2]}${filteredArr[3]}`
  }
  return result;
} 