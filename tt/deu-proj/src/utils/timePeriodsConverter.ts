
/**
 * 
 * @param date should be new Date()
 * @param periods 
 */
const timePeriodsConverter = (date: Date, periods: number[]): number[] => {
  const minutes = date.getMinutes();
  const newPeriods = periods.filter((item) => item > minutes);
  
  if (!(newPeriods.length > 0)) return [];

  return newPeriods.reduce((acc: number[], curr: number, index: number): number[] => {
    while (index < 3) {
      return [
        ...acc,
        (curr - minutes)
      ] 
    }
    return acc
  }, [])
};

export default timePeriodsConverter;