export const getFilteredSchemeName = (options: {
  scheme_name_long: string,
  scheme_name_short: string
}): string => {
  let long_name: string = options.scheme_name_long;
  const short_name: string = options.scheme_name_short;

  if (long_name && short_name && long_name.startsWith(short_name)) {
    long_name = long_name.replace(short_name, '');
  };
  return `${short_name} ${long_name}`
}