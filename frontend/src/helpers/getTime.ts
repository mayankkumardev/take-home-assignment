export const getTime = (date: Date) => {
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  return formattedTime;
};
