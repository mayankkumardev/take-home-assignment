export const capitalizeFirstLetter = (text: string) => {
  return text
    .split(' ')
    .map(item => item.charAt(0).toUpperCase() + item.slice(1))
    .join(' ');
};
